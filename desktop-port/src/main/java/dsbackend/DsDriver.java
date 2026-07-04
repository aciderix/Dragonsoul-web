package dsbackend;

import java.util.ArrayList;
import java.util.List;

/**
 * Scripted test driver: injects synthetic input and captures screenshots so the
 * game can be piloted headlessly (no physical display). Commands (one per line):
 *
 *   tap X Y            a touch down+up at pixel (X,Y)
 *   down X Y | up X Y  individual touch events
 *   move X Y           move / drag the pointer
 *   key NAME           press+release a key (ENTER, ESCAPE, A, SPACE, ...)
 *   text STRING        type characters (keyTyped)
 *   wait N             advance N frames
 *   screenshot [FILE]  capture the framebuffer (default build/shot.png)
 *   quit               stop the app
 *   # ...              comment
 */
public final class DsDriver {
    public interface Host { void screenshot(String file); void stop(); }

    private final DsInput input;
    private final Host host;
    private final List<String[]> cmds = new ArrayList<>();
    private int idx = 0;
    private long resumeAt = 0;
    private boolean done = false;

    public DsDriver(DsInput input, Host host, List<String> lines) {
        this.input = input; this.host = host;
        for (String line : lines) {
            String s = line.trim();
            if (s.isEmpty() || s.startsWith("#")) continue;
            cmds.add(s.split("\\s+", 2));
        }
    }

    public boolean isDone() { return done; }

    public void onFrame(long frame) {
        if (done) return;
        while (idx < cmds.size() && frame >= resumeAt) {
            String[] c = cmds.get(idx++);
            String op = c[0];
            String arg = c.length > 1 ? c[1] : "";
            switch (op) {
                case "tap": { int[] p = xy(arg); input.touchDown(p[0], p[1], 0); input.touchUp(p[0], p[1], 0); break; }
                case "down": { int[] p = xy(arg); input.touchDown(p[0], p[1], 0); break; }
                case "up": { int[] p = xy(arg); input.touchUp(p[0], p[1], 0); break; }
                case "move": { int[] p = xy(arg); input.moved(p[0], p[1]); break; }
                case "key": { int k = keyCode(arg.trim()); if (k >= 0) { input.keyDown(k); input.keyUp(k); } break; }
                case "text": for (int i = 0; i < arg.length(); i++) input.keyTyped(arg.charAt(i)); break;
                case "wait": resumeAt = frame + Long.parseLong(arg.trim()); return;
                case "screenshot": host.screenshot(arg.isEmpty() ? "build/shot.png" : arg.trim()); break;
                case "quit": done = true; host.stop(); return;
                default: System.out.println("[driver] unknown cmd: " + op);
            }
        }
        if (idx >= cmds.size()) done = true;
    }

    private static int[] xy(String arg) {
        String[] t = arg.trim().split("\\s+");
        return new int[] { Integer.parseInt(t[0]), Integer.parseInt(t[1]) };
    }

    /** Key name -> libGDX (Android) keycode. */
    private static int keyCode(String name) {
        if (name.length() == 1) {
            char c = Character.toUpperCase(name.charAt(0));
            if (c >= 'A' && c <= 'Z') return 29 + (c - 'A');
            if (c >= '0' && c <= '9') return 7 + (c - '0');
        }
        switch (name.toUpperCase()) {
            case "SPACE": return 62;
            case "ENTER": return 66;
            case "BACKSPACE": return 67;
            case "ESCAPE": case "ESC": case "BACK": return 131;
            case "TAB": return 61;
            case "LEFT": return 21;
            case "RIGHT": return 22;
            case "UP": return 19;
            case "DOWN": return 20;
            default: System.out.println("[driver] unknown key: " + name); return -1;
        }
    }
}
