package dsbackend;

import java.io.File;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 * Desktop Application backend (com.badlogic.gdx.a). Logging goes to stdout/stderr,
 * postRunnable() queues onto the render thread (drained by the launcher), and the
 * accessors hand back the other backends.
 *
 * getType$2826c76() returns the ApplicationType discriminator. The value is set
 * from DesktopLauncher (TODO: confirm the Desktop constant against the game's
 * Android/Desktop branching; default keeps us out of Android-only code paths).
 */
public final class DsApplication implements com.badlogic.gdx.a {
    private final com.badlogic.gdx.f graphics;
    private final com.badlogic.gdx.g input;
    private final com.badlogic.gdx.d audio;
    private final com.badlogic.gdx.c_ listener;
    private final File prefsDir;
    private final ConcurrentLinkedQueue<Runnable> runnables = new ConcurrentLinkedQueue<>();
    public int applicationType = 1; // provisional

    public DsApplication(com.badlogic.gdx.c_ listener, com.badlogic.gdx.f graphics,
                         com.badlogic.gdx.g input, com.badlogic.gdx.d audio, File prefsDir) {
        this.listener = listener; this.graphics = graphics; this.input = input;
        this.audio = audio; this.prefsDir = prefsDir;
    }

    public com.badlogic.gdx.c_ getApplicationListener() { return listener; }
    public com.badlogic.gdx.f getGraphics() { return graphics; }
    public com.badlogic.gdx.g getInput() { return input; }
    public com.badlogic.gdx.d getAudio() { return audio; }
    public com.badlogic.gdx.utils.e getClipboard() { return null; }
    public com.badlogic.gdx.m getPreferences(String name) { return new DsPreferences(prefsDir, name); }
    public int getType$2826c76() { return applicationType; }

    public void log(String tag, String msg) { System.out.println("[" + tag + "] " + msg); }
    public void log(String tag, String msg, Throwable t) { System.out.println("[" + tag + "] " + msg); t.printStackTrace(System.out); }
    public void debug(String tag, String msg) { System.out.println("[DEBUG " + tag + "] " + msg); }
    public void error(String tag, String msg) { System.err.println("[ERROR " + tag + "] " + msg); }
    public void error(String tag, String msg, Throwable t) { System.err.println("[ERROR " + tag + "] " + msg); t.printStackTrace(System.err); }

    public void postRunnable(Runnable r) { runnables.add(r); }
    public void exit() { }
    public void addLifecycleListener(com.badlogic.gdx.k l) { }
    public void removeLifecycleListener(com.badlogic.gdx.k l) { }
    public void resetKeyboardSuggestions() { }
    public boolean supportsAndroidEditables() { return false; }

    /** Drain queued runnables on the render thread. */
    public void drainRunnables() {
        Runnable r;
        while ((r = runnables.poll()) != null) {
            try { r.run(); } catch (Throwable t) { t.printStackTrace(System.out); }
        }
    }
}
