import java.lang.reflect.*;
import java.util.*;

import com.perblue.rpg.network.messages.BootData;
import com.perblue.rpg.network.messages.Server;
import com.perblue.rpg.network.messages.UserInfo;
import com.perblue.rpg.network.messages.UserExtra;
import com.perblue.rpg.network.messages.BasicUserInfo;
import com.perblue.rpg.network.messages.PrivateUserInfo;
import com.perblue.rpg.network.messages.ResourceType;
import com.perblue.rpg.network.messages.HeroData;
import com.perblue.rpg.network.messages.HeroLineup;
import com.perblue.rpg.network.messages.HeroLineupType;
import com.perblue.rpg.network.messages.UnitType;
import com.perblue.rpg.network.messages.Rarity;
import com.perblue.rpg.network.messages.TutorialAct;
import com.perblue.rpg.network.messages.TutorialActType;
import com.perblue.rpg.game.tutorial.TutorialHelper;
import com.perblue.rpg.game.data.misc.TeamLevelStats;

/**
 * Builds a complete, coherent NEW-PLAYER state and attaches it to a BootData, using
 * the GAME'S OWN message classes and enums (real values, no hand-typed strings, so
 * no hallucination). The client's ClientNetworkStateConverter.getUser(userInfo,
 * userExtra) turns this into its central User object which drives the HUD/screens.
 *
 * Every Map/List field of UserExtra is initialised to an empty (non-null) collection
 * via reflection, so no code path hits a null collection; the meaningful fields
 * (identity, resources, team level…) are then set explicitly.
 */
final class DsUserState {

    static final long USER_ID = 1L;
    static final String USER_NAME = "Player";
    // Which content shard the client loads: it reads content.<SHARD>.tab (per-shard
    // content timeline). All content.N.tab share the same newest column (01/10/2019),
    // so any existing shard yields the final live content. Keep it consistent with
    // UserInfo.shardID so the client's shard view is coherent.
    static final int SHARD = 1;

    /** Boot fields that must be set on EVERY BootData (new or loaded player): which
     *  content shard to load, and the inline stat-data map (empty = load .tab from
     *  classpath). See the long note below on why the client also force-syncs the shard. */
    static void attachBootFields(BootData boot) throws Exception {
        Server srv = new Server();
        srv.shardID = SHARD;
        boot.currentServer = srv;
        boot.statData = new HashMap<>();
    }

