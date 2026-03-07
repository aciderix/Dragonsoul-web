"""
DragonSoul Server Emulator - Message Handlers
Processes incoming messages and builds protocol responses.

FIXED: Removed debug block from handle_client_info, restored BootData1 response.
"""

import json
import time
import random
import logging
import os
import datetime

import config
MAX_TEAM_LEVEL = config.MAX_TEAM_LEVEL
from protocol import ProtocolWriter
from messages import (
    MESSAGE_NAME_TO_ID, MESSAGE_INDEX,
    build_message, build_boot_data, build_boot_data_minimal,
    build_user_info, build_server_info,
    build_hero_data, build_hero_persistent_data,
    pack_field_int, pack_field_long, pack_field_string, pack_field_bool,
    pack_field_enum, pack_field_list, pack_field_map, pack_field_message,
    pack_skip, pack_int, pack_long, pack_string, pack_size,
    Rarity, ResourceType, GameMode, ArenaTier,
    TAG_FIELD, TAG_END,
)
from database import (
    get_or_create_player, get_player_by_user_id, get_first_player,
    get_player_heroes,
    update_player, update_hero, add_chat_message, get_recent_chat,
    save_campaign_progress,
)
from gamedata import (
    get_hero_stats, get_campaign_level, get_starter_heroes,
    HEROES, ITEMS, STAMINA_COSTS,
    HERO_XP_TABLE, TEAM_XP_TABLE,
)
from combat import simulate_battle, calculate_drops

logger = logging.getLogger("handlers")


# ─── Handler Dispatch ──────────────────────────────────────────────────────────

HANDLERS = {}


def handler(msg_name):
    """Decorator to register a message handler."""
    def decorator(func):
        HANDLERS[msg_name] = func
        return func
    return decorator


def dispatch(client_state, msg_name, msg_number, fields):
    """
    Dispatch an incoming message to the appropriate handler.
    Returns list of raw response messages (bytes).
    """
    func = HANDLERS.get(msg_name, handle_default)
    try:
        return func(client_state, msg_name, msg_number, fields)
    except Exception as e:
        logger.error(f"Handler error for {msg_name}: {e}", exc_info=True)
        return []


# ─── Handlers ──────────────────────────────────────────────────────────────────


# ─── Helper: find a hero in player's roster by UnitType ─────────────────────
def _find_hero_by_type(player, hero_type):
    """Find a hero dict in the player's heroes by UnitType enum value."""
    heroes = player.get("heroes", {})
    for hnum, hdata in heroes.items():
        if hdata.get("hero_type") == hero_type:
            return hdata
    return None


# ─── Helper: check and apply hero level-up ──────────────────────────────────
def _check_hero_level_up(hero, max_level):
    """Check if hero has enough XP to level up. Mutates hero dict in place."""
    leveled = False
    while hero["level"] < max_level:
        xp_needed = HERO_XP_TABLE.get(hero["level"] + 1, 999999999)
        if hero["xp"] >= xp_needed:
            hero["xp"] -= xp_needed
            hero["level"] += 1
            leveled = True
        else:
            break
    return leveled


# ─── Helper: check and apply team level-up ──────────────────────────────────
def _check_team_level_up(player):
    """Check if player has enough XP to level up team. Mutates player dict."""
    leveled = False
    while player["team_level"] < MAX_TEAM_LEVEL:
        next_xp = TEAM_XP_TABLE.get(player["team_level"] + 1, float('inf'))
        if player["xp"] >= next_xp:
            player["team_level"] += 1
            leveled = True
        else:
            break
    return leveled

