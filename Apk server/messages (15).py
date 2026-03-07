"""
DragonSoul Server Emulator - Message Types and Serialization

Handles encoding/decoding of all game message types.

FIXED: Message header uses string-based names, not integer type IDs.
FIXED: BootData1 field order matches APK writeData declaration order.
FIXED: Sub-message framing with [0x10][4B size][body].
FIXED: V2 split map format via pack_field_map.
Wire format: [4B name_len][name string][4B msg_num][4B resp_num][1B version][fields...]
"""

import struct
import logging
import time
import os

from protocol import (
    pack_message_header, unpack_message_header,
    pack_field_int, pack_field_long, pack_field_string, pack_field_bool,
    pack_field_enum, pack_field_float, pack_field_list, pack_field_map, pack_field_map_keys_first,
    pack_field_message, pack_skip, pack_int, pack_long, pack_string,
    pack_bool, pack_enum, pack_size, pack_float,
    pack_submsg,
    unpack_field_int, unpack_field_long, unpack_field_string, unpack_field_bool,
    unpack_field_enum, unpack_field_float,
    read_field_tag, unpack_int, unpack_long, unpack_string, unpack_bool,
    unpack_size, unpack_enum, unpack_float,
    VERSION_V2, TAG_FIELD, TAG_SKIP, TAG_END, 
)

logger = logging.getLogger("messages")


# ─── Message Index ───────────────────────────────────────────────────────────
# Full mapping from MessageFactory.smali (kept for reference)

MESSAGE_INDEX = {
    8: "ReferralTracking1", 9: "UserInfo1", 10: "BasicUserInfo1", 11: "Avatar1",
    12: "PrivateUserInfo1", 13: "MailMessage1", 14: "GlobalMailMessagePerUserData1",
    15: "MerchantItemData1", 16: "MerchantUpdate1", 17: "PurchaseMerchantItem1",
    18: "ResourceUpdate1", 19: "ItemUpdate1", 20: "IAPVerificationRequest1",
    21: "IAPVerificationResponse1", 22: "IAPCompletePurchase1",
    23: "AmazonVerificationRequest1", 24: "AmazonVerificationResponse1",
    25: "SettingsSync1", 26: "Notification1", 27: "Ping1", 28: "Logout1",
    29: "PerfReport1", 30: "TestPerfReport1", 31: "FacebookUserInfo1",
    32: "GooglePlusUserInfo1", 33: "GameCenterUserInfo1", 34: "GameCircleUserInfo1",
    35: "UserInfoResponse1", 36: "GetExistingUsers1", 37: "BlockUser1",
    38: "UnblockUser1", 39: "GetBlockedList1", 40: "ReconnectionComplete1",
    41: "SetLanguage1", 42: "OpenGLExtensions1", 43: "RequestInAppPurchaseForVerify1",
    44: "InAppPurchaseVerifiedAndGiven1", 45: "InAppPurchaseVerified1",
    46: "InAppPurchaseError1", 47: "BetaPurchase1", 48: "InGameNotification1",
    49: "ChangeTutorialStep1", 50: "RequestResync1", 51: "ClearAuthType1",
    52: "SendChat1", 53: "UpdateChat1", 54: "RemoveChat1", 55: "CraftItem1",
    56: "SetPlayerName1", 57: "SetPlayerAvatar1", 58: "TitanTempleAttack1",
    59: "SpecialEventRaw1", 60: "ContestRaw1", 61: "ContestTaskInfo1",
    62: "ContestData1", 63: "ContestExtraData1", 64: "GetArenaInfo1",
    65: "ArenaUpdate1", 66: "ArenaPromotion1", 67: "ArenaDemotion1",
    68: "MachinimaAction1", 69: "Battle1", 70: "UpdateUserTime1",
    71: "ABTestGroups1", 72: "GetExpedition1", 73: "GetExpeditionResponse1",
    74: "ResetExpedition1", 75: "ResetExpeditionResponse1",
    76: "RequestExtendedGuildInfo1", 77: "PMRoomSummary1", 78: "CreateGuild1",
    79: "EditGuild1", 80: "EditGuildCryptSettings1", 81: "LeaveGuild1",
    82: "JoinGuild1", 83: "KickFromGuild1", 84: "PromoteToOfficer1",
    85: "DemoteFromOfficer1", 86: "AcceptGuildMember1", 87: "ClaimInactiveGuild1",
    88: "ListRecommendedGuilds1", 89: "SearchGuilds1", 90: "UserGuildUpdate1",
    91: "HeroHired1", 92: "GetCryptRaid1", 93: "StartCryptRaidAttack1",
    94: "AddInProgressCryptAttack1", 95: "RemoveInProgressCryptAttack1",
    96: "CryptRaidUpdate1", 97: "CryptRaidStartTimeUpdate1",
    98: "CryptRaidHeroesUpdate1", 99: "GetHeroWall1", 100: "GetServers1",
    101: "Server1", 102: "TitanTempleSummary1", 103: "GetTitanTempleData1",
    104: "AddInProgressTempleAttack1", 105: "RemoveInProgressTempleAttack1",
    106: "RedeemCodeResponse1", 107: "WarRedDotInfo1", 108: "WarLogs1",
    109: "StartGuildWarAttack1", 110: "AddInProgressGuildWarAttack1",
    111: "EndInProgressGuildWarAttack1", 112: "GuildWarFightComplete1",
    113: "GuildWarAttacked1", 114: "GuildRegisteredForWar1",
    115: "WarPrepComplete1", 116: "GuildBattleStarted1",
    117: "GuildBattleEnded1", 118: "GuildWarEnded1",
    119: "GuildRegistrationRemoved1", 120: "GuildWarOpponentUpdate1",
    121: "GuildWarMMRUpdate1", 122: "GuildEligibleMemberChange1",
    123: "DebugGiveRune1", 124: "ClockChange1", 125: "DebugEditHeroes1",
    126: "FriendUpdate1", 127: "Friend1", 128: "GuildWarOptedOut1",
    129: "BossPitRaidResults1", 130: "CampaignLevelStatus1",
    131: "UserLootMemoryChange1", 132: "PlayerRow1", 133: "GuildRow1",
    134: "BasicGuildInfo1", 135: "GuildInfo1", 136: "TutorialAct1",
    137: "Replay1", 138: "EquippedItemData1", 139: "HeroLineupUpdate1",
    140: "IAPProduct1", 141: "VIPPromoCard1", 142: "HeroSummary1",
    143: "ExtendedHeroSummary1", 144: "HeroPersistentData1",
    145: "CryptRaidMemberSummary1", 146: "CryptRaidScoringInfo1",
    147: "ContestRankingRow1", 148: "WarBattle1", 149: "WarFight1",
    150: "WarFightUserInfo1", 151: "WarLineupData1", 152: "WarBattleResult1",
    153: "WarResult1", 154: "WarSummary1", 155: "GuildWarRankingRow1",
    156: "WarGuildProgress1", 157: "FuseRunes1", 158: "RuneEmpowerResults1",
    159: "RuneImbueResults1", 160: "RuneBonusData1",
    161: "ChestAcknowledgement1", 162: "ArenaShortInfoExtra1",
    163: "ArenaLeagueExtra1", 164: "GuildChatExtra1", 165: "UserSaveData1",
    166: "GetUserSaveData1", 167: "CryptRaidMemberData1",
    168: "HeroWallPostExtra1", 169: "TitanTempleAttackOutcome1",
    170: "WarMemberData1", 171: "WarMemberBattleData1",
    172: "IOSPurchaseLog1", 173: "ReplayKitStarted1", 174: "ReplayKitEnded1",
    175: "FriendExtra1", 176: "PersonalMessageExtra1",
    177: "GenerateDiscourseAuthToken1", 178: "DiscourseAuthToken1",
    179: "TempleWinCountUpdatedMessage1", 180: "GuildRemovedFromWar1",
    181: "GetBossBattles1", 182: "ResetBossBattleResponse1",
    183: "AdvanceBossBattleResponse1", 184: "BossBattleData1",
    185: "PMThreadHideChannel1", 186: "BootData1", 187: "ResyncData1",
    188: "UserExtra1", 189: "HeroData1", 190: "HeroBattleData1",
    191: "RuneData1", 192: "HeroLineup1", 193: "MerchantData1",
    194: "HeroBattleDatas1", 195: "MercenaryHeroData1", 196: "MailExtra1",
    197: "RewardDrop1", 198: "PossibleChestDrops1", 199: "Action1",
    200: "ActionGroup1", 201: "ExistingUserInfos1", 202: "BlockedList1",
    203: "IAPProducts1", 204: "BuyChests1", 205: "OpenExpeditionChest1",
    206: "Chat1", 207: "PMThread1", 208: "RaidTicketResults1",
    209: "RaidOutcome1", 210: "RaidAllTicketResults1", 211: "AttackBase1",
    212: "DamageInfo1", 213: "CampaignAttack1", 214: "DifficultyModeAttack1",
    215: "ExpeditionAttack1", 216: "CryptRaidAttack1", 217: "BossPitAttack1",
    218: "GuildWarAttack1", 219: "Lineup1", 220: "BossBattleAttack1",
    221: "SigninRewards1", 222: "SigninReward1", 223: "SpecialEventsRaw1",
    224: "SpecialEventsUpdate1", 225: "ContestsUpdate1", 226: "ContestTasks1",
    227: "ContestProgressRewards1", 228: "ContestProgressRewardInfo1",
    229: "ContestRankRewards1", 230: "ContestRankRewardInfo1",
    231: "AllContestData1", 232: "ArenaInfo1", 233: "ArenaRow1",
    234: "LineupSummary1", 235: "StartArenaAttackResponse1",
    236: "ArenaAttack1", 237: "StartColiseumAttackResponse1",
    238: "ColiseumAttack1", 239: "ColiseumBattle1", 240: "PlayerRankings1",
    241: "GuildRankings1", 242: "PlayerArenaRankings1",
    243: "ArenaRankingRow1", 244: "ContestRankings1",
    245: "ExtendedGuildInfo1", 246: "PlayerGuildRow1", 247: "SocialHistory1",
    248: "ChatList1", 249: "ListRecGuildsResponse1",
    250: "SearchGuildsResponse1", 251: "HeroesForHire1", 252: "EnchantItem1",
    253: "CryptRaidData1", 254: "CryptRaidOpponentSummary1",
    255: "CryptLogData1", 256: "StartCryptRaidAttackResponse1",
    257: "HeroWall1", 258: "Servers1", 259: "TitanTempleSummaries1",
    260: "TitanTempleData1", 261: "TitanTempleRoundData1",
    262: "TitanTempleInviteData1", 263: "PlayerTempleRow1",
    264: "StartTempleAttackResponse1", 265: "MailMessageUpdate1",
    266: "WarInfo1", 267: "WarMembers1", 268: "WarMemberInfo1",
    269: "GuildWarRankings1", 270: "StartGuildWarAttackResponse1",
    271: "ClaimGuildWarRewards1", 272: "ClaimedPickRewards1",
    273: "DifficultyModeRaidResults1", 274: "ExpeditionRunData1",
    275: "DefenderData1", 276: "NodeReward1", 277: "BossPitData1",
    278: "WarGuildInfo1", 279: "WarOpponentInfo1", 280: "WarFightLog1",
    281: "WarBattleLog1", 282: "WarLog1", 283: "ActivateRuneShrine1",
    284: "RuneShrineActivationResults1", 285: "RequestChestAcknowledgement1",
    286: "GuildExtra1", 287: "CryptRaidExtra1",
    288: "CryptRaidOpponentData1", 289: "CryptLogExtra1",
    290: "TitanTempleExtra1", 291: "TitanTempleAttackOutcomes1",
    292: "TitanTempleTitanData1", 293: "GuildWarLogExtra1",
    294: "GuildWarBattleExtra1", 295: "WarOpponentData1",
    296: "FullWarLineupData1", 297: "ChatExtra1",
    298: "MultipleHeroLineupUpdate1", 299: "BossBattlesResponse1",
    300: "BossBattleResponse1", 301: "BossBattleExtraData1",
}

