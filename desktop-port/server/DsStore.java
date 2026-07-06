import java.io.*;
import java.lang.reflect.*;

/**
 * Player-progression persistence. Stores the FULL player state (UserInfo + UserExtra —
 * which carry gold/stamina/diamonds, heroes, campaign progress, tutorial acts, lineups,
 * flags, …) to a file per user, using the GAME'S OWN serialization so the saved bytes
 * are byte-identical to what the wire uses (no hand-rolled format, no hallucination).
 *
 * Format per file:  [int32 len][UserInfo writeAll bytes][int32 len][UserExtra writeAll bytes]
 * Save via message.writeAll(writer); load via MessageFactory.readMessage(reader) (writeAll
 * writes the FULL_NAME header first, so the factory reconstructs the right type).
 *
 * The server is authoritative for persistence: it applies the client's action messages
 * to this stored state (see DsProgress) and re-saves, so reconnecting resumes exactly
 * where the player left off.
 */
final class DsStore {

    /** In-memory + on-disk player state (the two top-level state messages). */
    static final class State {
        final com.perblue.rpg.network.messages.UserInfo userInfo;
        final com.perblue.rpg.network.messages.UserExtra userExtra;
        State(com.perblue.rpg.network.messages.UserInfo i, com.perblue.rpg.network.messages.UserExtra e) {
            this.userInfo = i; this.userExtra = e;
        }
    }

    private final File dir;
    private final Constructor<?> readerCtor;   // com.perblue.a.a.a.a(byte[])
    private final Constructor<?> writerCtor;    // com.perblue.a.a.a.b()
    private final Class<?> writerClass;
    private final Method writeAll;              // com.perblue.a.a.i.writeAll(writer)
    private final Method readMessage;           // MessageFactory.readMessage(reader)
    private final Object messageFactory;

    DsStore(File dir) throws Exception {
        this.dir = dir;
        dir.mkdirs();
        Class<?> readerClass = Class.forName("com.perblue.a.a.a.a");
        writerClass = Class.forName("com.perblue.a.a.a.b");
        readerCtor = readerClass.getConstructor(byte[].class);
        writerCtor = writerClass.getConstructor();
        writeAll = Class.forName("com.perblue.a.a.i").getMethod("writeAll", writerClass);
        Class<?> factoryClass = Class.forName("com.perblue.rpg.network.messages.MessageFactory");
        messageFactory = factoryClass.getMethod("getInstance").invoke(null);
        readMessage = factoryClass.getMethod("readMessage", readerClass);
    }

    private File file(long userId) { return new File(dir, "user-" + userId + ".dat"); }

    boolean exists(long userId) { return file(userId).isFile(); }

    /** Load a saved player state, or null if none exists. */
    synchronized State load(long userId) {
        File f = file(userId);
        if (!f.isFile()) return null;
        try (DataInputStream in = new DataInputStream(new BufferedInputStream(new FileInputStream(f)))) {
            com.perblue.rpg.network.messages.UserInfo ui =
                    (com.perblue.rpg.network.messages.UserInfo) readMsg(in);
            com.perblue.rpg.network.messages.UserExtra ux =
                    (com.perblue.rpg.network.messages.UserExtra) readMsg(in);
            System.out.println("[store] loaded user " + userId + " (" + f.length() + " bytes)");
            return new State(ui, ux);
        } catch (Exception e) {
            System.out.println("[store] load failed for user " + userId + ": " + e + " — treating as new");
            return null;
        }
    }

    /** Persist the full player state atomically (write to tmp, then rename). */
    synchronized void save(long userId, State s) {
        File f = file(userId);
        File tmp = new File(f.getParentFile(), f.getName() + ".tmp");
        try (DataOutputStream out = new DataOutputStream(new BufferedOutputStream(new FileOutputStream(tmp)))) {
            writeMsg(out, s.userInfo);
            writeMsg(out, s.userExtra);
            out.flush();
        } catch (Exception e) {
            System.out.println("[store] save failed for user " + userId + ": " + e);
            return;
        }
        if (!tmp.renameTo(f)) { f.delete(); tmp.renameTo(f); }
    }

    private void writeMsg(DataOutputStream out, com.perblue.a.a.i msg) throws Exception {
        Object writer = writerCtor.newInstance();
        writeAll.invoke(msg, writer);
        byte[] body = (byte[]) writerClass.getMethod("toByteArray").invoke(writer);
        out.writeInt(body.length);
        out.write(body);
    }

    private com.perblue.a.a.i readMsg(DataInputStream in) throws Exception {
        int len = in.readInt();
        byte[] body = new byte[len];
        in.readFully(body);
        Object reader = readerCtor.newInstance((Object) body);
        return (com.perblue.a.a.i) readMessage.invoke(messageFactory, reader);
    }
}