@handler("ClientInfo1")
def handle_client_info(client_state, msg_name, msg_number, fields):
    """
    Handle login / registration.
    Responds with BootData1 containing full game state.
    """
    device_id = fields.get("uniqueIdentifier", "")
    user_id = fields.get("userID", 0)

    logger.info(f"Login attempt: device_id='{device_id}', userID={user_id}")

    # ── Player identity resolution ───────────────────────────────────────
    #
    # SINGLE_PLAYER_MODE (True):
    #   Completely ignores device_id and userID from the client.
    #   Always reuses the one and only player in the database.
    #   Bulletproof: works even if device_id changes every restart.
    #
    # SINGLE_PLAYER_MODE (False) — multiplayer:
    #   Uses standard device_id + userID lookup.
    #   Each unique client gets their own player account.
    # ─────────────────────────────────────────────────────────────────────

    conn = client_state.get("db_conn")
    player = None

    if config.SINGLE_PLAYER_MODE:
        # ── Solo mode: always reuse the single player ────────────────
        player = get_first_player(conn)
        if player:
            logger.info(
                f"SINGLE_PLAYER_MODE: reusing player id={player['id']}, "
                f"name='{player['name']}', level={player['team_level']}, "
                f"campaign_keys={len(player.get('campaign_progress', {}))}"
            )
        else:
            # First ever login — create the player with a stable device_id
            player = get_or_create_player("local_player", conn)
            logger.info(f"SINGLE_PLAYER_MODE: created first player id={player['id']}")
    else:
        # ── Multiplayer mode: identify by userID then device_id ──────
        if not device_id:
            device_id = f"device_{int(time.time())}"
            logger.info(f"Empty device_id — generated: '{device_id}'")

        if user_id and user_id > 0:
            player = get_player_by_user_id(user_id, conn)
            if player:
                logger.info(f"Found player by userID={user_id}: name='{player['name']}'")

        if not player:
            player = get_or_create_player(device_id, conn)
            logger.info(f"Player via device_id='{device_id}': name='{player['name']}', id={player['id']}")

    # Update client state
    client_state["user_id"] = player["user_id"]
    client_state["player_id"] = player["id"]
    client_state["device_id"] = device_id
    client_state["player"] = player

    heroes = player.get("heroes", {})

    # Heroes are now sent to the client.
    # The previous crash (RedDotTracker / BaseHeroGearStats NullPointerException)
    # was caused by missing content.tab — now served via statData with shard_id=1.

    # Build player_data dict for message builder
    player_data = {
        "user_id": player["user_id"],
        "name": player["name"],
        "team_level": player["team_level"],
        "xp": player["xp"],
        "gold": player["gold"],
        "diamonds": player["diamonds"],
        "stamina": player["stamina"],
        "raid_tickets": player["raid_tickets"],
        "tutorial_step": player["tutorial_step"],
        "campaign_progress": {
            int(k): v for k, v in player["campaign_progress"].items()
        },
        "lineups": {
            int(k): v for k, v in player.get("lineups", {1: [0,1,2,3,4]}).items()
        },
        "items": {
            int(k): v for k, v in player["items"].items()
        },
    }

    # Ensure tutorial is marked complete so the client doesn't try to launch
    # the tutorial intro (which requires assets not on our server → crash).
    # firstBoot is also forced to False below for the same reason.
    # NOTE: team_level is left untouched so campaign progression works normally.
    if player["tutorial_step"] < 999:
        update_player(player["id"], conn=conn, tutorial_step=999)
        player["tutorial_step"] = 999
        player_data["tutorial_step"] = 999

    # No campaign seed — let the player start from the very first level.
    # The content.1.tab (sent via statData) sets maxChapter correctly.
    # Empty levelStatuses is valid — the client shows all levels locked
    # except the very first one (chapter 0, level 0).

    # ── RAW DB DIAGNOSTIC ──
    # Query the ACTUAL DB values to compare with in-memory player data
    if conn:
        try:
            raw_row = conn.execute(
                "SELECT id, gold, diamonds, stamina, xp, team_level, campaign_progress FROM players WHERE id = ?",
                (player["id"],)
            ).fetchone()
            if raw_row:
                logger.info(
                    f"DB RAW VALUES at login: id={raw_row[0]}, "
                    f"gold={raw_row[1]}, diamonds={raw_row[2]}, "
                    f"stamina={raw_row[3]}, xp={raw_row[4]}, "
                    f"team_level={raw_row[5]}, "
                    f"campaign_progress_len={len(raw_row[6]) if raw_row[6] else 0}"
                )
            raw_heroes = conn.execute(
                "SELECT id, hero_type, level, xp, stars, rarity FROM heroes WHERE player_id = ?",
                (player["id"],)
            ).fetchall()
            for rh in raw_heroes:
                logger.info(
                    f"DB RAW HERO: id={rh[0]}, type={rh[1]}, "
                    f"level={rh[2]}, xp={rh[3]}, stars={rh[4]}, rarity={rh[5]}"
                )
        except Exception as e:
            logger.warning(f"DB diagnostic failed: {e}")

    # Increment message counter
    client_state["msg_counter"] = client_state.get("msg_counter", 0) + 1
    resp_num = client_state["msg_counter"]

    # Echo the client's game data versions back so it skips downloading files
    stat_versions = fields.get("statVersions", {})

    # Always False — firstBoot=True causes the game to launch the tutorial intro
    # which requires assets (videos/animations) that don't exist on our server.
    # The client crashes during tutorial init and never reconnects.
    # With firstBoot=False the game skips the intro and loads the town screen.
    is_first_boot = False

    boot_msg = build_boot_data(
        player_data, heroes, resp_num,
        response_to=msg_number,
        stat_versions=stat_versions,
        is_first_boot=is_first_boot,
    )
    logger.info(
        f"Login: user_id={player['user_id']}, name={player['name']}, "
        f"level={player['team_level']}, firstBoot={is_first_boot}, "
        f"statVersions echoed={len(stat_versions)}"
    )

    # Concise login summary (replaces verbose debug dump)
    logger.info(
        f"BOOT DATA SENT: gold={player_data['gold']}, diamonds={player_data['diamonds']}, "
        f"stamina={player_data['stamina']}, xp={player_data['xp']}, "
        f"team_level={player_data['team_level']}, heroes={len(heroes)}, "
        f"campaign_levels={len(player_data.get('campaign_progress', {}))}, "
        f"boot_msg_size={len(boot_msg)} bytes"
    )

    return [boot_msg]


@handler("ClockChange1")
def handle_clock_change(client_state, msg_name, msg_number, fields):
    """Handle ClockChange1 - client reports clock synchronization data.
    Fields: source(String), serverTime(Long), clientTime(Long),
    deviceRunningTime(Long), roundTrip(Long), timeSinceReceived(Long),
    serverDelay(Long), offsetDelta(Long).
    This is a FIRE-AND-FORGET message — no response expected.
    """
    logger.info(f"ClockChange1 received (fire-and-forget, no response)")
    return []


