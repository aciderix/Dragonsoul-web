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
            // Route by first bytes: an ASCII HTTP method (GET/POST/PUT/HEAD) → HTTP;
            // anything else → the game's binary TCP protocol (framed).
            String tok = n >= 4 ? new String(head, 0, 4, StandardCharsets.ISO_8859_1) : "";
            if (tok.equals("GET ") || tok.equals("POST") || tok.equals("PUT ") || tok.equals("HEAD")) {
                handleHttp(s, in, peer);
            } else {
                handleGame(s, in, peer, head, n);
            }
        } catch (Exception e) {
            System.out.println("[server] " + peer + " error: " + e);
        }
    }

    // --- HTTP: content manifest (GET) + login (POST /login) ---
    static void handleHttp(Socket s, InputStream in, String peer) throws IOException {
        // Read request line + headers over ISO-8859-1 (byte-preserving), then the
        // body by Content-Length. We read raw so the request byte stream stays exact.
        String requestLine = readLine(in);
        System.out.println("[http] " + peer + " " + requestLine);
        String[] parts = requestLine == null ? new String[0] : requestLine.split(" ");
        String method = parts.length > 0 ? parts[0] : "";
        String path = parts.length > 1 ? parts[1] : "";
        int contentLength = 0;
        String h;
        while ((h = readLine(in)) != null && !h.isEmpty()) {
            int c = h.indexOf(':');
            if (c > 0 && h.substring(0, c).trim().equalsIgnoreCase("Content-Length"))
                contentLength = Integer.parseInt(h.substring(c + 1).trim());
        }
        byte[] bodyIn = new byte[contentLength];
        if (contentLength > 0) readFully(in, bodyIn, 0, contentLength);

        // Login params ride the query string (GET, as the client sends) or the body
        // (POST). Merge both so requestID is found either way.
        int q = path.indexOf('?');
        String query = q >= 0 ? path.substring(q + 1) : "";
        String pathOnly = q >= 0 ? path.substring(0, q) : path;
        if (pathOnly.startsWith("/login")) {
            String params = query + (query.isEmpty() ? "" : "&") + new String(bodyIn, StandardCharsets.UTF_8);
            handleLogin(s, params, peer);
        } else {
            byte[] body = loadIndex();
            writeHttp(s, "text/plain", body);
            System.out.println("[http] served index.txt (" + body.length + " bytes)");
        }
    }

    /**
     * Login endpoint. RPGMain.handleLoginServerResponse (reversed from the game)
     * requires HTTP 200 and a JSON body {"status":..,"data":..,"requestID":..}.
     * status=="good" → the game splits `data` on ':' into host:port and opens the
     * game TCP socket there (via startNetwork). We point it back at ourselves so the
     * same server handles the game protocol. requestID is echoed from the client's
     * loginRequestID form field. Everything here is derived from the bytecode.
     */
    static void handleLogin(Socket s, String formBody, String peer) throws IOException {
        String gameHost = System.getProperty("ds.gameHost", "127.0.0.1");
        String gamePort = System.getProperty("ds.gamePort", "8080");
        String requestID = formParam(formBody, "loginRequestID");
        if (requestID == null) requestID = "0";
        String json = "{\"status\":\"good\",\"data\":\"" + gameHost + ":" + gamePort
                + "\",\"requestID\":\"" + jsonEscape(requestID) + "\"}";
        System.out.println("[login] " + peer + " -> " + json);
        writeHttp(s, "application/json", json.getBytes(StandardCharsets.UTF_8));
    }

    static void writeHttp(Socket s, String contentType, byte[] body) throws IOException {
        OutputStream out = s.getOutputStream();
        String resp = "HTTP/1.1 200 OK\r\nContent-Type: " + contentType + "\r\nContent-Length: "
                + body.length + "\r\nConnection: close\r\n\r\n";
        out.write(resp.getBytes(StandardCharsets.ISO_8859_1));
        out.write(body);
        out.flush();
        s.close();
    }

    /** Read a CRLF-terminated line from a raw byte stream (headers are ASCII). */
    static String readLine(InputStream in) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        int c;
        while ((c = in.read()) != -1) {
            if (c == '\n') break;
            if (c != '\r') bos.write(c);
        }
        if (c == -1 && bos.size() == 0) return null;
        return new String(bos.toByteArray(), StandardCharsets.ISO_8859_1);
    }

    static String formParam(String body, String key) {
        if (body == null) return null;
        for (String pair : body.split("&")) {
            int eq = pair.indexOf('=');
            if (eq < 0) continue;
            String k = urlDecode(pair.substring(0, eq));
            if (k.equals(key)) return urlDecode(pair.substring(eq + 1));
        }
        return null;
    }
    static String urlDecode(String s) {
        try { return java.net.URLDecoder.decode(s, "UTF-8"); } catch (Exception e) { return s; }
    }
    static String jsonEscape(String s) { return s.replace("\\", "\\\\").replace("\"", "\\\""); }

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
