package dsbackend;

import java.io.*;
import java.lang.reflect.*;
import java.net.*;
import java.util.Map;

/**
 * Desktop Net backend (com.badlogic.gdx.l). The game's login uses
 * Gdx.net.sendHttpRequest(request, listener) — the ONLY method on the Net
 * interface here (the game's TCP game-socket uses raw java.net.Socket, not Net).
 * Without this wired, RPGMain.sendLoginRequest NPEs/no-ops, the /login step never
 * completes, and the game never opens the game socket (home screen waits forever
 * for BootData). This is a REAL implementation over java.net, not a stub.
 *
 * HttpRequest accessors (com.badlogic.gdx.l.a), recovered from libGDX field order:
 *   b()=method, c()=url, d()=content, e()=headers(Map), a()=timeout(int), f()=followRedirects
 * HttpResponse (com.badlogic.gdx.l$b) is an interface returning HttpStatus
 * (com.badlogic.gdx.f.c) — both un-nameable from source (package/interface name
 * collisions), so the response is a dynamic Proxy and HttpStatus is built via
 * reflection.
 */
public final class DsNet implements com.badlogic.gdx.l {

    private static final Class<?> RESP_IFACE;   // com.badlogic.gdx.l$b (HttpResponse)
    private static final Constructor<?> STATUS_CTOR; // com.badlogic.gdx.f.c(int)
    static {
        try {
            RESP_IFACE = Class.forName("com.badlogic.gdx.l$b");
            STATUS_CTOR = Class.forName("com.badlogic.gdx.f.c").getConstructor(int.class);
        } catch (Exception e) { throw new RuntimeException("DsNet init", e); }
    }

    /** sendHttpRequest(request, listener). */
    @Override
    public void a(com.badlogic.gdx.l.a request, com.badlogic.gdx.l.c listener) {
        final String method = safe(request.b(), "GET");
        final String url = request.c();
        final String content = request.d();
        final Map<String, String> headers = request.e();
        final int timeout = request.a();
        final boolean followRedirects = request.f();
        Thread t = new Thread(() -> perform(method, url, content, headers, timeout, followRedirects, listener),
                              "ds-http");
        t.setDaemon(true);
        t.start();
    }

    private void perform(String method, String url, String content, Map<String, String> headers,
                         int timeout, boolean followRedirects, com.badlogic.gdx.l.c listener) {
        HttpURLConnection c = null;
        try {
            // localhost bypasses the agent proxy (nonProxyHosts); use no proxy explicitly.
            // libGDX appends the content as a query string for GET/DELETE.
            String effectiveUrl = url;
            boolean bodyMethod = method.equals("POST") || method.equals("PUT") || method.equals("PATCH");
            if (!bodyMethod && content != null && !content.isEmpty())
                effectiveUrl = url + (url.contains("?") ? "&" : "?") + content;
            URL u = new URL(effectiveUrl);
            boolean local = u.getHost().equals("127.0.0.1") || u.getHost().equalsIgnoreCase("localhost");
            c = (HttpURLConnection) (local ? u.openConnection(java.net.Proxy.NO_PROXY) : u.openConnection());
            c.setRequestMethod(method);
            c.setInstanceFollowRedirects(followRedirects);
            if (timeout > 0) { c.setConnectTimeout(timeout); c.setReadTimeout(timeout); }
            if (headers != null) for (Map.Entry<String, String> e : headers.entrySet())
                c.setRequestProperty(e.getKey(), e.getValue());
            boolean hasBody = content != null && !content.isEmpty() && bodyMethod;
            if (hasBody) {
                c.setDoOutput(true);
                byte[] body = content.getBytes("UTF-8");
                try (OutputStream os = c.getOutputStream()) { os.write(body); }
            }
            int status = c.getResponseCode();
            InputStream is = status >= 400 ? c.getErrorStream() : c.getInputStream();
            String body = is == null ? "" : readAll(is);
            listener.handleHttpResponse(makeResponse(status, body));
        } catch (Throwable ex) {
            try { listener.failed(ex); } catch (Throwable ignored) {}
        } finally {
            if (c != null) c.disconnect();
        }
    }

    /** Build a com.badlogic.gdx.l$b (HttpResponse) proxy: a()=body, b()=HttpStatus(code). */
    private com.badlogic.gdx.l.b makeResponse(int status, String body) throws Exception {
        final Object httpStatus = STATUS_CTOR.newInstance(status);
        return (com.badlogic.gdx.l.b) java.lang.reflect.Proxy.newProxyInstance(RESP_IFACE.getClassLoader(), new Class<?>[]{RESP_IFACE},
            (proxy, m, args) -> {
                switch (m.getName()) {
                    case "a": return body;        // getResultAsString
                    case "b": return httpStatus;  // getStatus
                    case "toString": return "DsHttpResponse(" + status + ")";
                    case "hashCode": return System.identityHashCode(proxy);
                    case "equals": return proxy == (args != null ? args[0] : null);
                    default: return null;
                }
            });
    }

    private static String readAll(InputStream is) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buf = new byte[8192]; int n;
        while ((n = is.read(buf)) != -1) bos.write(buf, 0, n);
        return bos.toString("UTF-8");
    }

    private static String safe(String s, String dflt) { return s == null || s.isEmpty() ? dflt : s; }
}