@handler("ErrorReport1")
def handle_error_report(client_state, msg_name, msg_number, fields):
    """Handle ErrorReport1 - client reports a crash/error.
    Fire-and-forget — no response expected.
    """
    logger.info(f"ErrorReport1 received (client crash report)")
    return []


@handler("DownloadTime1")
def handle_download_time(client_state, msg_name, msg_number, fields):
    """Handle DownloadTime1 - client reports asset download timing.
    This is a FIRE-AND-FORGET message: the client sends it via
    sendMessage(msg) with no response callback registered.
    The server MUST NOT respond — sending an unsolicited Ping1 here
    caused an EOFException in the client's reader thread because:
      1. The old code used pack_field_int for the 3rd Ping1 field
         (should be Long → 8 bytes, not Int → 4 bytes)
      2. The client's unpackLong() ran out of bytes → EOFException
      3. Reader thread caught IOException → closed socket → disconnect
    Even with correct field types, responding to a fire-and-forget
    message is unnecessary and could confuse the client's routing.
    """
    logger.info(f"DownloadTime1 received (fire-and-forget, no response)")
    return []


@handler("Ping1")
def handle_ping(client_state, msg_name, msg_number, fields):
    """Respond to a client Ping1.
    The Ping Java class has exactly 3 V2 fields, ALL Long (8 bytes):
      Field 0: timestamp    (Long) — client's send time
      Field 1: serverDelay  (Long) — processing delay on server
      Field 2: serverTime   (Long) — server's current time
    The old code incorrectly used pack_field_int for field 2, which
    caused unpackLong() to read past the buffer → EOFException.
    """
    client_state["msg_counter"] = client_state.get("msg_counter", 0) + 1
    resp_num = client_state["msg_counter"]
    now_ms = int(time.time() * 1000)

    buf = bytearray()
    buf.extend(pack_field_long(now_ms))   # field 0: timestamp (Long)
    buf.extend(pack_field_long(0))        # field 1: serverDelay (Long)
    buf.extend(pack_field_long(now_ms))   # field 2: serverTime (Long)
    resp = build_message("Ping1", resp_num, response_to=msg_number, fields_data=bytes(buf))
    return [resp]


@handler("SetPlayerName1")
def handle_set_player_name(client_state, msg_name, msg_number, fields):
    """Handle player name change."""
    new_name = fields.get("name", "Hero")
    player_id = client_state.get("player_id")
    conn = client_state.get("db_conn")

    if player_id:
        update_player(player_id, conn=conn, name=new_name)
        if "player" in client_state:
            client_state["player"]["name"] = new_name

    # Send UserInfo update
    client_state["msg_counter"] = client_state.get("msg_counter", 0) + 1
    resp_num = client_state["msg_counter"]

    player = client_state.get("player", {})
    ui_data = build_user_info(
        user_id=player.get("user_id", 1),
        name=new_name,
        level=player.get("team_level", 1),
        diamonds=player.get("diamonds", 500),
    )

    resp = build_message("UserInfo1", resp_num, response_to=msg_number, fields_data=ui_data)
    logger.info(f"Player renamed to: {new_name}")
    return [resp]


