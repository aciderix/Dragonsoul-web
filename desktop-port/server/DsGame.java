import java.io.*;
import java.lang.reflect.*;
import java.net.Socket;

/**
 * DragonSoul game-protocol handler — reuses the GAME'S OWN serialization so the
 * wire format is identical by construction (no hand-rolled encoding, no guessing).
 *
 * Frame = [int32 LE length][ XOR+Deflate-wrapped body ]. The body, once unwrapped,
 * is a message serialized by the game's framework. We drive:
 *   read:  unpackInt -> read -> wrapper.wrapIn -> MessageFactory.readMessage(reader)
 *   write: msg.writeAll(writer) -> wrapper.wrapOut -> packInt -> socket
 * exactly as the client's connection (com.perblue.a.a.k) does.
 *
 * Nameable game types are referenced directly; the ones whose package collides with
 * a class of the same name (the reader com.perblue.a.a.a.a, writer com.perblue.a.a.a.b,
 * and com.perblue.common.a.b's packInt/unpackInt) are reached by reflection.
 */
public final class DsGame {

    // --- reflective handles for the un-nameable framework types ---
    private final Constructor<?> readerCtor;   // com.perblue.a.a.a.a(byte[])
    private final Constructor<?> writerCtor;    // com.perblue.a.a.a.b()
    private final Class<?> readerClass, writerClass;
    private final Method packInt, unpackInt;    // com.perblue.common.a.b
    private final Method writeAll;              // com.perblue.a.a.i.writeAll(writer)
    private final Method readMessage;           // MessageFactory.readMessage(reader)
    private final Object messageFactory;

    private final DsStore store;                // player-progression persistence (load)
    private DsStore.State state;                // this connection's live player state

    public DsGame() throws Exception {
        this(new File(System.getProperty("ds.saveDir", "build/run/save")));
    }

    public DsGame(File saveDir) throws Exception {
        store = new DsStore(saveDir);
        readerClass = Class.forName("com.perblue.a.a.a.a");
        writerClass = Class.forName("com.perblue.a.a.a.b");
        readerCtor = readerClass.getConstructor(byte[].class);
        writerCtor = writerClass.getConstructor();
        Class<?> packer = Class.forName("com.perblue.common.a.b");
        packInt = packer.getMethod("packInt", OutputStream.class, int.class);
        unpackInt = packer.getMethod("unpackInt", InputStream.class);
        Class<?> msgBase = Class.forName("com.perblue.a.a.i");
        writeAll = msgBase.getMethod("writeAll", writerClass);
        Class<?> factoryClass = Class.forName("com.perblue.rpg.network.messages.MessageFactory");
        messageFactory = factoryClass.getMethod("getInstance").invoke(null);
        readMessage = factoryClass.getMethod("readMessage", readerClass);
    }

    /** Handle one game connection: read messages, reply to ClientInfo with BootData. */
    public void handle(Socket s, InputStream in, OutputStream out, String peer) throws Exception {
        // Server-side codec (fixed XOR key baked into ServerXORConnectionWrapper).
        com.perblue.common.i.a wrapper = new com.perblue.rpg.network.ServerXORConnectionWrapper();
        BufferedInputStream bin = new BufferedInputStream(in);
        int frame = 0;
        while (true) {
            int len;
            try { len = (int) unpackInt.invoke(null, bin); }
            catch (InvocationTargetException e) {
                if (e.getCause() instanceof EOFException) break; else throw e;
            }
            byte[] wrapped = new byte[len];
            int off = 0; while (off < len) { int r = bin.read(wrapped, off, len - off); if (r < 0) break; off += r; }
            if (off < len) { System.out.println("[game] " + peer + " short frame, closing"); break; }

            byte[] data = wrapper.wrapIn(wrapped);
            Object reader = readerCtor.newInstance((Object) data);
            com.perblue.a.a.i msg = (com.perblue.a.a.i) readMessage.invoke(messageFactory, reader);
            System.out.println("[game] " + peer + " frame#" + (frame++) + " -> " + msg.getFullName()
                    + " (msgNum=" + msg.getMessageNumber() + ")");
            dispatch(msg, wrapper, out);
        }
    }