MESSAGE_NAME_TO_ID = {v: k for k, v in MESSAGE_INDEX.items()}

# ClientInfo is message index 0 (not in the factory list above)
MESSAGE_INDEX[0] = "ClientInfo1"
MESSAGE_NAME_TO_ID["ClientInfo1"] = 0


# ─── Enums ───────────────────────────────────────────────────────────────────

class Platform:
    ANDROID = 0
    IOS = 1
    AMAZON = 2

class BuildSource:
    GOOGLE_PLAY = 0
    AMAZON = 1
    IOS = 2

class Rarity:
    # Must match client enum ordinals exactly (com.perblue.rpg.network.messages.Rarity)
    DEFAULT = 0
    WHITE = 1        # Starting rarity for new heroes
    GREEN = 2
    GREEN_1 = 3
    BLUE = 4
    BLUE_1 = 5
    BLUE_2 = 6
    PURPLE = 7
    PURPLE_1 = 8
    PURPLE_2 = 9
    PURPLE_3 = 10
    PURPLE_4 = 11
    ORANGE = 12
    ORANGE_1 = 13
    ORANGE_2 = 14
    ORANGE_3 = 15
    ORANGE_4 = 16
    ORANGE_5 = 17
    ORANGE_6 = 18
    ORANGE_7 = 19
    ORANGE_8 = 20
    CYAN = 21
    CYAN_1 = 22
    CYAN_2 = 23
    CYAN_3 = 24
    CYAN_4 = 25
    RED = 26

    # Skill unlock thresholds: skill_index -> minimum rarity ordinal to unlock
    # _0=DEFAULT(always), _1=WHITE, _2=GREEN, _3=BLUE, _4=PURPLE, _5=ORANGE
    SKILL_UNLOCK = {0: 0, 1: 1, 2: 2, 3: 4, 4: 7, 5: 12}

class ResourceType:
    # Must match APK: com.perblue.rpg.network.messages.ResourceType
    DEFAULT = 0
    DIAMONDS = 1
    GOLD = 2
    STAMINA = 3
    TEAM_XP = 4
    POWER_POINTS = 5
    VIP_TICKETS = 6
    SILVER_CHEST = 7
    GOLD_CHEST = 8
    SOUL_CHEST = 9
    FIGHT_TOKENS = 10
    FREE_DIAMONDS = 11
    PAID_DIAMONDS = 12
    EXPEDITION_TOKENS = 13
    GUILD_TOKENS = 14
    COLISEUM_TOKENS = 15
    SOULMART_TOKENS = 16
    WAR_TOKENS = 17
    RUNICITE = 18
    BAZAAR_TOKENS = 21
    ARENA_TOKENS = 6
    COLISEUM_TOKENS = 7
    GUILD_TOKENS = 8
    CRYPT_TOKENS = 9
    RAID_TICKETS = 10
    BOSS_TOKENS = 11

class GameMode:
    # Must match APK: com.perblue.rpg.network.messages.GameMode
    CAMPAIGN = 0
    ELITE_CAMPAIGN = 1
    EXPEDITION = 2
    THE_MOUNTAIN_SUMMIT = 3
    THE_MOUNTAIN_CAVES = 4
    CHALLENGES_MAGIC_IMMUNE = 5
    CHALLENGES_PHYSICAL_IMMUNE = 6
    CHALLENGES_ONLY_DRAGONS = 7
    FIGHT_PIT = 8          # was ARENA=1
    CRYPT = 9              # was CRYPT_RAID=2
    ENCHANTING = 10
    COLISEUM = 11          # was 6
    TITAN_TEMPLE = 12      # was 7
    BOSS_PIT = 13          # was 5
    GUILD_WAR = 14         # was 4
    GUILD_WAR_REGISTRATION = 15
    RUNES = 16
    CRAFT = 17
    XP_BONUS_TEAM = 18
    BOSS_BATTLE = 19       # was 8
    EXPERT_CAMPAIGN = 20

class ArenaType:
    # Must match APK: com.perblue.rpg.network.messages.ArenaType
    DEFAULT = 0
    FIGHT_PIT = 1
    COLISEUM = 2

class ArenaTier:
    # Must match APK: com.perblue.rpg.network.messages.ArenaTier
    DEFAULT = 0
    COPPER = 1
    BRONZE = 2
    SILVER = 3
    GOLD = 4
    PLATINUM = 5
    CHALLENGER = 6

class GuildNewMemberPolicy:
    OPEN = 0
    REQUEST = 1
    CLOSED = 2

class CampaignType:
    NORMAL = 0
    ELITE = 1


# ─── Message Parsing ────────────────────────────────────────────────────────

def parse_incoming_message(raw_data):
    """
    Parse an incoming raw message into a dict.
    
    Wire format: [4B name_len][name string][4B msg_num][4B resp_num][1B version][fields...]
    
    Returns (msg_type_name, msg_type_id, msg_number, fields_dict)
    """
    if len(raw_data) < 9:  # minimum: 4(name_len) + 0(empty name) + 4(msg_num) + 1(version)
        logger.warning(f"Message too short: {len(raw_data)} bytes")
        return None, 0, 0, {}
    
    # Unpack header with string-based name
    msg_type_name, msg_number, resp_msg_number, version, offset = \
        unpack_message_header(raw_data)
    
    # Look up numeric ID for reference (not used for dispatch)
    msg_type_id = MESSAGE_NAME_TO_ID.get(msg_type_name, -1)
    
    # Parse fields based on message type
    fields = {}
    remaining = raw_data[offset:]
    
    try:
        if msg_type_name == "ClientInfo1":
            fields = parse_client_info(remaining)
        elif msg_type_name == "Ping1":
            fields = parse_ping(remaining)
        elif msg_type_name == "DownloadTime1":
            fields = parse_download_time(remaining)
        elif msg_type_name == "SetPlayerName1":
            fields = parse_set_player_name(remaining)
        elif msg_type_name == "GetArenaInfo1":
            fields = parse_get_arena_info(remaining)
        elif msg_type_name == "GetServers1":
            fields = {}
        elif msg_type_name == "CampaignAttack1":
            fields = parse_campaign_attack(remaining)
        elif msg_type_name == "GetExpedition1":
            fields = {}
        elif msg_type_name == "RequestResync1":
            fields = {}
        elif msg_type_name == "ChangeTutorialStep1":
            fields = parse_change_tutorial(remaining)
        elif msg_type_name == "SendChat1":
            fields = parse_send_chat(remaining)
        elif msg_type_name == "CraftItem1":
            fields = parse_craft_item(remaining)
        elif msg_type_name == "HeroLineupUpdate1":
            fields = parse_hero_lineup_update(remaining)
        elif msg_type_name == "GetBossBattles1":
            fields = {}
        elif msg_type_name == "ListRecommendedGuilds1":
            fields = {}
        elif msg_type_name == "GetHeroWall1":
            fields = {}
        elif msg_type_name == "BuyChests1":
            fields = parse_buy_chests(remaining)
        else:
            # For unknown messages, just store raw remaining bytes
            fields = {"_raw": remaining}
    except Exception as e:
        logger.error(f"Error parsing {msg_type_name}: {e}")
        fields = {"_raw": remaining, "_error": str(e)}
    
    return msg_type_name, msg_type_id, msg_number, fields