@handler("CampaignAttack1")
def handle_campaign_attack(client_state, msg_name, msg_number, fields):
    """Handle a campaign level attack.

    Client-authoritative: we trust the client's win/loss result.
    get_campaign_level() is a stub that returns None, so we don't rely on it.
    We always process the attack as long as we have a player.
    """
    # Log raw parsed fields for debugging
    raw_chapter = fields.get("chapter")
    raw_level = fields.get("level")
    raw_base = fields.get("base")
    logger.info(f"CampaignAttack RAW: chapter={raw_chapter}, level={raw_level}, base={raw_base}")
    
    chapter = raw_chapter if raw_chapter is not None else 0
    level = raw_level if raw_level is not None else 0
    base = raw_base or {}
    client_won = base.get("won")
    player_id = client_state.get("player_id")
    player = client_state.get("player", {})
    conn = client_state.get("db_conn")

    responses = []

    if player_id:
        # Trust the client's result (True = won, None/False = lost)
        won = client_won if client_won is not None else True

        # Calculate drops (works with chapter/level numbers only)
        drops = calculate_drops(chapter, level, won)

        # Stamina cost from config table (default 6 for unknown chapters)
        stamina_cost = STAMINA_COSTS.get(chapter, 6)

        if won:
            # Award rewards
            new_gold = player.get("gold", 0) + drops["gold"]
            new_xp = player.get("xp", 0) + drops["xp"]
            new_stamina = max(0, player.get("stamina", 0) - stamina_cost)

            # Update item inventory
            items = player.get("items", {})
            for item_id in drops["items"]:
                str_id = str(item_id)
                items[str_id] = items.get(str_id, 0) + 1

            update_player(
                player_id, conn=conn,
                gold=new_gold, xp=new_xp, stamina=new_stamina,
                items=items,
            )

            # Save campaign progress (3 stars if won)
            progress = save_campaign_progress(player_id, chapter, level, 3, conn)

            # Update in-memory client_state so Logout save has latest data
            player["gold"] = new_gold
            player["xp"] = new_xp
            player["stamina"] = new_stamina
            player["items"] = items
            player["campaign_progress"] = progress

            # Check team level up
            if _check_team_level_up(player):
                update_player(player_id, conn=conn, team_level=player["team_level"])
                logger.info(f"  → TEAM LEVEL UP! Now level {player['team_level']}")

            # Grant hero XP to all heroes in the active lineup
            hero_xp_gain = drops.get("hero_xp", 100)
            heroes = player.get("heroes", {})
            lineups = player.get("lineups", {})
            # HeroLineupType: 1=NORMAL_CAMPAIGN
            active_lineup = lineups.get(1, lineups.get("1", lineups.get(0, lineups.get("0", [0, 1, 2, 3, 4]))))
            heroes_leveled = []
            for hero_num in active_lineup:
                hkey = hero_num if hero_num in heroes else str(hero_num)
                hdata = heroes.get(hkey)
                if hdata and "id" in hdata:
                    old_xp = hdata.get("xp", 0)
                    old_level = hdata.get("level", 1)
                    hdata["xp"] = old_xp + hero_xp_gain
                    # Check hero level up using HERO_XP_TABLE
                    while hdata["level"] < player.get("team_level", 1):
                        next_xp = HERO_XP_TABLE.get(hdata["level"] + 1, float('inf'))
                        if hdata["xp"] >= next_xp:
                            hdata["level"] += 1
                        else:
                            break
                    # Save to DB
                    update_hero(hdata["id"], conn=conn,
                                xp=hdata["xp"], level=hdata["level"])
                    if hdata["level"] > old_level:
                        heroes_leveled.append(
                            f"{hdata.get('hero_type','?')}:{old_level}→{hdata['level']}")

            level_info = f", leveled: {heroes_leveled}" if heroes_leveled else ""
            logger.info(f"Campaign {chapter}-{level}: WON, +{drops['gold']}g, +{drops['xp']}xp, "
                         f"+{hero_xp_gain} hero_xp to {len(active_lineup)} heroes{level_info}, "
                         f"team_level={player['team_level']}, progress saved")
        else:
            # Lost — still deduct stamina
            new_stamina = max(0, player.get("stamina", 0) - stamina_cost)
            update_player(player_id, conn=conn, stamina=new_stamina)
            player["stamina"] = new_stamina
            logger.info(f"Campaign {chapter}-{level}: LOST")

        # Build ResourceUpdate1 response
        client_state["msg_counter"] = client_state.get("msg_counter", 0) + 1
        resp_num = client_state["msg_counter"]

        buf = bytearray()
        buf.extend(pack_field_int(ResourceType.GOLD))      # resourceType
        buf.extend(pack_field_int(player.get("gold", 0)))   # amount
        resp = build_message("ResourceUpdate1", resp_num, response_to=msg_number, fields_data=bytes(buf))
        responses.append(resp)
    else:
        logger.warning(f"CampaignAttack1: no player_id in client_state, ignoring")

    return responses


@handler("GetArenaInfo1")
def handle_get_arena_info(client_state, msg_name, msg_number, fields):
    """Return placeholder arena info."""
    client_state["msg_counter"] = client_state.get("msg_counter", 0) + 1
    resp_num = client_state["msg_counter"]

    buf = bytearray()
    # arenaRank: Integer
    buf.extend(pack_field_int(1))
    # arenaScore: Integer
    buf.extend(pack_field_int(1000))
    # arenaTier: ArenaTier (enum)
    buf.extend(pack_field_enum(ArenaTier.BRONZE))
    # arenaType: ArenaType (enum)
    buf.extend(pack_field_enum(0))
    # attacks: Integer
    buf.extend(pack_field_int(5))
    # defenses: List<ArenaRow> (empty)
    buf.extend(pack_skip())
    # opponents: List<ArenaRow> (empty)
    buf.extend(pack_skip())
    # season: Integer
    buf.extend(pack_field_int(1))

    resp = build_message("ArenaInfo1", resp_num, response_to=msg_number, fields_data=bytes(buf))
    return [resp]


@handler("GetServers1")
def handle_get_servers(client_state, msg_name, msg_number, fields):
    """Return the server list."""
    client_state["msg_counter"] = client_state.get("msg_counter", 0) + 1
    resp_num = client_state["msg_counter"]

    server_data = build_server_info(
        shard_id=config.SHARD_ID,
        max_level=config.MAX_TEAM_LEVEL,
        chapters=config.NUM_CHAPTERS,
    )

    buf = bytearray()
    # servers: List<Server>
    buf.extend(bytes([TAG_FIELD]))
    buf.extend(pack_size(1))
    buf.extend(server_data)

    resp = build_message("Servers1", resp_num, response_to=msg_number, fields_data=bytes(buf))
    return [resp]


@handler("SendChat1")
def handle_send_chat(client_state, msg_name, msg_number, fields):
    """Handle a chat message."""
    message = fields.get("message", "")
    channel = fields.get("channel", 0)
    player_id = client_state.get("player_id")
    player = client_state.get("player", {})
    conn = client_state.get("db_conn")

    if player_id and message:
        add_chat_message(player_id, channel, message, conn)

    # Send UpdateChat1 back
    client_state["msg_counter"] = client_state.get("msg_counter", 0) + 1
    resp_num = client_state["msg_counter"]

    now_ms = int(time.time() * 1000)
    buf = bytearray()
    # message: String
    buf.extend(pack_field_string(message))
    # playerName: String
    buf.extend(pack_field_string(player.get("name", "Hero")))
    # timestamp: Long
    buf.extend(pack_field_long(now_ms))
    # userID: Long
    buf.extend(pack_field_long(player.get("user_id", 1)))

    resp = build_message("UpdateChat1", resp_num, response_to=msg_number, fields_data=bytes(buf))
    logger.info(f"Chat [{channel}] {player.get('name', '?')}: {message}")
    return [resp]


