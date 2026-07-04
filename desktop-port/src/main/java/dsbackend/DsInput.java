package dsbackend;

import java.util.Set;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Desktop Input backend (com.badlogic.gdx.g), fully functional.
 *
 * Obfuscated-method mapping recovered from AndroidInput:
 *   a()      getX                 b()      getY
 *   c()      isTouched            d()      getCurrentEventTime
 *   a(int)   isTouched(pointer)   b(int)   isButtonPressed(button)
 *   c(int)   isKeyPressed(keycode)
 *   a(j)     setInputProcessor    a(bool)/b(bool)  catch-key toggles (no-op)
 *
 * Real events are delivered by DesktopLauncher's GLFW callbacks (on the render
 * thread). Synthetic events can be queued from any thread via {@link #inject}
 * (used by the CLI driver) and are drained on the render thread each frame.
 * libGDX/Android button constants: LEFT=0, RIGHT=1, MIDDLE=2 (same as GLFW).
 */
public final class DsInput implements com.badlogic.gdx.g {
    private volatile com.badlogic.gdx.j processor;
    private volatile int mouseX, mouseY;
    private final boolean[] buttons = new boolean[8];
    private final Set<Integer> keys = ConcurrentHashMap.newKeySet();
    private volatile long eventTime;
    private final ConcurrentLinkedQueue<Runnable> injected = new ConcurrentLinkedQueue<>();

    // --- obfuscated Input interface ---
    public int a() { return mouseX; }                    // getX
    public int b() { return mouseY; }                    // getY
    public boolean c() { return anyButton(); }           // isTouched
    public long d() { return eventTime; }                // getCurrentEventTime
    public void a(com.badlogic.gdx.j p) { this.processor = p; }  // setInputProcessor
    public void a(boolean b) { }                         // setCatchBackKey (n/a)
    public void b(boolean b) { }                         // setCatchMenuKey (n/a)
    public boolean a(int pointer) { return pointer == 0 && anyButton(); }  // isTouched(pointer)
    public boolean b(int button) { return button >= 0 && button < buttons.length && buttons[button]; } // isButtonPressed
    public boolean c(int keycode) { return keys.contains(keycode); }       // isKeyPressed

    private boolean anyButton() { for (boolean b : buttons) if (b) return true; return false; }

    public com.badlogic.gdx.j getProcessor() { return processor; }

    // --- event delivery (call on the render thread) ---
    public void touchDown(int x, int y, int button) {
        mouseX = x; mouseY = y; eventTime = System.nanoTime();
        if (button >= 0 && button < buttons.length) buttons[button] = true;
        com.badlogic.gdx.j p = processor; if (p != null) p.touchDown(x, y, 0, button);
    }
    public void touchUp(int x, int y, int button) {
        mouseX = x; mouseY = y; eventTime = System.nanoTime();
        if (button >= 0 && button < buttons.length) buttons[button] = false;
        com.badlogic.gdx.j p = processor; if (p != null) p.touchUp(x, y, 0, button);
    }
    public void moved(int x, int y) {
        mouseX = x; mouseY = y; eventTime = System.nanoTime();
        com.badlogic.gdx.j p = processor; if (p == null) return;
        if (anyButton()) p.touchDragged(x, y, 0); else p.mouseMoved(x, y);
    }
    public void scrolled(int amount) {
        eventTime = System.nanoTime();
        com.badlogic.gdx.j p = processor; if (p != null) p.scrolled(amount);
    }
    public void keyDown(int keycode) {
        keys.add(keycode); eventTime = System.nanoTime();
        com.badlogic.gdx.j p = processor; if (p != null) p.keyDown(keycode);
    }
    public void keyUp(int keycode) {
        keys.remove(keycode); eventTime = System.nanoTime();
        com.badlogic.gdx.j p = processor; if (p != null) p.keyUp(keycode);
    }
    public void keyTyped(char c) {
        eventTime = System.nanoTime();
        com.badlogic.gdx.j p = processor; if (p != null) p.keyTyped(c);
    }

    // --- synthetic injection (CLI driver), drained on the render thread ---
    public void inject(Runnable r) { injected.add(r); }
    public void drain() { Runnable r; while ((r = injected.poll()) != null) { try { r.run(); } catch (Throwable t) { t.printStackTrace(); } } }

    /** Convenience: a full tap (down+up) at a point, as a queued injection. */
    public void tap(int x, int y) {
        inject(() -> { touchDown(x, y, 0); touchUp(x, y, 0); });
    }
}
