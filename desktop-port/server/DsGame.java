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

    public DsGame() throws Exception {
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
            com.perblue.rpg.network.messages.BootData boot = new com.perblue.rpg.network.messages.BootData();
            long now = System.currentTimeMillis();
            boot.serverTime = now;
            boot.firstBoot = Boolean.TRUE;
            boot.updateAvailable = Boolean.FALSE;
            DsUserState.populate(boot, now);
            send(boot, msg, wrapper, out, "BootData");
        } else if (name.equals(com.perblue.rpg.network.messages.RequestChestAcknowledgement.getFullName_Static())) {
            handleRequestChestAcknowledgement(wrapper, out);
        }
        // else: BuyChests (client→server notification: loot is rolled locally by
        // ChestHelper, no client-side receive-handler exists, so nothing to reply),
        // ChangeTutorialStep / LoadTime / PerfReport / Ping / Action(...) — no blocking
        // response needed yet (added as the tutorial reaches them).
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