@handler("ChangeTutorialStep1")
def handle_change_tutorial(client_state, msg_name, msg_number, fields):
    """Update the tutorial step."""
    step = fields.get("step", 0)
    player_id = client_state.get("player_id")
    conn = client_state.get("db_conn")

    if player_id:
        update_player(player_id, conn=conn, tutorial_step=step)
        if "player" in client_state:
            client_state["player"]["tutorial_step"] = step

    logger.debug(f"Tutorial step updated to {step}")
    return []


@handler("HeroLineupUpdate1")
def handle_hero_lineup_update(client_state, msg_name, msg_number, fields):
    """Update hero lineup for a game mode."""
    mode = fields.get("mode", 0)
    heroes_list = fields.get("heroes", [])
    player_id = client_state.get("player_id")
    player = client_state.get("player", {})
    conn = client_state.get("db_conn")

    if player_id:
        lineups = player.get("lineups", {})
        lineups[mode] = heroes_list
        update_player(player_id, conn=conn, lineups=lineups)
        player["lineups"] = lineups

    logger.debug(f"Lineup updated: mode={mode}, heroes={heroes_list}")
    return []


@handler("GetExpedition1")
def handle_get_expedition(client_state, msg_name, msg_number, fields):
    """Return empty expedition data."""
    client_state["msg_counter"] = client_state.get("msg_counter", 0) + 1
    resp_num = client_state["msg_counter"]

    buf = bytearray()
    # Just send empty/minimal GetExpeditionResponse1
    buf.extend(pack_skip())  # expeditionRunData

    resp = build_message("GetExpeditionResponse1", resp_num, response_to=msg_number, fields_data=bytes(buf))
    return [resp]


@handler("BuyChests1")
def handle_buy_chests(client_state, msg_name, msg_number, fields):
    """Generate random heroes/items from chest purchase."""
    chest_type = fields.get("chestType", 0)
    count = fields.get("count", 1)
    player_id = client_state.get("player_id")
    player = client_state.get("player", {})
    conn = client_state.get("db_conn")

    responses = []

    if player_id:
        # Deduct diamonds (100 per chest)
        cost = 100 * count
        new_diamonds = max(0, player.get("diamonds", 0) - cost)
        update_player(player_id, conn=conn, diamonds=new_diamonds)
        player["diamonds"] = new_diamonds

        # Generate random rewards
        items = player.get("items", {})
        for _ in range(count):
            item_id = random.randint(1, 20)
            str_id = str(item_id)
            items[str_id] = items.get(str_id, 0) + 1

        update_player(player_id, conn=conn, items=items)
        player["items"] = items

        # Send ResourceUpdate for diamonds
        client_state["msg_counter"] = client_state.get("msg_counter", 0) + 1
        resp_num = client_state["msg_counter"]

        buf = bytearray()
        buf.extend(pack_field_int(ResourceType.DIAMONDS))
        buf.extend(pack_field_int(new_diamonds))
        resp = build_message("ResourceUpdate1", resp_num, response_to=msg_number, fields_data=bytes(buf))
        responses.append(resp)

    return responses


@handler("RequestResync1")
def handle_request_resync(client_state, msg_name, msg_number, fields):
    """Send full game state again."""
    return handle_client_info(client_state, "ClientInfo1", msg_number, {
        "uniqueIdentifier": client_state.get("device_id", ""),
        "userID": client_state.get("user_id", 0),
    })


@handler("GetBossBattles1")
def handle_get_boss_battles(client_state, msg_name, msg_number, fields):
    """Return empty boss battles data."""
    client_state["msg_counter"] = client_state.get("msg_counter", 0) + 1
    resp_num = client_state["msg_counter"]

    buf = bytearray()
    buf.extend(pack_skip())  # bossBattles list

    resp = build_message("BossBattlesResponse1", resp_num, response_to=msg_number, fields_data=bytes(buf))
    return [resp]


@handler("ListRecommendedGuilds1")
def handle_list_guilds(client_state, msg_name, msg_number, fields):
    """Return empty guild list."""
    client_state["msg_counter"] = client_state.get("msg_counter", 0) + 1
    resp_num = client_state["msg_counter"]

    buf = bytearray()
    # guilds: List<GuildRow> (empty)
    buf.extend(bytes([TAG_FIELD]))
    buf.extend(pack_size(0))

    resp = build_message("ListRecGuildsResponse1", resp_num, response_to=msg_number, fields_data=bytes(buf))
    return [resp]


@handler("GetHeroWall1")
def handle_get_hero_wall(client_state, msg_name, msg_number, fields):
    """Return empty hero wall."""
    client_state["msg_counter"] = client_state.get("msg_counter", 0) + 1
    resp_num = client_state["msg_counter"]

    buf = bytearray()
    buf.extend(pack_skip())  # posts list

    resp = build_message("HeroWall1", resp_num, response_to=msg_number, fields_data=bytes(buf))
    return [resp]