def parse_client_info(data):
    """
    Parse ClientInfo1 message fields.
    
    FIXED: Field order matches the APK's writeData() declaration order
    (decompiled from ClientInfo.smali), NOT alphabetical order.
    
    FIXED: privateLoginInfo uses sub-message framing [4B size][body].
    FIXED: PrivateUserInfo inner field order matches APK writeData.
    FIXED: statVersions is a V2 split map with Long values, not Int.
    FIXED: There is a skipped field (0x20) between shardID and statVersions.
    """
    fields = {}
    offset = 0
    
    try:
        # ── Fields in APK writeData order ──────────────────────────────
        
        # 1. language: String
        val, offset = unpack_field_string(data, offset)
        fields["language"] = val
        
        # 2. platform: Platform (enum)
        val, offset = unpack_field_enum(data, offset)
        fields["platform"] = val
        
        # 3. systemDescription: String
        val, offset = unpack_field_string(data, offset)
        fields["systemDescription"] = val
        
        # 4. systemVersion: String
        val, offset = unpack_field_string(data, offset)
        fields["systemVersion"] = val
        
        # 5. sDKVersion: Integer
        val, offset = unpack_field_int(data, offset)
        fields["sDKVersion"] = val
        
        # 6. phoneName: String
        val, offset = unpack_field_string(data, offset)
        fields["phoneName"] = val
        
        # 7. systemName: String
        val, offset = unpack_field_string(data, offset)
        fields["systemName"] = val
        
        # 8. uniqueIdentifier: String
        val, offset = unpack_field_string(data, offset)
        fields["uniqueIdentifier"] = val
        
        # 9. carrierName: String
        val, offset = unpack_field_string(data, offset)
        fields["carrierName"] = val
        
        # 10. networkType: String
        val, offset = unpack_field_string(data, offset)
        fields["networkType"] = val
        
        # 11. aPMacAddress: String
        val, offset = unpack_field_string(data, offset)
        fields["aPMacAddress"] = val
        
        # 12. aPSSID: String
        val, offset = unpack_field_string(data, offset)
        fields["aPSSID"] = val
        
        # 13. isConnectedToCell: Boolean
        val, offset = unpack_field_bool(data, offset)
        fields["isConnectedToCell"] = val
        
        # 14. isConnectedToWiFi: Boolean
        val, offset = unpack_field_bool(data, offset)
        fields["isConnectedToWiFi"] = val
        
        # 15. imei: String
        val, offset = unpack_field_string(data, offset)
        fields["imei"] = val
        
        # 16. version: Integer
        val, offset = unpack_field_int(data, offset)
        fields["version"] = val
        
        # 17. timeOffset: Integer
        val, offset = unpack_field_int(data, offset)
        fields["timeOffset"] = val
        
        # 18. referalData: String
        val, offset = unpack_field_string(data, offset)
        fields["referalData"] = val
        
        # 19. rawLanguage: String
        val, offset = unpack_field_string(data, offset)
        fields["rawLanguage"] = val
        
        # 20. screenWidth: Integer
        val, offset = unpack_field_int(data, offset)
        fields["screenWidth"] = val
        
        # 21. screenHeight: Integer
        val, offset = unpack_field_int(data, offset)
        fields["screenHeight"] = val
        
        # 22. screenDensity: Float
        val, offset = unpack_field_float(data, offset)
        fields["screenDensity"] = val
        
        # 23. phoneModel: String
        val, offset = unpack_field_string(data, offset)
        fields["phoneModel"] = val
        
        # 24. registrationID: String
        val, offset = unpack_field_string(data, offset)
        fields["registrationID"] = val
        
        # 25. country: String
        val, offset = unpack_field_string(data, offset)
        fields["country"] = val
        
        # 26. dPIX: Float
        val, offset = unpack_field_float(data, offset)
        fields["dPIX"] = val
        
        # 27. dPIY: Float
        val, offset = unpack_field_float(data, offset)
        fields["dPIY"] = val
        
        # 28. fullVersion: Integer
        val, offset = unpack_field_int(data, offset)
        fields["fullVersion"] = val
        
        # 29. advertisingIdentifier: String
        val, offset = unpack_field_string(data, offset)
        fields["advertisingIdentifier"] = val
        
        # 30. clientConfigsHash: Integer
        val, offset = unpack_field_int(data, offset)
        fields["clientConfigsHash"] = val
        
        # 31. screenSize: Integer
        val, offset = unpack_field_int(data, offset)
        fields["screenSize"] = val
        
        # 32. packageName: String
        val, offset = unpack_field_string(data, offset)
        fields["packageName"] = val
        
        # 33. notifType: String
        val, offset = unpack_field_string(data, offset)
        fields["notifType"] = val
        
        # 34. isReconnect: Boolean
        val, offset = unpack_field_bool(data, offset)
        fields["isReconnect"] = val
        
        # 35. buildSource: BuildSource (enum)
        val, offset = unpack_field_enum(data, offset)
        fields["buildSource"] = val
        
        # 36. privateLoginInfo: PrivateUserInfo (sub-message with size framing)
        #     Wire: [TAG_FIELD][4B body_size][body...]
        tag, offset = read_field_tag(data, offset)
        if tag is True:
            body_size, offset = unpack_size(data, offset)
            body_end = offset + body_size
            # Parse PrivateUserInfo fields from the body
            # Field order from PrivateUserInfo.writeData in APK:
            pui = {}
            pui_off = 0
            body = data[offset:body_end]
            v, pui_off = unpack_field_string(body, pui_off)
            pui["email"] = v
            v, pui_off = unpack_field_long(body, pui_off)
            pui["facebookID"] = v
            v, pui_off = unpack_field_string(body, pui_off)
            pui["googlePlusID"] = v
            v, pui_off = unpack_field_string(body, pui_off)
            pui["gameCenterID"] = v
            v, pui_off = unpack_field_string(body, pui_off)
            pui["gameCircleID"] = v
            v, pui_off = unpack_field_string(body, pui_off)
            pui["facebookName"] = v
            v, pui_off = unpack_field_string(body, pui_off)
            pui["googlePlusName"] = v
            v, pui_off = unpack_field_string(body, pui_off)
            pui["gameCenterName"] = v
            v, pui_off = unpack_field_string(body, pui_off)
            pui["gameCircleName"] = v
            v, pui_off = unpack_field_string(body, pui_off)
            pui["zendeskUserToken"] = v
            fields["privateLoginInfo"] = pui
            offset = body_end
        
        # 37. userID: Long
        val, offset = unpack_field_long(data, offset)
        fields["userID"] = val
        
        # 38. signature: String
        val, offset = unpack_field_string(data, offset)
        fields["signature"] = val
        
        # 39. dontLinkUser: Boolean
        val, offset = unpack_field_bool(data, offset)
        fields["dontLinkUser"] = val
        
        # 40. limitAdTracking: Boolean
        val, offset = unpack_field_bool(data, offset)
        fields["limitAdTracking"] = val
        
        # 41. shardID: Integer
        val, offset = unpack_field_int(data, offset)
        fields["shardID"] = val
        
        # 42. (skipped field — APK writes TAG_SKIP 0x20 here)
        tag, offset = read_field_tag(data, offset)
        # tag should be False (TAG_SKIP), just consume it
        
        # 43. statVersions: Map<String, Long> — V2 split format
        #     Wire: [TAG_FIELD][4B count][key_str1][key_str2]...[long_val1][long_val2]...
        tag, offset = read_field_tag(data, offset)
        if tag is True:
            count, offset = unpack_size(data, offset)
            keys = []
            for _ in range(count):
                k, offset = unpack_string(data, offset)
                keys.append(k)
            sv = {}
            for k in keys:
                v, offset = unpack_long(data, offset)
                sv[k] = v
            fields["statVersions"] = sv
        
        # 44. timeZone: String
        val, offset = unpack_field_string(data, offset)
        fields["timeZone"] = val
        
        # 45. loginRequestID: String
        val, offset = unpack_field_string(data, offset)
        fields["loginRequestID"] = val
        
    except Exception as e:
        logger.debug(f"ClientInfo parse partial at offset {offset}: {e}")
    
    return fields


def parse_ping(data):
    """Parse Ping1 fields: clientTime (Long), lastServerTime (Long), sequenceNumber (Int)."""
    fields = {}
    offset = 0
    try:
        val, offset = unpack_field_long(data, offset)
        fields["clientTime"] = val
        val, offset = unpack_field_long(data, offset)
        fields["lastServerTime"] = val
        val, offset = unpack_field_int(data, offset)
        fields["sequenceNumber"] = val
    except:
        pass
    return fields


def parse_download_time(data):
    """Parse DownloadTime1 fields."""
    fields = {}
    offset = 0
    try:
        val, offset = unpack_field_string(data, offset)
        fields["uniqueIdentifier"] = val
    except:
        pass
    return fields


def parse_set_player_name(data):
    """Parse SetPlayerName1."""
    fields = {}
    offset = 0
    try:
        val, offset = unpack_field_string(data, offset)
        fields["name"] = val
    except:
        pass
    return fields


def parse_get_arena_info(data):
    """Parse GetArenaInfo1."""
    fields = {}
    offset = 0
    try:
        val, offset = unpack_field_enum(data, offset)
        fields["arenaType"] = val
    except:
        pass
    return fields


def parse_campaign_attack(data):
    """Parse CampaignAttack1.
    
    Wire format:
      [TAG] base: AttackBase sub-message [4B size][body with won, seed, replay...]
      [TAG] campaignType: enum
      [TAG] chapter: int
      [TAG] level: int
    
    The base sub-message contains a large replay payload (~2400 bytes)
    that we must skip over to reach the outer chapter/level fields.
    """
    fields = {}
    offset = 0
    try:
        # base: AttackBase (sub-message with size prefix)
        present, offset = read_field_tag(data, offset)
        if present:
            # Read sub-message size (4B LE) and extract body
            submsg_size, offset = unpack_size(data, offset)
            submsg_body = data[offset:offset + submsg_size]
            # Skip past entire sub-message body for outer fields
            offset += submsg_size
            
            # Parse base sub-message body: won (bool), seed (int), replay (skipped)
            base = {}
            sub_offset = 0
            try:
                tag, sub_offset = read_field_tag(submsg_body, sub_offset)
                if tag is True:
                    v, sub_offset = unpack_bool(submsg_body, sub_offset)
                    base["won"] = v
                tag, sub_offset = read_field_tag(submsg_body, sub_offset)
                if tag is True:
                    v, sub_offset = unpack_int(submsg_body, sub_offset)
                    base["seed"] = v
                # replay sub-message is skipped (rest of submsg_body)
            except Exception as e:
                logger.debug(f"CampaignAttack base parse partial: {e}")
            fields["base"] = base
        
        # campaignType: CampaignType (enum)
        val, offset = unpack_field_enum(data, offset)
        fields["campaignType"] = val
        
        # chapter: Integer
        val, offset = unpack_field_int(data, offset)
        fields["chapter"] = val
        
        # level: Integer  
        val, offset = unpack_field_int(data, offset)
        fields["level"] = val
    except Exception as e:
        logger.debug(f"CampaignAttack parse partial: {e}")
    return fields


def parse_change_tutorial(data):
    """Parse ChangeTutorialStep1."""
    fields = {}
    offset = 0
    try:
        val, offset = unpack_field_int(data, offset)
        fields["step"] = val
    except:
        pass
    return fields


def parse_send_chat(data):
    """Parse SendChat1."""
    fields = {}
    offset = 0
    try:
        val, offset = unpack_field_string(data, offset)
        fields["message"] = val
        val, offset = unpack_field_int(data, offset)
        fields["channel"] = val
    except:
        pass
    return fields


def parse_craft_item(data):
    """Parse CraftItem1."""
    fields = {}
    offset = 0
    try:
        val, offset = unpack_field_int(data, offset)
        fields["heroNum"] = val
        val, offset = unpack_field_int(data, offset)
        fields["slot"] = val
    except:
        pass
    return fields


def parse_hero_lineup_update(data):
    """Parse HeroLineupUpdate1."""
    fields = {}
    offset = 0
    try:
        val, offset = unpack_field_int(data, offset)
        fields["mode"] = val
        # heroes list
        present, offset = read_field_tag(data, offset)
        if present:
            count, offset = unpack_size(data, offset)
            heroes = []
            for _ in range(count):
                h, offset = unpack_int(data, offset)
                heroes.append(h)
            fields["heroes"] = heroes
    except:
        pass
    return fields


def parse_buy_chests(data):
    """Parse BuyChests1."""
    fields = {}
    offset = 0
    try:
        val, offset = unpack_field_int(data, offset)
        fields["chestType"] = val
        val, offset = unpack_field_int(data, offset)
        fields["count"] = val
    except:
        pass
    return fields


# ─── Message Building ───────────────────────────────────────────────────────

def build_message(msg_type_name, msg_number, fields_data=b"", response_to=0):
    """
    Build a complete raw message with header and fields.
    
    Uses string-based message name in the header (matching Java client format).
    
    Args:
        msg_type_name: String name of the message (e.g. "BootData1")
        msg_number: The message sequence number
        fields_data: Serialized field bytes
        response_to: The msg_number this is responding to (0 if not a response)
    """
    header = pack_message_header(msg_type_name, msg_number, response_to)
    return header + fields_data


# ─── Sub-message Body Builders (FIXED field orders from APK) ─────────────────

def _build_avatar_body(avatar_id=1):
    """
    Build Avatar1 sub-message body.
    Fields: type (UnitType enum)
    """
    buf = bytearray()
    buf.extend(pack_field_enum(avatar_id))  # type
    buf.append(TAG_END)
    return bytes(buf)


