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
            String name = msg.getFullName();
            System.out.println("[game] " + peer + " frame#" + (frame++) + " -> " + name
                    + " (msgNum=" + msg.getMessageNumber() + ")");

            if (name.equals(com.perblue.rpg.network.messages.ClientInfo.getFullName_Static())) {
                System.out.println("[game]   ClientInfo = " + msg);
                sendBootData(wrapper, out, msg);
            }
        }
    }

    /** Build a BootData reply and send it, correlated to the client's request. */
    private void sendBootData(com.perblue.common.i.a wrapper, OutputStream out, com.perblue.a.a.i request)
            throws Exception {
        com.perblue.rpg.network.messages.BootData boot = new com.perblue.rpg.network.messages.BootData();
        long now = System.currentTimeMillis();
        boot.serverTime = now;
        boot.firstBoot = Boolean.TRUE;
        boot.updateAvailable = Boolean.FALSE;
        // Full new-player state (identity, resources, …) via the game's own classes.
        DsUserState.populate(boot, now);
        boot.setAsReplyTo(request); // so the client matches this to its ClientInfo

        Object writer = writerCtor.newInstance();
        writeAll.invoke(boot, writer);
        byte[] body = (byte[]) writerClass.getMethod("toByteArray").invoke(writer);
        byte[] wrapped = wrapper.wrapOut(body);
        packInt.invoke(null, out, wrapped.length);
        out.write(wrapped);
        out.flush();
        System.out.println("[game]   -> BootData sent (" + wrapped.length + " wrapped bytes)");
    }
}