# ─── Fire-and-forget Handlers ─────────────────────────────────────────────────

@handler("SetLanguage1")
def handle_set_language(client_state, msg_name, msg_number, fields):
    """Fire-and-forget: client sets display language."""
    raw = fields.get("_raw", b"")
    # Parse language string if present: TAG_FIELD(0x10) + 4B-len + string
    lang = "?"
    if len(raw) >= 5 and raw[0] == 0x10:
        slen = int.from_bytes(raw[1:5], "little")
        if len(raw) >= 5 + slen:
            lang = raw[5:5+slen].decode("utf-8", errors="replace")
    logger.info(f"SetLanguage1: language={lang}")
    # Save to player state if available
    player = client_state.get("player")
    if player:
        player["language"] = lang
    return []


@handler("OpenGLExtensions1")
def handle_opengl_extensions(client_state, msg_name, msg_number, fields):
    """Fire-and-forget: client reports GPU capabilities."""
    logger.info(f"OpenGLExtensions1 received (fire-and-forget)")
    return []


@handler("LoadTime1")
def handle_load_time(client_state, msg_name, msg_number, fields):
    """Fire-and-forget: client reports a load-time metric."""
    logger.info(f"LoadTime1 received (fire-and-forget)")
    return []


@handler("Logout1")
def handle_logout(client_state, msg_name, msg_number, fields):
    """
    Client is disconnecting gracefully.
    Save all player state to the database before the connection closes.
    """
    player = client_state.get("player")
    conn = client_state.get("db_conn")
    if player and conn:
        try:
            # Save player-level data
            update_player(
                player["id"], conn=conn,
                stamina=player.get("stamina", 120),
                gold=player.get("gold", 50000),
                diamonds=player.get("diamonds", 500),
                xp=player.get("xp", 0),
                team_level=player.get("team_level", 1),
                items=player.get("items", {}),
                campaign_progress=player.get("campaign_progress", {}),
            )
            
            # Save ALL hero data (level, xp, stars, rarity, equipment)
            heroes = player.get("heroes", {})
            heroes_saved = 0
            for hnum, hdata in heroes.items():
                if "id" in hdata:
                    equip = hdata.get("equipment", {})
                    update_hero(
                        hdata["id"], conn=conn,
                        level=hdata.get("level", 1),
                        xp=hdata.get("xp", 0),
                        stars=hdata.get("stars", 1),
                        rarity=hdata.get("rarity", 0),
                        equipment=json.dumps(equip) if isinstance(equip, dict) else equip,
                    )
                    heroes_saved += 1
            
            logger.info(
                f"Logout1: saved player {player.get('user_id')} — "
                f"gold={player.get('gold')}, xp={player.get('xp')}, "
                f"team_level={player.get('team_level')}, "
                f"heroes={heroes_saved}, "
                f"campaign_keys={len(player.get('campaign_progress', {}))}"
            )
        except Exception as e:
            logger.error(f"Logout1: failed to save player state: {e}")
    else:
        logger.info(f"Logout1 received (no player state to save)")
    return []


# ─── Action1 Handler ──────────────────────────────────────────────────────────

# CommandType ordinal → name (from bytecode analysis)
_COMMAND_TYPES = {
    0: "DEFAULT", 1: "EQUIP_ITEM", 2: "UNLOCK_HERO", 3: "PROMOTE",
    4: "EVOLVE", 5: "UPGRADE_SKILL", 6: "ADD_HERO_EXP", 7: "VIEW_TREASURE",
    8: "BUY_STAMINA", 9: "BUY_POWER_POINTS", 10: "BUY_GOLD",
    11: "GET_NEW_MAIL_MESSAGES", 12: "MARK_MAIL_OPENED",
    13: "TAKE_MAIL_ATTACHMENTS", 14: "REFRESH_TRADER",
    15: "PURCHASE_TRADER_ITEM", 16: "SELL_ITEM",
    17: "REFRESH_SPECIAL_EVENTS", 18: "CLAIM_SIGNIN_REWARD",
    19: "DEBUG_COMMAND", 20: "DEBUG_GIVE_ITEM", 21: "DEBUG_GIVE_RESOURCE",
    22: "DEBUG_SET_TEAM_LEVEL", 23: "DEBUG_SET_VIP_LEVEL",
    24: "DEBUG_SET_SIGNINS", 25: "BUY_NEW_ACCOUNT",
    26: "RESET_ELITE_LEVEL", 27: "START_FIGHT_PIT_ATTACK",
    28: "RESET_FIGHT_PIT_CHANCES", 29: "CLAIM_FIGHT_PIT_PROMOTION_REWARD",
    30: "COMPLETE_QUEST", 31: "GET_PLAYER_RANKINGS",
    32: "REFRESH_SOUL_CHEST_DROPS", 33: "CLEAR_FIGHT_PIT_DEMOTION",
    34: "UPDATE_TIME", 35: "VIEW_DAILY_QUESTS",
}

# ActionExtraType ordinal → name
_ACTION_EXTRA_TYPES = {
    0: "DEFAULT", 1: "SLOT", 2: "ID", 3: "ENCHANT_ITEMS",
    4: "GUILD_NAME", 5: "ACTION_COMMAND", 6: "WAR_BATTLE_HEROES",
    7: "MESSAGE", 8: "QUANTITY",
}