def build_basic_user_info_body(user_id, name, level, avatar_id=1, vip_level=0,
                                guild_id=0, guild_role=0, creation_time_ms=0):
    """
    Build BasicUserInfo1 sub-message body.
    
    FIXED field order from APK writeData:
    1. iD (long)
    2. name (string)
    3. userLastActive (long)
    4. teamLevel (int)
    5. oldAvatar (int)
    6. vIPLevel (int)
    7. guildID (long)
    8. guildRole (int)
    9. creationTime (long)
    10. avatar (sub-msg frame)
    11. previousName (string)
    """
    now_ms = int(time.time() * 1000)
    if creation_time_ms == 0:
        creation_time_ms = now_ms - 86400000  # 1 day ago
    
    buf = bytearray()
    buf.extend(pack_field_long(user_id))                    # 1. iD
    buf.extend(pack_field_string(name))                     # 2. name
    buf.extend(pack_field_long(now_ms))                     # 3. userLastActive
    buf.extend(pack_field_int(level))                       # 4. teamLevel
    buf.extend(pack_field_int(avatar_id))                   # 5. oldAvatar
    buf.extend(pack_field_int(vip_level))                   # 6. vIPLevel
    buf.extend(pack_field_long(guild_id))                   # 7. guildID
    buf.extend(pack_field_int(guild_role))                  # 8. guildRole
    buf.extend(pack_field_long(creation_time_ms))           # 9. creationTime
    # 10. avatar (sub-message frame)
    avatar_body = _build_avatar_body(avatar_id)
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(avatar_body))
    buf.extend(pack_field_string(""))                       # 11. previousName
    buf.append(TAG_END)
    return bytes(buf)


def build_user_info_body(user_id, name, level, diamonds=0, shard_id=1,
                          vip_level=0, creation_time_ms=0):
    """
    Build UserInfo1 sub-message body.
    
    FIXED field order from APK writeData:
    1. basicInfo (sub-message frame)
    2. diamonds (int)
    3. creationTime (long)
    4. lastLoginTime (long)
    5. vIPLevel (int)
    6. totalPower (int)
    7. teamPower (int)
    8. totalStars (int)
    9. totalPowerRank (int)
    10. teamPowerRank (int)
    11. totalStarsRank (int)
    12. shardID (int)
    13. creationTimeServerTxt (string)
    """
    now_ms = int(time.time() * 1000)
    if creation_time_ms == 0:
        creation_time_ms = now_ms - 86400000

    buf = bytearray()
    
    # 1. basicInfo (sub-message frame)
    basic_body = build_basic_user_info_body(user_id, name, level,
                                             creation_time_ms=creation_time_ms)
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(basic_body))
    
    # 2. diamonds
    buf.extend(pack_field_int(diamonds))
    
    # 3. creationTime
    buf.extend(pack_field_long(creation_time_ms))
    
    # 4. lastLoginTime
    buf.extend(pack_field_long(now_ms))
    
    # 5. vIPLevel
    buf.extend(pack_field_int(vip_level))
    
    # 6. totalPower
    buf.extend(pack_field_int(5000))
    
    # 7. teamPower
    buf.extend(pack_field_int(1000))
    
    # 8. totalStars
    buf.extend(pack_field_int(10))
    
    # 9. totalPowerRank
    buf.extend(pack_field_int(1))
    
    # 10. teamPowerRank
    buf.extend(pack_field_int(1))
    
    # 11. totalStarsRank
    buf.extend(pack_field_int(1))
    
    # 12. shardID
    buf.extend(pack_field_int(shard_id))
    
    # 13. creationTimeServerTxt
    # SettingsScreen.createUI does substring(0, indexOf(" ")) on this string.
    # Without the space+time part, indexOf returns -1 → StringIndexOutOfBoundsException.
    buf.extend(pack_field_string("2024-01-01 00:00:00"))
    
    buf.append(TAG_END)
    return bytes(buf)


def build_private_user_info_body(email="", facebook_id=0):
    """
    Build PrivateUserInfo1 sub-message body.
    
    FIXED field order from APK writeData:
    1. email (string)
    2. facebookID (long)
    3. googlePlusID (string)
    4. gameCenterID (string)
    5. gameCircleID (string)
    6. facebookName (string)
    7. googlePlusName (string)
    8. gameCenterName (string)
    9. gameCircleName (string)
    10. zendeskUserToken (string)
    """
    buf = bytearray()
    buf.extend(pack_field_string(email))         # 1. email
    buf.extend(pack_field_long(facebook_id))     # 2. facebookID
    buf.extend(pack_field_string(""))            # 3. googlePlusID
    buf.extend(pack_field_string(""))            # 4. gameCenterID
    buf.extend(pack_field_string(""))            # 5. gameCircleID
    buf.extend(pack_field_string(""))            # 6. facebookName
    buf.extend(pack_field_string(""))            # 7. googlePlusName
    buf.extend(pack_field_string(""))            # 8. gameCenterName
    buf.extend(pack_field_string(""))            # 9. gameCircleName
    buf.extend(pack_field_string(""))            # 10. zendeskUserToken
    buf.append(TAG_END)
    return bytes(buf)


def build_server_info_body(shard_id=1, max_level=130, chapters=15):
    """
    Build Server1 (currentServer) sub-message body.
    
    FIXED field order from APK writeData:
    1. shardID (int)
    2. maxTeamLevel (int)
    3. openTime (long)
    4. haveAccount (bool)
    5. full (bool)
    6. icon (int)
    7. numChaptersAvailable (int)
    8. maxRarity (int)
    """
    buf = bytearray()
    buf.extend(pack_field_int(shard_id))                   # 1. shardID
    buf.extend(pack_field_int(max_level))                  # 2. maxTeamLevel
    buf.extend(pack_field_long(0))                         # 3. openTime
    buf.extend(pack_field_bool(True))                      # 4. haveAccount
    buf.extend(pack_field_bool(False))                     # 5. full
    buf.extend(pack_field_int(0))                          # 6. icon
    buf.extend(pack_field_int(chapters))                   # 7. numChaptersAvailable
    buf.extend(pack_field_enum(Rarity.RED))                 # 8. maxRarity (RED=26 is highest in client)
    buf.append(TAG_END)
    return bytes(buf)


# ─── Legacy builders (kept for compatibility with other handlers) ────────────

def build_basic_user_info(user_id, name, level, avatar_id=1):
    """Build BasicUserInfo1 sub-message fields (legacy, no framing)."""
    return build_basic_user_info_body(user_id, name, level, avatar_id)


def build_user_info(user_id, name, level, diamonds=0, shard_id=1):
    """Build UserInfo1 sub-message fields (legacy, no framing)."""
    return build_user_info_body(user_id, name, level, diamonds, shard_id)


def build_private_user_info(email="", facebook_id=0):
    """Build PrivateUserInfo1 sub-message fields (legacy, no framing)."""
    return build_private_user_info_body(email, facebook_id)


def build_server_info(shard_id=1, max_level=130, chapters=15):
    """Build Server1 sub-message fields (legacy, no framing)."""
    return build_server_info_body(shard_id, max_level, chapters)


from gamedata import HERO_SKILL_ORDINALS

def _build_hero_skills(hero_type, level, rarity):
    """Build correct skill map using SkillType ordinals for the hero."""
    skill_map = HERO_SKILL_ORDINALS.get(hero_type, {})
    skills = {}
    for skill_idx, skill_ordinal in skill_map.items():
        # Check if this skill is unlocked at the hero's rarity
        min_rarity = Rarity.SKILL_UNLOCK.get(skill_idx, 999)
        if rarity >= min_rarity:
            skills[skill_ordinal] = level
    if not skills and skill_map:
        # At minimum, give the auto-attack (skill_0)
        skills[skill_map[0]] = level
    return skills

# ─── Hero Data Builders (FIXED field orders from APK) ────────────────────────

def build_hero_data(hero_type, level=1, stars=1, rarity=Rarity.WHITE,
                    hero_num=0, items=None, skills=None):
    """
    Build HeroData1 sub-message body.

    FIXED field order from APK writeData:
    1. type         -> Enum (UnitType)
    2. rarity       -> Enum (Rarity)
    3. level        -> Integer
    4. eXP          -> Integer
    5. stars        -> Integer
    6. skills       -> Map<Integer, Integer> V2
    7. items        -> Map<Integer, EquippedItemData> V2
    8. heroNum      -> Integer
    9. modePersistentData -> skip
    10. isMercenary -> Boolean
    11. isLegendary -> Boolean
    12. skin        -> Enum (ItemType)
    13. runes       -> skip
    """
    buf = bytearray()

    # 1. type: UnitType (enum)
    buf.extend(pack_field_enum(hero_type))
    # 2. rarity: Rarity (enum)
    buf.extend(pack_field_enum(rarity))
    # 3. level: Integer
    buf.extend(pack_field_int(level))
    # 4. eXP: Integer
    buf.extend(pack_field_int(0))
    # 5. stars: Integer
    buf.extend(pack_field_int(stars))
    # 6. skills: Map<Integer, Integer> KEYS-FIRST (aVar.a() after key loop)
    if skills:
        buf.extend(pack_field_map_keys_first(skills, pack_int, pack_int))
    else:
        default_skills = _build_hero_skills(hero_type, level, rarity)
        buf.extend(pack_field_map_keys_first(default_skills, pack_int, pack_int))
    # 7. items: Map<Integer, EquippedItemData> KEYS-FIRST (aVar.a() after key loop)
    if items:
        # FIX: No pack_submsg for KEYS-FIRST map values — Java reads fields
        # directly within bounded context, no sub-message frame expected.
        buf.extend(pack_field_map_keys_first(items, pack_int, lambda b: b))
    else:
        buf.extend(bytes([TAG_FIELD]) + pack_size(0) + pack_size(0))  # empty: count=0, bounded-size=0
    # 8. heroNum: Integer
    buf.extend(pack_field_int(hero_num))
    # 9. modePersistentData: Map (skip)
    buf.extend(pack_skip())
    # 10. isMercenary: Boolean
    buf.extend(pack_field_bool(False))
    # 11. isLegendary: Boolean
    buf.extend(pack_field_bool(False))
    # 12. skin: ItemType (enum)
    buf.extend(pack_field_enum(0))
    # 13. runes: Map (skip)
    buf.extend(pack_skip())

    buf.append(TAG_END)
    return bytes(buf)


def build_hero_battle_data(health=1000, energy=0):
    """Build HeroBattleData1 sub-message fields."""
    buf = bytearray()
    buf.extend(pack_field_int(energy))   # energy
    buf.extend(pack_skip())              # extra (Map)
    buf.extend(pack_field_int(health))   # health
    buf.append(TAG_END)
    return bytes(buf)


def build_hero_persistent_data(hero_type, level=1, stars=1, rarity=Rarity.WHITE,
                                hero_num=0, health=1000, energy=0):
    """Build HeroPersistentData1 sub-message fields."""
    buf = bytearray()
    # heroBattleData: HeroBattleData
    buf.extend(bytes([TAG_FIELD]))
    buf.extend(build_hero_battle_data(health, energy))
    # heroData: HeroData
    buf.extend(bytes([TAG_FIELD]))
    buf.extend(build_hero_data(hero_type, level, stars, rarity, hero_num))
    buf.append(TAG_END)
    return bytes(buf)


def build_equipped_item_data(item_type=0, stars=0, total_points=0, enchant_points=0):
    """
    Build EquippedItemData1 sub-message body.

    FIXED field order from APK writeData:
    1. type                  -> Enum (ItemType)
    2. stars                 -> Integer
    3. totalPoints           -> Integer
    4. enchantMaterialPoints -> Integer
    """
    buf = bytearray()
    buf.extend(pack_field_enum(item_type))       # 1. type
    buf.extend(pack_field_int(stars))             # 2. stars
    buf.extend(pack_field_int(total_points))      # 3. totalPoints
    buf.extend(pack_field_int(enchant_points))    # 4. enchantMaterialPoints
    buf.append(TAG_END)
    return bytes(buf)


