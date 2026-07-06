package dsbackend;

import java.io.*;
import java.lang.reflect.*;
import java.util.*;

import com.perblue.rpg.RPGMain;
import com.perblue.rpg.game.objects.User;
import com.perblue.rpg.game.objects.UnitData;
import com.perblue.rpg.game.objects.ClientCampaignLevelStatus;
import com.perblue.rpg.game.objects.IUserTutorialAct;
import com.perblue.rpg.game.ClientNetworkStateConverter;
import com.perblue.rpg.game.data.campaign.CampaignStats;
import com.perblue.rpg.network.messages.UserExtra;
import com.perblue.rpg.network.messages.UserInfo;
import com.perblue.rpg.network.messages.UnitType;
import com.perblue.rpg.network.messages.HeroData;
import com.perblue.rpg.network.messages.TutorialAct;
import com.perblue.rpg.network.messages.TutorialActType;
import com.perblue.rpg.network.messages.CampaignLevelStatus;
import com.perblue.rpg.network.messages.CampaignType;
import com.perblue.rpg.network.messages.ResourceType;

/**
 * DEV persistence — snapshot of the client's LIVE authoritative state to the server's
 * save file. The client is authoritative-local (it computes resources/combat and never
 * uploads exact resources), so the only way to persist a COMPLETE, exact player state
 * without re-implementing the whole game server is to read the client's own runtime
 * {@code User} and serialise it.
 *
 * We take {@code user.getExtra()} (kept live/write-through for resources, flags, misc)
 * as the base, then OVERWRITE the fields the client keeps as separate runtime objects
 * (heroes, campaign level statuses, tutorial acts) by reading them back through the
 * GAME'S OWN converters/getters — no invented values (see PRINCIPLES §3, §6):
 *   heroes   : ClientNetworkStateConverter.getHeroData(UnitData)
 *   campaign : ClientCampaignLevelStatus getters
 *   tutorial : IUserTutorialAct getters
 * The result is written in DsStore's on-disk format ([int32 len][UserInfo][int32 len]
 * [UserExtra], each the message's own writeAll bytes), so the server just loads it.
 *
 * Later this is replaced by an authoritative server mirroring the game's own logic
 * (SERVER_DESIGN.md); the save format and loader stay the same.
 */
public final class DsSnapshot {

    private final Constructor<?> readerCtor;   // com.perblue.a.a.a.a(byte[])
    private final Constructor<?> writerCtor;    // com.perblue.a.a.a.b()
    private final Method writeAll, toByteArray, readMessage;
    private final Object messageFactory;

    public DsSnapshot() throws Exception {
        Class<?> readerClass = Class.forName("com.perblue.a.a.a.a");
        Class<?> writerClass = Class.forName("com.perblue.a.a.a.b");
        readerCtor = readerClass.getConstructor(byte[].class);
        writerCtor = writerClass.getConstructor();
        writeAll = Class.forName("com.perblue.a.a.i").getMethod("writeAll", writerClass);
        toByteArray = writerClass.getMethod("toByteArray");
        Class<?> mf = Class.forName("com.perblue.rpg.network.messages.MessageFactory");
        messageFactory = mf.getMethod("getInstance").invoke(null);
        readMessage = mf.getMethod("readMessage", readerClass);
    }