    /** Route an incoming client message to a handler; unhandled ones are telemetry
     *  or fire-and-forget (no response expected). */
    private void dispatch(com.perblue.a.a.i msg, com.perblue.common.i.a wrapper, OutputStream out)
            throws Exception {
        String name = msg.getFullName();
        if (name.equals(com.perblue.rpg.network.messages.ClientInfo.getFullName_Static())) {
            System.out.println("[game]   ClientInfo = " + msg);
            long now = System.currentTimeMillis();
            // Load the persisted player (full state: gold/stamina/heroes/campaign/
            // tutorial/…) or create+save a brand-new one. Reconnecting resumes exactly.
            boolean firstBoot = !store.exists(DsUserState.USER_ID);
            state = store.load(DsUserState.USER_ID);
            if (state == null) {
                state = DsUserState.newPlayer(now);
                store.save(DsUserState.USER_ID, state);
                System.out.println("[game]   new player created + saved");
            } else {
                java.util.Map<com.perblue.rpg.network.messages.ResourceType, Integer> res =
                        state.userExtra != null ? state.userExtra.resources : null;
                System.out.println("[game]   resumed saved player"
                        + (res == null ? "" :
                          " gold=" + res.get(com.perblue.rpg.network.messages.ResourceType.GOLD)
                        + " stamina=" + res.get(com.perblue.rpg.network.messages.ResourceType.STAMINA)
                        + " diamonds=" + res.get(com.perblue.rpg.network.messages.ResourceType.DIAMONDS)
                        + " heroes=" + (state.userExtra.heroes == null ? 0 : state.userExtra.heroes.size())));
            }
            com.perblue.rpg.network.messages.BootData boot = new com.perblue.rpg.network.messages.BootData();
            boot.serverTime = now;
            boot.firstBoot = firstBoot ? Boolean.TRUE : Boolean.FALSE;
            boot.updateAvailable = Boolean.FALSE;
            boot.userInfo = state.userInfo;
            boot.userExtra = state.userExtra;
            com.perblue.rpg.network.messages.PrivateUserInfo pui =
                    new com.perblue.rpg.network.messages.PrivateUserInfo();
            pui.email = "";
            boot.privateUserInfo = pui;
            DsUserState.attachBootFields(boot);
            send(boot, msg, wrapper, out, "BootData");
        } else if (name.equals(com.perblue.rpg.network.messages.RequestChestAcknowledgement.getFullName_Static())) {
            handleRequestChestAcknowledgement(wrapper, out);
        } else if (name.equals(com.perblue.rpg.network.messages.SetPlayerName.getFullName_Static())) {
            handleSetPlayerName((com.perblue.rpg.network.messages.SetPlayerName) msg);
        }
        // Progression is persisted by the LAUNCHER snapshotting the client's live state
        // (DsSnapshot) into this same save file — the client is authoritative-local, so a
        // full snapshot is exact where reconstructing from notifications would be partial
        // (see PROGRESS.md / SERVER_DESIGN.md). The server only loads. DsProgress is kept
        // for the future authoritative server (which will mirror the game's own logic).
    }

    /**
     * Name-change (the game's real "set your name" feature: new players get a free change,
     * UserFlag.FREE_NAME_CHANGE, and the client shows ChangeNamePrompt). When the player
     * confirms, the client updates its own name + consumes the flag optimistically and sends
     * us SetPlayerName. We record it on the server's live state for consistency; the LAUNCHER
     * snapshot then persists the client's updated name/flag to the save, so the player sets
     * their name once and it sticks (no rustine — the feature works end to end).
     */
    private void handleSetPlayerName(com.perblue.rpg.network.messages.SetPlayerName msg) {
        String newName = msg.name;
        if (newName == null || newName.isEmpty()) return;
        if (state != null && state.userInfo != null && state.userInfo.basicInfo != null) {
            state.userInfo.basicInfo.previousName = state.userInfo.basicInfo.name;
            state.userInfo.basicInfo.name = newName;
        }
        System.out.println("[game]   SetPlayerName -> \"" + newName + "\" (recorded)");
    }

    /**
     * Chest roll gate. Chest loot is computed CLIENT-SIDE (ChestHelper.buyChests →
     * LootResults, rigged during the tutorial to grant the Centaur), but the client
     * refuses to roll until the server has "acknowledged" the pending chests:
     * ChestHelper.checkIfCanRollChests() sends us a RequestChestAcknowledgement and
     * blocks while RPGMain.unacknowledgedChestsRemaining == 0. We reply with a
     * ChestAcknowledgement, whose handler (RPGMain$107) calls resetChestRollChances()
     * and sets the counter back to 1 — unblocking the next roll. This is the real
     * mechanism the tutorial's gold/silver chest steps wait on.
     */
    private void handleRequestChestAcknowledgement(com.perblue.common.i.a wrapper, OutputStream out)
            throws Exception {
        com.perblue.rpg.network.messages.ChestAcknowledgement ack =
                new com.perblue.rpg.network.messages.ChestAcknowledgement();
        push(ack, wrapper, out, "ChestAcknowledgement");
    }

    /** Serialize + wrap + frame a server-initiated push (no request correlation). The
     *  client routes it to the registered type-handler by message class. */
    private void push(com.perblue.a.a.i msg, com.perblue.common.i.a wrapper,
                      OutputStream out, String label) throws Exception {
        Object writer = writerCtor.newInstance();
        writeAll.invoke(msg, writer);
        byte[] body = (byte[]) writerClass.getMethod("toByteArray").invoke(writer);
        byte[] wrapped = wrapper.wrapOut(body);
        synchronized (out) {
            packInt.invoke(null, out, wrapped.length);
            out.write(wrapped);
            out.flush();
        }
        System.out.println("[game]   -> " + label + " pushed (" + wrapped.length + " wrapped bytes)");
    }

    /** Serialize + wrap + frame a response, correlated to the request. */
    private void send(com.perblue.a.a.i resp, com.perblue.a.a.i request,
                      com.perblue.common.i.a wrapper, OutputStream out, String label) throws Exception {
        resp.setAsReplyTo(request); // responseMessageNumber = request.messageNumber
        Object writer = writerCtor.newInstance();
        writeAll.invoke(resp, writer);
        byte[] body = (byte[]) writerClass.getMethod("toByteArray").invoke(writer);
        byte[] wrapped = wrapper.wrapOut(body);
        synchronized (out) {
            packInt.invoke(null, out, wrapped.length);
            out.write(wrapped);
            out.flush();
        }
        System.out.println("[game]   -> " + label + " sent (" + wrapped.length + " wrapped bytes)");
    }
}