def _build_tutorial_act_body(act_type=0, version=1, step=999, max_step=999):
    """
    Build TutorialAct1 sub-message body.

    APK field order:
    1. type    -> Enum (TutorialActType)
    2. version -> Integer
    3. step    -> Integer
    4. maxStep -> Integer
    """
    buf = bytearray()
    buf.extend(pack_field_enum(act_type))    # 1. type
    buf.extend(pack_field_int(version))      # 2. version
    buf.extend(pack_field_int(step))         # 3. step
    buf.extend(pack_field_int(max_step))     # 4. maxStep
    buf.append(TAG_END)
    return bytes(buf)


def _build_campaign_level_status_body(chapter=1, level=1, stars=3, campaign_type=0,
                                       total_wins=1, wins_at_current=1, last_win_time=0):
    """
    Build CampaignLevelStatus1 sub-message body.

    APK field order:
    1. chapter             -> Integer
    2. level               -> Integer
    3. stars               -> Integer
    4. campaignType        -> Enum (CampaignType)
    5. totalWins           -> Integer
    6. winsAtCurrentStars  -> Integer
    7. lastWinTime         -> Long
    """
    buf = bytearray()
    buf.extend(pack_field_int(chapter))            # 1. chapter
    buf.extend(pack_field_int(level))              # 2. level
    buf.extend(pack_field_int(stars))              # 3. stars
    buf.extend(pack_field_enum(campaign_type))     # 4. campaignType
    buf.extend(pack_field_int(total_wins))         # 5. totalWins
    buf.extend(pack_field_int(wins_at_current))    # 6. winsAtCurrentStars
    buf.extend(pack_field_long(last_win_time))     # 7. lastWinTime
    buf.append(TAG_END)
    return bytes(buf)


def _build_hero_lineup_body(heroes=None, mercenary_type=0):
    """
    Build HeroLineup1 sub-message body.

    APK field order:
    1. heroes        -> List<Integer>
    2. mercenaryType -> Enum (UnitType)
    """
    if heroes is None:
        heroes = []
    buf = bytearray()
    buf.extend(pack_field_list(heroes, pack_int))   # 1. heroes
    buf.extend(pack_field_enum(mercenary_type))      # 2. mercenaryType
    buf.append(TAG_END)
    return bytes(buf)


def _build_boss_pit_data_body(current_boss=0, current_phase=1, current_difficulty=1,
                                current_difficulty_cap=1, phase_complete=False,
                                last_attack_time=0):
    """
    Build BossPitData1 sub-message body.

    APK field order:
    1. currentBoss          -> Enum (UnitType)
    2. currentPhase         -> Integer
    3. currentDifficulty    -> Integer
    4. currentDifficultyCap -> Integer
    5. currentPhaseComplete -> Boolean
    6. lastAttackTime       -> Long
    7. completedBosses      -> List<Integer>
    8. wins                 -> Map<String, Integer> V2
    """
    buf = bytearray()
    buf.extend(pack_field_enum(current_boss))             # 1. currentBoss
    buf.extend(pack_field_int(current_phase))             # 2. currentPhase
    buf.extend(pack_field_int(current_difficulty))        # 3. currentDifficulty
    buf.extend(pack_field_int(current_difficulty_cap))    # 4. currentDifficultyCap
    buf.extend(pack_field_bool(phase_complete))           # 5. currentPhaseComplete
    buf.extend(pack_field_long(last_attack_time))         # 6. lastAttackTime
    buf.extend(bytes([TAG_FIELD]) + pack_size(0))         # 7. completedBosses (empty)
    buf.extend(bytes([TAG_FIELD]) + pack_size(0))         # 8. wins (empty)
    buf.append(TAG_END)
    return bytes(buf)


def build_lineups_columnar(lineups):
    """
    Build heroLineups KEYS-FIRST map in COLUMNAR format.
    
    HeroLineup has 2 fields:
        [TAG_FIELD][lineup1_heroes_list]...[lineupN_heroes_list]
        [TAG_FIELD][lineup1_mercenaryType]...[lineupN_mercenaryType]
    """
    if not lineups:
        return bytes([TAG_FIELD]) + pack_size(0) + pack_size(0)
    
    modes = [int(k) for k in lineups.keys()]
    lineup_list = [lineups[k] for k in lineups.keys()]
    
    # Keys (HeroLineupType enums)
    keys_buf = b""
    for m in modes:
        keys_buf += pack_enum(m)
    
    # Columnar values
    vals = bytearray()
    
    # Field 1: heroes (List<Integer>)
    vals.append(TAG_FIELD)
    for hero_nums in lineup_list:
        if isinstance(hero_nums, (list, tuple)):
            vals.extend(pack_size(len(hero_nums)))
            for h in hero_nums:
                vals.extend(pack_int(h))
        else:
            vals.extend(pack_size(0))
    
    # Field 2: mercenaryType (UnitType enum)
    vals.append(TAG_FIELD)
    for _ in lineup_list:
        vals.extend(pack_enum(0))
    
    # Assemble KEYS-FIRST
    buf = bytearray()
    buf.append(TAG_FIELD)
    buf.extend(pack_size(len(modes)))
    buf.extend(keys_buf)
    buf.extend(pack_size(len(vals)))
    buf.extend(bytes(vals))
    
    return bytes(buf)


def build_heroes_columnar(heroes_data):
    """
    Build heroes KEYS-FIRST map in COLUMNAR format.
    
    Java reads: one TAG per field, then ALL heroes' values for that field.
    Format inside bounded context:
        [TAG_FIELD][hero1_type][hero2_type]...[heroN_type]
        [TAG_FIELD][hero1_rarity][hero2_rarity]...[heroN_rarity]
        [TAG_FIELD][hero1_level]...[heroN_level]
        [TAG_FIELD][hero1_eXP]...[heroN_eXP]
        [TAG_FIELD][hero1_stars]...[heroN_stars]
        [TAG_FIELD][hero1_skills]...[heroN_skills]   (each is inline KEYS-FIRST)
        [TAG_FIELD][hero1_items]...[heroN_items]     (each is inline KEYS-FIRST)
        [TAG_FIELD][hero1_heroNum]...[heroN_heroNum]
        [TAG_SKIP]  (modePersistentData absent)
        [TAG_FIELD][hero1_isMercenary]...[heroN_isMercenary]
        [TAG_FIELD][hero1_isLegendary]...[heroN_isLegendary]
        [TAG_FIELD][hero1_skin]...[heroN_skin]
        [TAG_SKIP]  (runes absent)
    """
    if not heroes_data:
        return bytes([TAG_FIELD]) + pack_size(0) + pack_size(0)
    
    hero_nums = list(heroes_data.keys())
    hero_list = [heroes_data[n] for n in hero_nums]
    
    # Pack keys (UnitType enums)
    keys_buf = b""
    for h in hero_list:
        keys_buf += pack_enum(h["hero_type"])
    
    # Build columnar values
    vals = bytearray()
    
    # Field 1: type (UnitType enum)
    vals.append(TAG_FIELD)
    for h in hero_list:
        vals.extend(pack_enum(h["hero_type"]))
    
    # Field 2: rarity (Rarity enum)
    vals.append(TAG_FIELD)
    for h in hero_list:
        vals.extend(pack_enum(h.get("rarity", 0)))
    
    # Field 3: level (Integer)
    vals.append(TAG_FIELD)
    for h in hero_list:
        vals.extend(pack_int(h.get("level", 1)))
    
    # Field 4: eXP (Integer) — send actual hero XP from DB
    vals.append(TAG_FIELD)
    for h in hero_list:
        vals.extend(pack_int(h.get("xp", 0)))
    
    # Field 5: stars (Integer)
    vals.append(TAG_FIELD)
    for h in hero_list:
        vals.extend(pack_int(h.get("stars", 1)))
    
    # Field 6: skills (Map<SkillType, Integer>) - TRIPLE COLUMNAR
    # Java reads: all counts, then all keys (per hero), then all values (per hero)
    vals.append(TAG_FIELD)
    hero_skills = []
    for h in hero_list:
        level = h.get("level", 1)
        hero_type = h.get("hero_type", 0)
        hero_rarity = h.get("rarity", Rarity.WHITE)
        skills = h.get("skills", _build_hero_skills(hero_type, level, hero_rarity))
        hero_skills.append(skills)
    # Phase 1: all counts
    for skills in hero_skills:
        vals.extend(pack_size(len(skills)))
    # Phase 2: all keys (per hero, in hero order)
    for skills in hero_skills:
        for k in skills.keys():
            vals.extend(pack_int(k))
    # Phase 3: all values (per hero, in hero order)
    for skills in hero_skills:
        for v in skills.values():
            vals.extend(pack_int(v))
    
    # Field 7: items (Map<HeroEquipSlot, EquippedItemData>) - KEYS-FIRST with bounded sub-fields
    # Structure: TAG_FIELD + counts(per hero) + keys(per hero, 0 here) + bounded_size + sub-field data
    # Items has its OWN bounded context (reader.a()/reader.b()) for EquippedItemData sub-fields.
    # With count=0: no keys, no objects, bounded_size=0.
    # Inside the 0-byte bounded context, all shouldReadNext calls return END → skip sub-fields.
    # DO NOT put TAG_FIELD bytes for sub-fields here — they would pollute the hero bounded context!
    vals.append(TAG_FIELD)
    for h in hero_list:
        vals.extend(pack_size(0))  # count=0 items per hero
    # No keys (count=0 for all heroes)
    vals.extend(pack_size(0))  # bounded_size=0 for EquippedItemData sub-fields
    
    # Field 8: heroNum (Integer)
    vals.append(TAG_FIELD)
    for i, n in enumerate(hero_nums):
        vals.extend(pack_int(n))
    
    # Field 9: modePersistentData (Map<GameMode, ModePersistentData>) - TRIPLE COLUMNAR
    # Same structure as items: KEYS-FIRST map with bounded sub-fields
    # With count=0: counts + pack_size(0) for empty bounded context
    # The reader.a() reads the bounded size, available() checks all return 0, reader.b() pops
    vals.append(TAG_FIELD)
    for h in hero_list:
        vals.extend(pack_size(0))  # count=0 per hero
    vals.extend(pack_size(0))  # bounded_size=0 for sub-field context
    
    # Field 10: isMercenary (Boolean)
    vals.append(TAG_FIELD)
    for h in hero_list:
        vals.extend(pack_bool(False))
    
    # Field 11: isLegendary (Boolean)
    vals.append(TAG_FIELD)
    for h in hero_list:
        vals.extend(pack_bool(False))
    
    # Field 12: skin (ItemType enum)
    vals.append(TAG_FIELD)
    for h in hero_list:
        vals.extend(pack_enum(0))
    
    # Field 13: runes (Map<RuneEquipSlot, RuneData>) - TRIPLE COLUMNAR
    # Same structure: KEYS-FIRST map with bounded sub-fields (RuneData has 9 sub-fields)
    # With count=0: counts + pack_size(0) for empty bounded context
    vals.append(TAG_FIELD)
    for h in hero_list:
        vals.extend(pack_size(0))  # count=0 per hero
    vals.extend(pack_size(0))  # bounded_size=0 for sub-field context
    
    # Assemble KEYS-FIRST: TAG_FIELD + count + keys + bounded_size + vals
    buf = bytearray()
    buf.append(TAG_FIELD)
    buf.extend(pack_size(len(hero_list)))
    buf.extend(keys_buf)
    buf.extend(pack_size(len(vals)))
    buf.extend(bytes(vals))
    
    return bytes(buf)