    /** Build a brand-new player's full state (UserInfo + UserExtra). */
    static DsStore.State newPlayer(long serverTime) throws Exception {
        UserInfo ui = new UserInfo();
        BasicUserInfo basic = new BasicUserInfo();
        basic.iD = USER_ID;
        basic.name = USER_NAME;
        // Canonical start = team level 1. DEV override -Dds.teamLevel=N boosts it to unlock
        // features gated behind higher levels (Unlockables table) for testing screens
        // headlessly — dev CONFIG, not invented game data (the game recomputes stamina /
        // max-hero-level from teamlevelstats.tab for this level).
        int teamLevel = Math.max(1, Integer.getInteger("ds.teamLevel", 1));
        basic.teamLevel = teamLevel;
        basic.vIPLevel = 0;
        basic.creationTime = serverTime;
        basic.userLastActive = serverTime;
        ui.basicInfo = basic;
        ui.diamonds = 0;
        ui.shardID = 1;
        ui.teamPower = 0;
        ui.teamPowerRank = 0;
        ui.totalPower = 0;
        ui.totalPowerRank = 0;
        ui.totalStars = 0;
        ui.totalStarsRank = 0;
        ui.vIPLevel = 0;
        ui.creationTime = serverTime;
        ui.lastLoginTime = serverTime;
        ui.shardID = 1;

        UserExtra ux = new UserExtra();
        initAllCollections(ux);
        ux.timeZone = "Etc/UTC";
        ux.timeZoneOffset = 0;
        ux.language = "en";
        ux.country = "";
        ux.admin = Boolean.FALSE;
        ux.moderator = Boolean.FALSE;

        // Starting resources — sourced from the GAME'S OWN data (no invented values,
        // see STARTING_STATE.md). A brand-new account starts with 0 gold / 0 diamonds;
        // stamina is the team-level-1 cap read from teamlevelstats.tab via the game's
        // own TeamLevelStats accessor (the server links the game jar + apk-resources, so
        // it reuses the exact table the client reads — the basis for the authoritative
        // server's anti-cheat: same tables => any client claim that disagrees is a cheat).
        @SuppressWarnings("unchecked")
        Map<ResourceType, Integer> res = (Map<ResourceType, Integer>) getField(ux, "resources");
        res.put(ResourceType.GOLD, 0);
        res.put(ResourceType.DIAMONDS, 0);
        res.put(ResourceType.FREE_DIAMONDS, 0);
        res.put(ResourceType.STAMINA, TeamLevelStats.getMaxStamina(teamLevel));
        res.put(ResourceType.TEAM_XP, 0);
        res.put(ResourceType.POWER_POINTS, 0);

        // Canonical STARTING ROSTER — mirror of the original server's account creation.
        // Reversed from the bytecode + confirmed by the game's first-30-min flow
        // (STARTING_STATE.md): a new account already owns DRAGON_LADY + UNSTABLE_UNDERSTUDY
        // BEFORE the tutorial grants the Centaur (via the chest) and before Electroyeti is
        // unlocked through chapter 1. These are NOT granted client-side (the intro combat
        // only builds scripted CombatSimHelper units), so the server must provide them.
        // Level 1 / WHITE / 1 star is the base; the game computes every derived stat from
        // its own tables at runtime — we invent nothing.
        UnitType[] starters = { UnitType.DRAGON_LADY, UnitType.UNSTABLE_UNDERSTUDY };
        @SuppressWarnings("unchecked")
        Map<UnitType, HeroData> heroes = (Map<UnitType, HeroData>) getField(ux, "heroes");
        int heroNum = 1;
        for (UnitType t : starters) heroes.put(t, hero(t, heroNum++));
        @SuppressWarnings("unchecked")
        Map<HeroLineupType, HeroLineup> lineups =
            (Map<HeroLineupType, HeroLineup>) getField(ux, "heroLineups");
        HeroLineup campaign = new HeroLineup();
        campaign.heroes = new ArrayList<>(Arrays.asList(starters));
        lineups.put(HeroLineupType.NORMAL_CAMPAIGN, campaign);

        // INTRO tutorial IN PROGRESS. An ABSENT tutorial act reads as "completed"
        // (TutorialHelper.completedTutorialAct returns true when getTutorialAct==null),
        // so we seed the INTRO act present-and-unfinished for the tutorial to run.
        // Default step 0 = the real start (intro combat). ds.tutStep is a DEV shortcut to
        // jump to a later step (e.g. 41 = open chest screen) to iterate without replaying
        // the intro — kept honest now that the starting roster is granted at creation, so
        // skipping steps no longer loses heroes (STARTING_STATE.md §2/§4).
        @SuppressWarnings("unchecked")
        List<TutorialAct> acts = (List<TutorialAct>) getField(ux, "tutorialActs");
        TutorialAct intro = new TutorialAct();
        intro.type = TutorialActType.INTRO;
        intro.step = Integer.getInteger("ds.tutStep", 0);
        intro.version = TutorialHelper.getMaxVersion(TutorialActType.INTRO);
        acts.add(intro);

        return new DsStore.State(ui, ux);
    }

    /** A level-1, 1-star, common hero with all its sub-collections initialised. */
    private static HeroData hero(UnitType type, int heroNum) throws Exception {
        HeroData h = new HeroData();
        initAllCollections(h); // items, runes, skills, modePersistentData -> empty
        h.type = type;
        h.level = 1;
        h.stars = 1;
        h.rarity = Rarity.WHITE;
        h.eXP = 0;
        h.heroNum = heroNum;
        h.isLegendary = Boolean.FALSE;
        h.isMercenary = Boolean.FALSE;
        return h;
    }

    /** Set every Map field to a new HashMap and every List field to a new ArrayList. */
    private static void initAllCollections(Object msg) throws Exception {
        for (Field f : msg.getClass().getFields()) {
            if (Modifier.isStatic(f.getModifiers())) continue;
            Class<?> t = f.getType();
            if (Map.class.isAssignableFrom(t)) f.set(msg, new HashMap<>());
            else if (List.class.isAssignableFrom(t)) f.set(msg, new ArrayList<>());
        }
    }

    private static Object getField(Object o, String name) throws Exception {
        return o.getClass().getField(name).get(o);
    }
}
