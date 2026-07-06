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
        basic.teamLevel = 1;
        basic.vIPLevel = 0;
        basic.creationTime = serverTime;
        basic.userLastActive = serverTime;
        ui.basicInfo = basic;
        ui.diamonds = 500;
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

        // Starting resources (real ResourceType enum constants).
        @SuppressWarnings("unchecked")
        Map<ResourceType, Integer> res = (Map<ResourceType, Integer>) getField(ux, "resources");
        res.put(ResourceType.GOLD, 100000);
        res.put(ResourceType.DIAMONDS, 500);
        res.put(ResourceType.FREE_DIAMONDS, 500);
        res.put(ResourceType.STAMINA, 120);
        res.put(ResourceType.TEAM_XP, 0);
        res.put(ResourceType.POWER_POINTS, 0);

        // The game's expected first-launch mechanism (reversed from the bytecode):
        // a genuine new account has the INTRO tutorial IN PROGRESS (step 0) and NO
        // heroes — the tutorial itself grants the first hero and sets the
        // CAMPAIGN_UNLOCKED flag. An ABSENT tutorial act reads as "completed"
        // (TutorialHelper.completedTutorialAct returns true when getTutorialAct==null),
        // so we must seed the INTRO act present-and-unfinished for the tutorial to run.
        // DS_GRANT_HEROES=true instead skips the tutorial and hands a post-tutorial
        // roster (for testing menus without playing the tutorial).
        @SuppressWarnings("unchecked")
        List<TutorialAct> acts = (List<TutorialAct>) getField(ux, "tutorialActs");
        boolean grantHeroes = Boolean.getBoolean("ds.grantHeroes");
        if (grantHeroes) {
            UnitType[] starters = {
                UnitType.CLAW_MAN, UnitType.AQUATIC_MAN, UnitType.CENTAUR_OF_ATTENTION,
                UnitType.ANGELIC_HERALD, UnitType.CRIMSON_WITCH,
            };
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
        } else {
            // Fresh player: INTRO tutorial in progress (step 0), no heroes.
            // ds.tutStep lets tests jump straight to a later step (e.g. 41 = open
            // chest screen) to iterate on server responses without replaying combat.
            TutorialAct intro = new TutorialAct();
            intro.type = TutorialActType.INTRO;
            intro.step = Integer.getInteger("ds.tutStep", 0);
            intro.version = TutorialHelper.getMaxVersion(TutorialActType.INTRO);
            acts.add(intro);
        }

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