def _parse_action_fields(raw):
    """
    Parse Action1 raw bytes into structured fields.
    Field order: command(enum), heroType(enum), iD(int), itemType(enum), extra(map<enum,str>)
    All use TAG_FIELD (0x10) prefix with 4-byte LE values.
    """
    result = {}
    pos = 0
    field_names = ["command", "heroType", "iD", "itemType"]
    
    for fname in field_names:
        if pos >= len(raw):
            break
        if raw[pos] != 0x10:
            break
        pos += 1
        val = int.from_bytes(raw[pos:pos+4], "little")
        result[fname] = val
        pos += 4
    
    # Parse extra map: count followed by (key_enum, value_string) pairs
    if pos < len(raw) and raw[pos] == 0x10:
        pos += 1
        count = int.from_bytes(raw[pos:pos+4], "little")
        pos += 4
        extra = {}
        for _ in range(count):
            if pos + 4 > len(raw):
                break
            key = int.from_bytes(raw[pos:pos+4], "little")
            pos += 4
            if pos + 4 > len(raw):
                break
            slen = int.from_bytes(raw[pos:pos+4], "little")
            pos += 4
            val = raw[pos:pos+slen].decode("utf-8", errors="replace") if pos + slen <= len(raw) else "?"
            pos += slen
            extra[_ACTION_EXTRA_TYPES.get(key, f"UNKNOWN_{key}")] = val
        result["extra"] = extra
    
    return result


