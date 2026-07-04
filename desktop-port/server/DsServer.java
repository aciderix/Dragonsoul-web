import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;

/**
 * DragonSoul local server — v0 (exploratory).
 *
 * Single port (default 8080), routes by first bytes:
 *   "GET " ...           -> HTTP: serves the content manifest (server/index.txt)
 *                           and any other file under server/content/ if present.
 *   otherwise            -> the game's TCP protocol: logs framing so we can see
 *                           the client reach the game connection, then (later)
 *                           decode ClientInfo / reply BootData.
 *
 * Goal of v0: serve index.txt so the AssetUpdater stops failing and the game
 * proceeds to open the game-protocol connection. Run before launching the game.
 */
public class DsServer {
    static Path root;

    public static void main(String[] args) throws Exception {
        int port = args.length > 0 ? Integer.parseInt(args[0]) : 8080;
        root = Paths.get(args.length > 1 ? args[1] : "server");
        ServerSocket ss = new ServerSocket(port);
        System.out.println("[server] listening on " + port + " (root=" + root.toAbsolutePath() + ")");
        while (true) {
            Socket s = ss.accept();
            new Thread(() -> handle(s)).start();
        }
    }

    static void handle(Socket s) {
        String peer = s.getRemoteSocketAddress().toString();
        try {
            s.setTcpNoDelay(true);
            PushbackInputStream in = new PushbackInputStream(new BufferedInputStream(s.getInputStream()), 8);
            byte[] head = new byte[4];
            int n = readFully(in, head, 0, 4);
            if (n < 1) { s.close(); return; }
            in.unread(head, 0, n);
            if (n >= 4 && head[0] == 'G' && head[1] == 'E' && head[2] == 'T' && head[3] == ' ') {
                handleHttp(s, in, peer);
            } else {
                handleGame(s, in, peer, head, n);
            }
        } catch (Exception e) {
            System.out.println("[server] " + peer + " error: " + e);
        }
    }

    // --- HTTP content manifest ---
    static void handleHttp(Socket s, InputStream in, String peer) throws IOException {
        BufferedReader r = new BufferedReader(new InputStreamReader(in, StandardCharsets.ISO_8859_1));
        String line = r.readLine();
        System.out.println("[http] " + peer + " " + line);
        // drain headers
        while ((line = r.readLine()) != null && !line.isEmpty()) { /* ignore */ }
        OutputStream out = s.getOutputStream();
        byte[] body = loadIndex();
        String resp = "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: "
                + body.length + "\r\nConnection: close\r\n\r\n";
        out.write(resp.getBytes(StandardCharsets.ISO_8859_1));
        out.write(body);
        out.flush();
        System.out.println("[http] served index.txt (" + body.length + " bytes)");
        s.close();
    }

    static byte[] loadIndex() {
        try {
            Path idx = root.resolve("index.txt");
            if (Files.exists(idx)) return Files.readAllBytes(idx);
        } catch (IOException ignored) {}
        return new byte[0]; // empty manifest by default
    }

    // --- game TCP protocol (framing probe) ---
    static void handleGame(Socket s, InputStream in, String peer, byte[] head, int headLen) throws IOException {
        System.out.println("[game] " + peer + " connected; first bytes: " + hex(head, headLen));
        DataInputStream din = new DataInputStream(in);
        int frame = 0;
        try {
            while (true) {
                int len = readInt32LE(din);
                byte[] body = new byte[len];
                din.readFully(body);
                System.out.println("[game] frame #" + (frame++) + " len=" + len + " (wrapped)");
                if (frame == 1) System.out.println("[game]   head=" + hex(body, Math.min(32, body.length)));
            }
        } catch (EOFException eof) {
            System.out.println("[game] " + peer + " closed after " + frame + " frames");
        } finally { s.close(); }
    }

    static int readInt32LE(DataInputStream in) throws IOException {
        int b0 = in.read(), b1 = in.read(), b2 = in.read(), b3 = in.read();
        if ((b0 | b1 | b2 | b3) < 0) throw new EOFException();
        return (b0 & 0xff) | ((b1 & 0xff) << 8) | ((b2 & 0xff) << 16) | ((b3 & 0xff) << 24);
    }
    static int readFully(InputStream in, byte[] buf, int off, int len) throws IOException {
        int total = 0;
        while (total < len) { int r = in.read(buf, off + total, len - total); if (r < 0) break; total += r; }
        return total;
    }
    static String hex(byte[] b, int len) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < len; i++) sb.append(String.format("%02x ", b[i] & 0xff));
        return sb.toString().trim();
    }
}