def build_user_extra(player_data, heroes_data):
    """
    Build UserExtra1 sub-message body.

    FIXED: All 97 fields in correct APK writeData order.
    """
    buf = bytearray()
    ef = bytes([TAG_FIELD]) + pack_size(0)  # empty map or list

    def _ue(label):
        logger.debug(f"    [UserExtra] {label} @ offset {len(buf)}")

    # 1. settings -> Map<String, Integer> V2 -- empty
    _ue("f01 settings (map empty)")
    buf.extend(ef)
    # 2. blockedUsers -> Map<Long, Integer> V2 -- empty
    _ue("f02 blockedUsers (map empty)")
    buf.extend(ef)
    # 3. lastLogout -> Long -- 0
    _ue("f03 lastLogout (long)")
    buf.extend(pack_field_long(0))
    # [shouldReadNext(32) version marker optional long -- absent]
    _ue("TAG_SKIP (shouldReadNext after lastLogout)")
    buf.extend(bytes([TAG_SKIP]))
    # 4. admin -> Boolean -- False
    _ue("f04 admin (bool)")
    buf.extend(pack_field_bool(False))
    # 5. language -> String -- "en"
    _ue("f05 language (string)")
    buf.extend(pack_field_string("en"))
    # 6. flags -> Map<String, Boolean> V2 -- empty
    _ue("f06 flags (map empty)")
    buf.extend(ef)
    # 7. tutorialActs -> List<TutorialAct> -- 1 entry, parallel array format
    # Java reads: aVar.a() (4B sub-message size) + unpackSize (4B count) +
    #   shouldReadNext(16)+loop for type, version, step, maxStep columns,
    #   then aVar.b() to exit bounded context.
    # Format: [TAG_FIELD][4B size][4B count][TAG_FIELD][types...][TAG_FIELD][versions...][TAG_FIELD][steps...][TAG_FIELD][maxSteps...]
    _tutorial_step = player_data.get("tutorial_step", 999)
    _tutorial_inner = (
        pack_size(1)                              # count = 1
        + bytes([TAG_FIELD]) + pack_int(0)        # type[0] = 0 (TutorialActType.DEFAULT)
        + bytes([TAG_FIELD]) + pack_int(1)        # version[0] = 1
        + bytes([TAG_FIELD]) + pack_int(_tutorial_step)   # step[0]
        + bytes([TAG_FIELD]) + pack_int(999)      # maxStep[0] = 999
    )
    _ue("f07 tutorialActs (list BOUNDED-FIRST)")
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(_tutorial_inner))
    # 8. counts -> Map<String, Integer> V2 -- empty
    _ue("f08 counts (map empty)")
    buf.extend(ef)
    # 9. appReviewStatus -> Enum -> Int -- 0
    _ue("f09 appReviewStatus (enum)")
    buf.extend(pack_field_enum(0))
    # 10. facebookName -> String -- ""
    _ue("f10 facebookName (string)")
    buf.extend(pack_field_string(""))
    # 11. googlePlusName -> String -- ""
    _ue("f11 googlePlusName (string)")
    buf.extend(pack_field_string(""))
    # 12. gameCenterName -> String -- ""
    _ue("f12 gameCenterName (string)")
    buf.extend(pack_field_string(""))
    # 13. gameCircleName -> String -- ""
    _ue("f13 gameCircleName (string)")
    buf.extend(pack_field_string(""))
    # 14. loginDays -> List<Long> -- empty
    _ue("f14 loginDays (list empty)")
    buf.extend(ef)
    # 15. country -> String -- ""
    _ue("f15 country (string)")
    buf.extend(pack_field_string(""))
    # 16. heroes -> Map<UnitType(enum/int), HeroData(sub-msg)> V2
    # COLUMNAR FORMAT: Java reads one TAG per field, then ALL heroes' values
    _ue("f16 heroes (COLUMNAR map<enum,HeroData>)")
    buf.extend(build_heroes_columnar(heroes_data))
    # 17. items -> Map<ItemType(enum/int), Integer> V2 SIMPLE (no aVar.a() after key loop)
    _ue("f17 items (map<enum,int> V2 SIMPLE)")
    items = player_data.get("items", {})
    if items:
        buf.extend(pack_field_map(items, pack_enum, pack_int))
    else:
        buf.extend(ef)
    # 18. heroLineups -> Map<HeroLineupType(enum/int), HeroLineup(sub-msg)> KEYS-FIRST
    # COLUMNAR FORMAT: one TAG per field, then ALL lineups' values
    _ue("f18 heroLineups (COLUMNAR map<enum,HeroLineup>)")
    # HeroLineupType: 1=NORMAL_CAMPAIGN, 2=ELITE_CAMPAIGN, 3=FIGHT_PIT_DEFENSE, etc.
    lineups = player_data.get("lineups", {1: [0, 1, 2, 3, 4]})
    buf.extend(build_lineups_columnar(lineups))
    # 19. resources -> Map<ResourceType(enum/int), Integer> V2
    # ResourceType: DEFAULT=0, DIAMONDS=1, GOLD=2, STAMINA=3, TEAM_XP=4, FIGHT_TOKENS=10
    # ResourceType enum (from APK):
    #   0=DEFAULT, 1=DIAMONDS, 2=GOLD, 3=STAMINA, 4=TEAM_XP,
    #   5=POWER_POINTS, 6=VIP_TICKETS, 7=SILVER_CHEST, 8=GOLD_CHEST,
    #   9=SOUL_CHEST, 10=FIGHT_TOKENS, 11=FREE_DIAMONDS
    _ue("f19 resources (map<enum,int> V2)")
    resources = {
        2:  player_data.get("gold", 0),         # GOLD = 2
        1:  player_data.get("diamonds", 0),      # DIAMONDS = 1
        3:  player_data.get("stamina", 60),      # STAMINA = 3
        4:  player_data.get("xp", 0),            # TEAM_XP = 4
        10: player_data.get("raid_tickets", 5),  # FIGHT_TOKENS = 10
    }
    buf.extend(pack_field_map(resources, pack_enum, pack_int))
    # 20. lastResourceGenerationTimes -> Map<ResourceType(enum/int), Long> V2 -- empty
    _ue("f20 lastResourceGenerationTimes (map empty)")
    buf.extend(ef)
    # [shouldReadNext(32) version marker optional long -- absent]
    _ue("TAG_SKIP (shouldReadNext after f20)")
    buf.extend(bytes([TAG_SKIP]))
    # 21. iAPProductPurchases -> Map<String, Integer> V2 -- empty
    _ue("f21 iAPProductPurchases (map empty)")
    buf.extend(ef)
    # 22. dailyUses -> Map<String, Integer> V2 -- empty
    _ue("f22 dailyUses (map empty)")
    buf.extend(ef)
    # 23. dailyChances -> Map<String, Integer> V2 -- empty
    _ue("f23 dailyChances (map empty)")
    buf.extend(ef)
    # [shouldReadNext(32) version marker optional long -- absent]
    _ue("TAG_SKIP (shouldReadNext after f23)")
    buf.extend(bytes([TAG_SKIP]))
    # 24. cooldowns -> Map<CooldownType(enum/int), Long> V2 -- empty
    _ue("f24 cooldowns (map empty)")
    buf.extend(ef)
    # 25. merchantData -> Map<MerchantType(enum/int), MerchantData(sub-msg)> V2 -- empty
    # innerReadFieldMerchantData uses KEYS-FIRST + aVar.a() for values bounded context.
    # Empty format: [TAG_FIELD][count=0][bounded-size=0]
    _ue("f25 merchantData (KEYS-FIRST map, count=0 + bounded-size=0)")
    buf.extend(bytes([TAG_FIELD]) + pack_size(0) + pack_size(0))
    # [shouldReadNext(32) version marker optional long -- absent]
    _ue("TAG_SKIP (shouldReadNext after f25)")
    buf.extend(bytes([TAG_SKIP]))
    # 26. oldLootMemory -> Map<ItemType(enum/int), Integer> V2 -- empty
    _ue("f26 oldLootMemory (map empty)")
    buf.extend(ef)
    # 27. levelStatuses -> List<CampaignLevelStatus(sub-msg)>
    # Uses BOUNDED-FIRST columnar format (same pattern as tutorialActs f07):
    #   [TAG_FIELD][4B bounded_size][count][TAG_FIELD][chapters...][TAG_FIELD][levels...]
    #   [TAG_FIELD][stars...][TAG_FIELD][campaignTypes...][TAG_FIELD][totalWins...]
    #   [TAG_FIELD][winsAtCurrent...][TAG_FIELD][lastWinTimes...]
    _ue("f27 levelStatuses (BOUNDED-FIRST list)")
    campaign_progress = player_data.get("campaign_progress", [])
    ls_entries = []  # list of (chapter, level, stars, campaignType, totalWins, winsAtCurrent, lastWinTime)
    if isinstance(campaign_progress, dict):
        for key, status in campaign_progress.items():
            # Keys are encoded as chapter*100+level (supports >10 levels per chapter)
            # JSON keys are always strings, so convert to int first
            int_key = int(key)
            ch = int_key // 100
            lv = int_key % 100
            st = status.get("stars", 3) if isinstance(status, dict) else 3
            ct = status.get("campaign_type", 0) if isinstance(status, dict) else 0
            tw = status.get("total_wins", 1) if isinstance(status, dict) else 1
            wc = status.get("wins_at_current", 1) if isinstance(status, dict) else 1
            lwt = status.get("last_win_time", 0) if isinstance(status, dict) else 0
            ls_entries.append((ch, lv, st, ct, tw, wc, lwt))
    elif isinstance(campaign_progress, list):
        for entry in campaign_progress:
            ls_entries.append((
                entry.get("chapter", 1), entry.get("level", 1),
                entry.get("stars", 3), entry.get("campaign_type", 0),
                entry.get("total_wins", 1), entry.get("wins_at_current", 1),
                entry.get("last_win_time", 0),
            ))
    if ls_entries:
        ls_inner = bytearray()
        ls_inner.extend(pack_size(len(ls_entries)))
        # Column 1: chapter (int)
        ls_inner.append(TAG_FIELD)
        for e in ls_entries: ls_inner.extend(pack_int(e[0]))
        # Column 2: level (int)
        ls_inner.append(TAG_FIELD)
        for e in ls_entries: ls_inner.extend(pack_int(e[1]))
        # Column 3: stars (int)
        ls_inner.append(TAG_FIELD)
        for e in ls_entries: ls_inner.extend(pack_int(e[2]))
        # Column 4: campaignType (enum)
        ls_inner.append(TAG_FIELD)
        for e in ls_entries: ls_inner.extend(pack_enum(e[3]))
        # Column 5: totalWins (int)
        ls_inner.append(TAG_FIELD)
        for e in ls_entries: ls_inner.extend(pack_int(e[4]))
        # Column 6: winsAtCurrentStars (int)
        ls_inner.append(TAG_FIELD)
        for e in ls_entries: ls_inner.extend(pack_int(e[5]))
        # Column 7: lastWinTime (long)
        ls_inner.append(TAG_FIELD)
        for e in ls_entries: ls_inner.extend(pack_long(e[6]))
        buf.extend(bytes([TAG_FIELD]) + pack_submsg(bytes(ls_inner)))
    else:
        # innerReadFieldLevelStatuses uses BOUNDED-FIRST: aVar.a() then unpackSize(count).
        # Empty format: [TAG_FIELD][bounded-size=4][count=0]
        buf.extend(bytes([TAG_FIELD]) + pack_submsg(pack_size(0)))
    # 28. oldAvatar -> Enum -> Int -- 1
    _ue("f28 oldAvatar (enum)")
    buf.extend(pack_field_enum(1))
    # 29. monthlySignins -> Integer -- 0
    _ue("f29 monthlySignins (int)")
    buf.extend(pack_field_int(0))
    # [shouldReadNext(32) version marker optional long -- absent]
    _ue("TAG_SKIP (shouldReadNext after f29)")
    buf.extend(bytes([TAG_SKIP]))
    # 30. globalMailMessageData -> Map<Long, sub-msg> V2 -- empty
    # innerReadFieldGlobalMailMessageData uses KEYS-FIRST + aVar.a() for values.
    # Empty format: [TAG_FIELD][count=0][bounded-size=0]
    _ue("f30 globalMailMessageData (KEYS-FIRST map, count=0 + bounded-size=0)")
    buf.extend(bytes([TAG_FIELD]) + pack_size(0) + pack_size(0))
    # [shouldReadNext(32) version marker optional long -- absent]
    _ue("TAG_SKIP (shouldReadNext after f30)")
    buf.extend(bytes([TAG_SKIP]))
    # 31. completedQuests -> Map<Integer, Integer> V2 -- empty
    _ue("f31 completedQuests (map empty)")
    buf.extend(ef)
    # 32. questCompletionTimes -> Map<Integer, Long> V2 -- empty
    _ue("f32 questCompletionTimes (map empty)")
    buf.extend(ef)
    # 33. unclaimedArenaPromotionTier -> Enum -> Int -- 0
    _ue("f33 unclaimedArenaPromotionTier (enum)")
    buf.extend(pack_field_enum(0))
    # 34. unclaimedArenaPromotionDivision -> Integer -- 0
    _ue("f34 unclaimedArenaPromotionDivision (int)")
    buf.extend(pack_field_int(0))
    # 35. claimedArenaRewards -> Map<String, Integer> V2 -- empty
    _ue("f35 claimedArenaRewards (map empty)")
    buf.extend(ef)
    # 36. unclaimedArenaDemotionTier -> Enum -> Int -- 0
    _ue("f36 unclaimedArenaDemotionTier (enum)")
    buf.extend(pack_field_enum(0))
    # 37. unclaimedArenaDemotionDivision -> Integer -- 0
    _ue("f37 unclaimedArenaDemotionDivision (int)")
    buf.extend(pack_field_int(0))
    # 38. heroStoneCounts -> Map<UnitType(enum/int), Integer> V2 -- empty
    _ue("f38 heroStoneCounts (map empty)")
    buf.extend(ef)
    # 39. times -> Map<TimeType(enum/int), Long> V2 -- empty
    _ue("f39 times (map empty)")
    buf.extend(ef)
    # 40. timeZoneOffset -> Integer -- 0
    _ue("f40 timeZoneOffset (int)")
    buf.extend(pack_field_int(0))
    # 41. userEventsRecorded -> List<Long> -- empty
    _ue("f41 userEventsRecorded (list empty)")
    buf.extend(ef)
    # 42. aBGroups -> Map<String, Integer> V2 -- empty
    _ue("f42 aBGroups (map empty)")
    buf.extend(ef)
    # 43. previousSigninStatus -> Map<Integer, enum/int> V2 -- empty
    _ue("f43 previousSigninStatus (map empty)")
    buf.extend(ef)
    # 44. viewedDailyQuests -> List<Integer> -- empty
    _ue("f44 viewedDailyQuests (list empty)")
    buf.extend(ef)
    # [shouldReadNext(32) version marker optional complex section -- absent]
    _ue("TAG_SKIP (shouldReadNext after f44)")
    buf.extend(bytes([TAG_SKIP]))
    # 45. oldExpeditionData -> sub-message -> SKIP
    _ue("f45 oldExpeditionData (pack_skip)")
    buf.extend(pack_skip())
    # 46. guildJoinTime -> Long -- 0
    _ue("f46 guildJoinTime (long)")
    buf.extend(pack_field_long(0))
    # 47. hiredHeroes -> Map<GameMode(enum/int), sub-msg> V2 -- empty
    # innerReadFieldUserExtra reads: unpackSize(count) → key loop → aVar.a() for values.
    # KEYS-FIRST empty format: [TAG_FIELD][count=0][bounded-size=0]
    _ue("f47 hiredHeroes (KEYS-FIRST map, count=0 + bounded-size=0)")
    buf.extend(bytes([TAG_FIELD]) + pack_size(0) + pack_size(0))
    # 48. mercenariesPostedAtGuildID -> Long -- 0
    _ue("f48 mercenariesPostedAtGuildID (long)")
    buf.extend(pack_field_long(0))
    # 49. modeAutoUnlocks -> List<String> -- empty
    _ue("f49 modeAutoUnlocks (list empty)")
    buf.extend(ef)
    # 50. oldExpeditionID -> Integer -- 0
    _ue("f50 oldExpeditionID (int)")
    buf.extend(pack_field_int(0))
    # 51. thirdPartyQuestStatuses -> Map<Integer, Integer> V2 -- empty
    _ue("f51 thirdPartyQuestStatuses (map empty)")
    buf.extend(ef)
    # 52. likedHeroWallPosts -> List<Long> -- empty
    _ue("f52 likedHeroWallPosts (list empty)")
    buf.extend(ef)
    # 53. lootMemory -> Map<ItemType(enum/int), Float> V2 -- empty
    _ue("f53 lootMemory (map empty)")
    buf.extend(ef)
    # 54. unclaimedColiseumPromotionTier -> Enum -> Int -- 0
    _ue("f54 unclaimedColiseumPromotionTier (enum)")
    buf.extend(pack_field_enum(0))
    # 55. unclaimedColiseumPromotionDivision -> Integer -- 0
    _ue("f55 unclaimedColiseumPromotionDivision (int)")
    buf.extend(pack_field_int(0))
    # 56. claimedColiseumRewards -> Map<String, Integer> V2 -- empty
    _ue("f56 claimedColiseumRewards (map empty)")
    buf.extend(ef)
    # 57. unclaimedColiseumDemotionTier -> Enum -> Int -- 0
    _ue("f57 unclaimedColiseumDemotionTier (enum)")
    buf.extend(pack_field_enum(0))
    # 58. unclaimedColiseumDemotionDivision -> Integer -- 0
    _ue("f58 unclaimedColiseumDemotionDivision (int)")
    buf.extend(pack_field_int(0))
    # 59. howToPlayFlags -> Map<enum/int, Boolean> V2 -- empty
    _ue("f59 howToPlayFlags (map empty)")
    buf.extend(ef)
    # 60. moderator -> Boolean -- False
    _ue("f60 moderator (bool)")
    buf.extend(pack_field_bool(False))
    # 61. expLootPool -> Integer -- 0
    _ue("f61 expLootPool (int)")
    buf.extend(pack_field_int(0))
    # 62. currentTitanTemple -> Long -- 0
    _ue("f62 currentTitanTemple (long)")
    buf.extend(pack_field_long(0))
    # 63. guildTitanTemples -> List<Long> -- empty
    _ue("f63 guildTitanTemples (list empty)")
    buf.extend(ef)
    # 64. snapshotEvents -> List<Long> -- empty
    _ue("f64 snapshotEvents (list empty)")
    buf.extend(ef)
    # 65. bossPitData -> sub-message -> BossPitData
    _ue("f65 bossPitData (sub-msg)")
    boss_pit_body = _build_boss_pit_data_body()
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(boss_pit_body))
    # 66. promoCodes -> List<String> -- empty
    _ue("f66 promoCodes (list empty)")
    buf.extend(ef)
    # 67. completedEvents -> Map<Long, Integer> V2 -- empty
    _ue("f67 completedEvents (map empty)")
    buf.extend(ef)
    # 68. storedSeeds -> Map<enum/int, Long> V2 -- empty
    _ue("f68 storedSeeds (map empty)")
    buf.extend(ef)
    # 69. teamLevelEventStarts -> Map<Long, Integer> V2 -- empty
    _ue("f69 teamLevelEventStarts (map empty)")
    buf.extend(ef)
    # 70. combatAutoSettings -> Map<enum/int, Integer> V2 -- empty
    _ue("f70 combatAutoSettings (map empty)")
    buf.extend(ef)
    # 71. questCounters -> Map<String, Integer> V2 -- empty
    _ue("f71 questCounters (map empty)")
    buf.extend(ef)
    # 72. lastViewedWarBattle -> Long -- 0
    _ue("f72 lastViewedWarBattle (long)")
    buf.extend(pack_field_long(0))
    # 73. expeditionID -> Long -- 0
    _ue("f73 expeditionID (long)")
    buf.extend(pack_field_long(0))
    # 74. runes -> List<RuneData(sub-msg)> -- empty
    # innerReadFieldUserExtra reads: aVar.a() FIRST (bounded context), then unpackSize(count).
    # BOUNDED-FIRST empty format: [TAG_FIELD][bounded-size=4][count=0]
    _ue("f74 runes (BOUNDED-FIRST list, bounded-size=4 + count=0)")
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(pack_size(0)))
    # 75. nextRuneID -> Long -- 1
    _ue("f75 nextRuneID (long)")
    buf.extend(pack_field_long(1))
    # 76. runeEmpowerMemory -> Map<String, Float> V2 -- empty
    # Java reads as simple V2 map: unpackSize(count) + pairs, NOT keys-first
    _ue("f76 runeEmpowerMemory (V2 map, count=0)")
    buf.extend(bytes([TAG_FIELD]) + pack_size(0))
    # 77. avatar -> sub-message -> Avatar (unit=1, skin=0)
    _ue("f77 avatar (sub-msg)")
    avatar_body = bytearray()
    avatar_body.extend(pack_field_enum(1))   # unit (UnitType)
    avatar_body.extend(pack_field_enum(0))   # skin (ItemType)
    avatar_body.append(TAG_END)
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(bytes(avatar_body)))
    # 78. timeZone -> String -- ""
    _ue("f78 timeZone (string)")
    buf.extend(pack_field_string(""))
    # 79. consumableItemsViewed -> List<enum/int> -- empty
    _ue("f79 consumableItemsViewed (list empty)")
    buf.extend(ef)
    # 80. optedOutOfWarBy -> String -- ""
    _ue("f80 optedOutOfWarBy (string)")
    buf.extend(pack_field_string(""))
    # [shouldReadNext(32) version marker optional string -- absent]
    _ue("TAG_SKIP (shouldReadNext after f80)")
    buf.extend(bytes([TAG_SKIP]))
    # 81. previousName -> String -- ""
    _ue("f81 previousName (string)")
    buf.extend(pack_field_string(""))
    # 82. newSkins -> Map<enum/int, Integer> V2 -- empty
    _ue("f82 newSkins (map empty)")
    buf.extend(ef)
    # 83. lastVIPItem -> Enum -> Int -- 0
    _ue("f83 lastVIPItem (enum)")
    buf.extend(pack_field_enum(0))
    # 84. bossPitStars -> Map<String, Integer> V2 -- empty
    _ue("f84 bossPitStars (map empty)")
    buf.extend(ef)
    # 85. activeDropMultipliers -> Map<Integer, Integer> V2 -- empty
    _ue("f85 activeDropMultipliers (map empty)")
    buf.extend(ef)
    # 86. suspensionReason -> String -- ""
    _ue("f86 suspensionReason (string)")
    buf.extend(pack_field_string(""))
    # 87. suspensionOffenceCount -> Integer -- 0
    _ue("f87 suspensionOffenceCount (int)")
    buf.extend(pack_field_int(0))
    # 88. gameModeProgressionTracker -> Map<String, Integer> V2 -- empty
    _ue("f88 gameModeProgressionTracker (map empty)")
    buf.extend(ef)
    # 89. joinedWarID -> Long -- 0
    _ue("f89 joinedWarID (long)")
    buf.extend(pack_field_long(0))
    # 90. customBanMessage -> String -- ""
    _ue("f90 customBanMessage (string)")
    buf.extend(pack_field_string(""))
    # 91. battleOptOutsPerGuild -> Map<Long, Integer> V2 -- empty
    _ue("f91 battleOptOutsPerGuild (map empty)")
    buf.extend(ef)
    # 92. battlesMissed -> List<Long> -- empty
    _ue("f92 battlesMissed (list empty)")
    buf.extend(ef)
    # 93. activeUseItemEventMultipliers -> Map<enum/int, Long> V2 -- empty
    _ue("f93 activeUseItemEventMultipliers (map empty)")
    buf.extend(ef)
    # 94. eventSigninBonusLastSigninTime -> Map<Long, Long> V2 -- empty
    _ue("f94 eventSigninBonusLastSigninTime (map empty)")
    buf.extend(ef)
    # 95. eventSigninBonusMonthlySignins -> Map<Long, Integer> V2 -- empty
    _ue("f95 eventSigninBonusMonthlySignins (map empty)")
    buf.extend(ef)
    # 96. previousEventSigninStatus -> Map<Long, String> V2 -- empty
    _ue("f96 previousEventSigninStatus (map empty)")
    buf.extend(ef)
    # 97. personalMessageHideTime -> Map<Long, Long> V2 -- empty
    _ue("f97 personalMessageHideTime (map empty)")
    buf.extend(ef)

    _ue("TAG_END")
    buf.append(TAG_END)
    logger.info(f"    [UserExtra] total body size = {len(buf)} bytes")
    return bytes(buf)