    /** Write a full snapshot of the current player to {@code out}; no-op before login. */
    public void save(RPGMain game, File out) {
        try {
            User user = game.getYourUser();
            if (user == null) return;

            // Readiness gate: getYourUser() can return a User object during the boot
            // handshake BEFORE BootData has populated it (resources map still empty).
            // Snapshotting then would clobber the save with all-zeros. A real logged-in
            // player always has a populated resources map, so use that as the "booted"
            // signal — never persist an uninitialised user.
            UserExtra liveExtra = user.getExtra();
            if (liveExtra == null || liveExtra.resources == null || liveExtra.resources.isEmpty()) return;

            // Base = a deep copy of the live UserExtra (correct for resources/flags/…).
            UserExtra extra = (UserExtra) deepCopy(liveExtra);

            // Heroes — via the game's own runtime->wire converter.
            Map<UnitType, HeroData> heroes = new HashMap<>();
            for (UnitData u : user.getHeroes()) {
                heroes.put(u.getType(), ClientNetworkStateConverter.getHeroData(u));
            }
            extra.heroes = heroes;

            // Tutorial acts — enumerate every type, keep the present ones.
            List<TutorialAct> acts = new ArrayList<>();
            for (TutorialActType t : TutorialActType.valuesCached()) {
                IUserTutorialAct a = user.getTutorialAct(t);
                if (a == null) continue;
                TutorialAct ta = new TutorialAct();
                ta.type = a.getType();
                ta.step = a.getStep();
                ta.version = a.getVersion();
                acts.add(ta);
            }
            extra.tutorialActs = acts;

            // Campaign — every attempted level across all difficulties.
            List<CampaignLevelStatus> statuses = new ArrayList<>();
            for (CampaignType ct : CampaignType.valuesCached()) {
                int chapters = CampaignStats.getNumChapters(ct);
                for (int ch = 0; ch < chapters; ch++) {
                    for (ClientCampaignLevelStatus s : user.getCampaignLevels(ct, ch)) {
                        if (s.getStars() <= 0 && s.getTotalWins() <= 0) continue;
                        CampaignLevelStatus cls = new CampaignLevelStatus();
                        cls.campaignType = s.getCampaignType();
                        cls.chapter = s.getChapter();
                        cls.level = s.getLevel();
                        cls.stars = s.getStars();
                        cls.totalWins = s.getTotalWins();
                        cls.winsAtCurrentStars = s.getWinsAtCurrentStars();
                        statuses.add(cls);
                    }
                }
            }
            extra.levelStatuses = statuses;

            // Identity/derived header — the game's own basic-info converter + live values.
            UserInfo info = new UserInfo();
            info.basicInfo = ClientNetworkStateConverter.getBasicUserInfo(user);
            info.shardID = user.getShardID();
            info.diamonds = user.getResource(ResourceType.DIAMONDS);
            info.creationTime = info.basicInfo != null ? info.basicInfo.creationTime : System.currentTimeMillis();
            info.lastLoginTime = System.currentTimeMillis();
            // writeData uses packString, which rejects null — the freshly-built header
            // may leave some strings null (creationTimeServerTxt, basicInfo fields).
            nullSafeStrings(info);
            nullSafeStrings(info.basicInfo);

            writeFile(out, info, extra);
            System.out.println("[snapshot] saved -> " + out.getName()
                    + " gold=" + user.getResource(ResourceType.GOLD)
                    + " stamina=" + user.getResource(ResourceType.STAMINA)
                    + " diamonds=" + user.getResource(ResourceType.DIAMONDS)
                    + " heroes=" + heroes.size()
                    + " campaignLevels=" + statuses.size());
        } catch (Throwable t) {
            Throwable c = (t instanceof java.lang.reflect.InvocationTargetException && t.getCause() != null)
                    ? t.getCause() : t;
            System.out.println("[snapshot] save failed: " + c);
            c.printStackTrace(System.out);
        }
    }

    /** writeData serializes String fields with packString, which throws on null.
     *  A freshly-built header message can leave some strings null (they default to
     *  null, not ""), so set any null public String field to "" before writing. */
    private static void nullSafeStrings(Object msg) {
        if (msg == null) return;
        for (java.lang.reflect.Field f : msg.getClass().getFields()) {
            if (java.lang.reflect.Modifier.isStatic(f.getModifiers())) continue;
            if (f.getType() != String.class) continue;
            try { if (f.get(msg) == null) f.set(msg, ""); } catch (Exception ignore) {}
        }
    }

    private com.perblue.a.a.i deepCopy(com.perblue.a.a.i msg) throws Exception {
        Object w = writerCtor.newInstance();
        writeAll.invoke(msg, w);
        byte[] b = (byte[]) toByteArray.invoke(w);
        Object r = readerCtor.newInstance((Object) b);
        return (com.perblue.a.a.i) readMessage.invoke(messageFactory, r);
    }

    private void writeFile(File out, com.perblue.a.a.i info, com.perblue.a.a.i extra) throws Exception {
        if (out.getParentFile() != null) out.getParentFile().mkdirs();
        File tmp = new File(out.getParentFile(), out.getName() + ".tmp");
        try (DataOutputStream d = new DataOutputStream(new BufferedOutputStream(new FileOutputStream(tmp)))) {
            writeMsg(d, info);
            writeMsg(d, extra);
            d.flush();
        }
        if (!tmp.renameTo(out)) { out.delete(); tmp.renameTo(out); } // atomic-ish replace
    }

    private void writeMsg(DataOutputStream d, com.perblue.a.a.i msg) throws Exception {
        Object w = writerCtor.newInstance();
        writeAll.invoke(msg, w);
        byte[] b = (byte[]) toByteArray.invoke(w);
        d.writeInt(b.length);
        d.write(b);
    }
}