@handler("Action1")
def handle_action(client_state, msg_name, msg_number, fields):
    """
    Handle Action1 — the main game action message.
    Client sends this for equips, unlocks, purchases, etc.
    For now we parse and log; most actions are optimistic on the client side.
    """
    raw = fields.get("_raw", b"")
    parsed = _parse_action_fields(raw)
    
    cmd_ord = parsed.get("command", -1)
    cmd_name = _COMMAND_TYPES.get(cmd_ord, f"UNKNOWN_{cmd_ord}")
    hero_ord = parsed.get("heroType", 0)
    item_ord = parsed.get("itemType", 0)
    action_id = parsed.get("iD", 0)
    extra = parsed.get("extra", {})
    
    logger.info(
        f"Action1: cmd={cmd_name}({cmd_ord}), hero={hero_ord}, "
        f"item={item_ord}, id={action_id}, extra={extra}"
    )
    
    # ── Process specific actions ──
    player = client_state.get("player")
    conn = client_state.get("db_conn")
    
    if not player:
        logger.warning(f"  → No player in client_state, ignoring action")
        return []
    
    if cmd_name == "ADD_HERO_EXP" and player:
        # ── Add XP to a hero (using XP potions) ─────────────────────
        hero_type_ord = parsed.get("heroType", 0)
        item_type_ord = parsed.get("itemType", 0)
        qty_str = extra.get("QUANTITY", "1")
        quantity = int(qty_str) if qty_str.isdigit() else 1
        
        hero = _find_hero_by_type(player, hero_type_ord)
        if hero:
            # XP per potion varies by item type; reasonable defaults
            # These can be tuned once we see actual item_type values in logs
            XP_PER_POTION = {
                # item_type_ord: xp_amount — fill in from game data
            }
            xp_per = XP_PER_POTION.get(item_type_ord, 500)
            total_xp = xp_per * quantity
            
            hero["xp"] = hero.get("xp", 0) + total_xp
            max_hero_level = player.get("team_level", 1)
            leveled = _check_hero_level_up(hero, max_hero_level)
            
            if conn:
                update_hero(hero["id"], conn=conn, xp=hero["xp"], level=hero["level"])
            
            # Remove potions from inventory
            items = player.get("items", {})
            str_item = str(item_type_ord)
            if str_item in items:
                items[str_item] = max(0, items[str_item] - quantity)
                if items[str_item] == 0:
                    del items[str_item]
                if conn:
                    update_player(player["id"], conn=conn, items=items)
            
            lvl_msg = f" → LEVEL UP to {hero['level']}!" if leveled else ""
            logger.info(f"  → ADD_HERO_EXP: hero={hero_type_ord}, +{total_xp}xp "
                        f"(item={item_type_ord} x{quantity}), "
                        f"now level={hero['level']} xp={hero['xp']}{lvl_msg}")
        else:
            logger.warning(f"  → ADD_HERO_EXP: hero type {hero_type_ord} not found in roster")
    
    elif cmd_name == "EQUIP_ITEM" and player:
        # ── Equip an item to a hero ─────────────────────────────────
        hero_type_ord = parsed.get("heroType", 0)
        item_type_ord = parsed.get("itemType", 0)
        slot_str = extra.get("SLOT", "0")
        slot = int(slot_str) if slot_str.isdigit() else 0
        
        hero = _find_hero_by_type(player, hero_type_ord)
        if hero:
            # Track equipment on hero
            equipment = hero.get("equipment", {})
            equipment[str(slot)] = item_type_ord
            hero["equipment"] = equipment
            
            # Remove item from inventory
            items = player.get("items", {})
            str_item = str(item_type_ord)
            if str_item in items:
                items[str_item] = max(0, items[str_item] - 1)
                if items[str_item] == 0:
                    del items[str_item]
                if conn:
                    update_player(player["id"], conn=conn, items=items)
            
            if conn:
                update_hero(hero["id"], conn=conn,
                           equipment=json.dumps(equipment))
            
            logger.info(f"  → EQUIP_ITEM: hero={hero_type_ord}, "
                        f"item={item_type_ord}, slot={slot}")
        else:
            logger.warning(f"  → EQUIP_ITEM: hero type {hero_type_ord} not found")
    
    elif cmd_name == "UPGRADE_SKILL" and player:
        # ── Upgrade a hero skill (costs gold) ───────────────────────
        hero_type_ord = parsed.get("heroType", 0)
        skill_id = parsed.get("iD", 0)
        
        hero = _find_hero_by_type(player, hero_type_ord)
        hero_level = hero.get("level", 1) if hero else 1
        
        # Gold cost scales with hero level (approximation from game data)
        gold_cost = max(100, hero_level * 200)
        player["gold"] = max(0, player.get("gold", 0) - gold_cost)
        
        if conn:
            update_player(player["id"], conn=conn, gold=player["gold"])
        
        logger.info(f"  → UPGRADE_SKILL: hero={hero_type_ord}, skill={skill_id}, "
                    f"cost={gold_cost}g, gold now={player['gold']}")
    
    elif cmd_name == "PROMOTE" and player:
        # ── Promote hero (advance rarity, consume equipment) ────────
        hero_type_ord = parsed.get("heroType", 0)
        hero = _find_hero_by_type(player, hero_type_ord)
        
        if hero:
            old_rarity = hero.get("rarity", 0)
            hero["rarity"] = old_rarity + 1
            hero["equipment"] = {}  # Promotion consumes all equipped items
            
            if conn:
                update_hero(hero["id"], conn=conn,
                           rarity=hero["rarity"],
                           equipment="{}")
            
            logger.info(f"  → PROMOTE: hero={hero_type_ord}, "
                        f"rarity {old_rarity} → {hero['rarity']}")
        else:
            logger.warning(f"  → PROMOTE: hero type {hero_type_ord} not found")
    
    elif cmd_name == "EVOLVE" and player:
        # ── Evolve hero (advance stars) ─────────────────────────────
        hero_type_ord = parsed.get("heroType", 0)
        hero = _find_hero_by_type(player, hero_type_ord)
        
        if hero:
            old_stars = hero.get("stars", 1)
            hero["stars"] = old_stars + 1
            
            if conn:
                update_hero(hero["id"], conn=conn, stars=hero["stars"])
            
            logger.info(f"  → EVOLVE: hero={hero_type_ord}, "
                        f"stars {old_stars} → {hero['stars']}")
        else:
            logger.warning(f"  → EVOLVE: hero type {hero_type_ord} not found")
    
    elif cmd_name == "SELL_ITEM" and player:
        # ── Sell items for gold ─────────────────────────────────────
        item_type_ord = parsed.get("itemType", 0)
        qty_str = extra.get("QUANTITY", "1")
        quantity = int(qty_str) if qty_str.isdigit() else 1
        
        sell_price = 100 * quantity  # Approximate
        player["gold"] = player.get("gold", 0) + sell_price
        
        items = player.get("items", {})
        str_item = str(item_type_ord)
        if str_item in items:
            items[str_item] = max(0, items[str_item] - quantity)
            if items[str_item] == 0:
                del items[str_item]
        
        if conn:
            update_player(player["id"], conn=conn,
                         gold=player["gold"], items=items)
        
        logger.info(f"  → SELL_ITEM: item={item_type_ord} x{quantity}, "
                    f"+{sell_price}g, gold now={player['gold']}")
    
    elif cmd_name == "BUY_STAMINA" and player:
        # ── Buy stamina (free on private server) ────────────────────
        player["stamina"] = player.get("stamina", 0) + 120
        if conn:
            update_player(player["id"], conn=conn, stamina=player["stamina"])
        logger.info(f"  → BUY_STAMINA: stamina now {player['stamina']}")
    
    elif cmd_name == "BUY_GOLD" and player:
        # ── Buy gold (free on private server) ───────────────────────
        player["gold"] = player.get("gold", 0) + 50000
        if conn:
            update_player(player["id"], conn=conn, gold=player["gold"])
        logger.info(f"  → BUY_GOLD: gold now {player['gold']}")
    
    elif cmd_name in ("COMPLETE_QUEST", "VIEW_DAILY_QUESTS", "CLAIM_SIGNIN_REWARD",
                       "VIEW_TREASURE", "REFRESH_SPECIAL_EVENTS", "UPDATE_TIME"):
        logger.info(f"  → {cmd_name}: acknowledged (informational)")
    
    else:
        logger.info(f"  → {cmd_name}: not yet handled (logged for analysis)")
    
    # Action1 is fire-and-forget for the protocol — no response needed
    return []


def handle_default(client_state, msg_name, msg_number, fields):
    """Handle unknown messages - log everything for debugging."""
    logger.info(f"=== UNHANDLED: {msg_name} #{msg_number} ({len(fields)} fields) ===")
    for key, val in sorted(fields.items()):
        logger.info(f"  {key} = {repr(val)}")
    logger.info(f"=== END {msg_name} ===")
    return []