# ─── BootData1 Builders (FIXED) ─────────────────────────────────────────────

def build_boot_data_minimal(msg_number, response_to=0):
    """
    Build a minimal BootData1 with just the header and version byte.
    No field data — client will use defaults for everything.
    For testing connectivity only.
    """
    return build_message("BootData1", msg_number, fields_data=b"", response_to=response_to)


def build_boot_data(player_data, heroes_data, msg_number, response_to=0,
                     stat_versions=None, is_first_boot=True):
    """
    Build a complete BootData1 response message.
    This is sent as the response to ClientInfo1.

    FIXED: Correct field order matching APK writeData declaration order.
    FIXED: Sub-message framing with [0x10][4B size][body].
    FIXED: statData now echoes client statVersions so client skips downloading.

    Field order in BootData1 (V2 format):
    1. serverTime (long)
    2. userInfo (sub-message frame)
    3. privateUserInfo (sub-message frame)
    4. userExtra (sub-message frame)
    5. updateAvailable (bool)
    6. loginEvent (string)
    7. statData — map<string,string> V2
    8. iAPProducts (sub-message frame)
    9. [0x20] VIPPromoCard section absent
    10. possibleChestDrops (sub-message frame)
    11. mailMessages (sub-message frame, body = 4B count)
    12. specialEvents (sub-message frame)
    13. guildInfo (sub-message frame)
    14. tapJoyPPEEvents — map<int,string> V2
    15. currentServer (sub-message frame)
    16. [0x20] config data section absent
    17. titanTemples (sub-message frame)
    18. warRedDotInfo (sub-message frame)
    19. allContests (sub-message frame)
    20. firstBoot (bool)
    """
    buf = bytearray()
    server_time = int(time.time() * 1000)

    def _snap(label):
        logger.debug(f"  [BootData1] {label} @ offset {len(buf)}")

    # ── 1. serverTime (long) ──
    _snap("f01 serverTime (long)")
    buf.extend(pack_field_long(server_time))

    # ── 2. userInfo (sub-message frame) ──
    _snap("f02 userInfo (sub-msg)")
    user_info_body = build_user_info_body(
        user_id=player_data.get("user_id", 1),
        name=player_data.get("name", "Hero"),
        level=player_data.get("team_level", 1),
        diamonds=player_data.get("diamonds", 500),
        shard_id=0,
    )
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(user_info_body))

    # ── 3. privateUserInfo (sub-message frame) ──
    _snap("f03 privateUserInfo (sub-msg)")
    private_body = build_private_user_info_body()
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(private_body))

    # ── 4. userExtra (sub-message frame) ──
    _snap("f04 userExtra (sub-msg) — building...")
    user_extra_body = build_user_extra(player_data, heroes_data)
    logger.info(f"  [BootData1]   userExtra body size = {len(user_extra_body)} bytes")
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(user_extra_body))
    _snap("f04 userExtra END")

    # ── 5. updateAvailable (bool) ──
    _snap("f05 updateAvailable (bool)")
    buf.extend(pack_field_bool(False))

    # ── 6. loginEvent (string) ──
    _snap("f06 loginEvent (string)")
    buf.extend(pack_field_string(""))

    # ── 7. statData — map<string,string> V2 format ──
    # GeneralStats.updateStats(map) treats non-null values as RAW FILE CONTENT
    # to parse — NOT as version strings. Sending hash strings causes a parse
    # error and RuntimeException → client crash-disconnects silently.
    # An empty map (count=0) means "no files need updating"; the client keeps
    # all its locally-stored .tab files intact.
    #
    # FIX: Include content.{shard}.tab so the client loads ContentStats.
    # Without this, ContentHelper.getStats().getNumChaptersAvailable() returns -1
    # (DEFAULT maxChapter) → campaign shows "Chapitre -1".
    # The content tab data is keyed by date columns; getCurrentColumn(serverTime)
    # returns the first column with startTime <= now. Since latest entry is
    # 01/10/2019, any time after that (including 2026) correctly returns maxChapter=28.
    _snap("f07 statData (map<str,str> V2)")
    stat_data_map = {}
    content_tab_path = os.path.join(os.path.dirname(__file__), "content.1.tab")
    try:
        with open(content_tab_path, "r", encoding="utf-8") as f:
            stat_data_map["content.1.tab"] = f.read()
        logger.info(f"  [BootData1] Loaded content.1.tab ({len(stat_data_map['content.1.tab'])} chars)")
    except FileNotFoundError:
        logger.warning(f"  [BootData1] content.1.tab NOT FOUND at {content_tab_path} — campaign will show 'Chapitre -1'!")
    buf.extend(pack_field_map(stat_data_map, pack_string, pack_string))

    # ── 8. iAPProducts (sub-message frame, empty) ──
    _snap("f08 iAPProducts (sub-msg empty)")
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(b""))

    # ── 9. VIPPromoCard section (empty) ──
    # shouldReadNext(32): TAG_SKIP = section absent, Java does NOT read size.
    # Previously had pack_size(0) here which left 4 dangling bytes in stream.
    _snap("f09 VIPPromoCard (TAG_SKIP only)")
    buf.extend(bytes([TAG_SKIP]))

    # ── 10. possibleChestDrops (sub-message frame, empty) ──
    _snap("f10 possibleChestDrops (sub-msg empty)")
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(b""))

    # ── 11. mailMessages (sub-message frame, body = 4B count=0) ──
    # Client reads a count inside the sub-message body, so body MUST contain count
    _snap("f11 mailMessages (sub-msg count=0)")
    mail_body = pack_size(0)  # count = 0 mails
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(mail_body))

    # ── 12. specialEvents (sub-message frame, empty) ──
    _snap("f12 specialEvents (sub-msg empty)")
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(b""))

    # ── 13. guildInfo (sub-message frame, empty) ──
    _snap("f13 guildInfo (sub-msg empty)")
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(b""))

    # ── 14. tapJoyPPEEvents — map<int,string> V2 format, 0 entries ──
    _snap("f14 tapJoyPPEEvents (map<int,str> V2, count=0)")
    buf.extend(bytes([TAG_FIELD]))
    buf.extend(pack_size(0))  # count = 0

    # ── 15. currentServer (sub-message frame) ──
    # shard_id=1: ShardStats.a(1, statDataMap) → looks for "content.1.tab" in map.
    # Since we now include content.1.tab in statData (field 7), it will be found
    # in the map → parseStats(string, content) → NO disk read → safe!
    # Previously shard_id=0 was used to skip loading, but this left ContentStats
    # with empty columns → maxChapter=-1 → "Chapitre -1" bug.
    _snap("f15 currentServer (sub-msg)")
    server_body = build_server_info_body(shard_id=1, max_level=130, chapters=15)
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(server_body))

    # ── 16. configData section (empty) ──
    # shouldReadNext(32): TAG_SKIP = section absent, Java does NOT read size.
    # Previously had pack_size(0) here which left 4 dangling bytes in stream.
    _snap("f16 configData (TAG_SKIP only)")
    buf.extend(bytes([TAG_SKIP]))

    # ── 17. titanTemples (sub-message frame, empty) ──
    _snap("f17 titanTemples (sub-msg empty)")
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(b""))

    # ── 18. warRedDotInfo (sub-message frame, empty) ──
    _snap("f18 warRedDotInfo (sub-msg empty)")
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(b""))

    # ── 19. allContests (sub-message frame, empty) ──
    _snap("f19 allContests (sub-msg empty)")
    buf.extend(bytes([TAG_FIELD]) + pack_submsg(b""))

    # ── 20. firstBoot (bool) ──
    _snap("f20 firstBoot (bool)")
    buf.extend(pack_field_bool(is_first_boot))

    # NOTE: No TAG_END here. The outer BootData1 message is bounded by the
    # decompressed frame size, not by TAG_END. Adding TAG_END at the outer
    # level causes the client to skip DownloadTime1 and close TCP immediately
    # after downloading index.txt (confirmed regression in session 12:19:50).

    logger.info(f"  [BootData1] total fields_data size = {len(buf)} bytes")
    return build_message("BootData1", msg_number, fields_data=bytes(buf), response_to=response_to)
