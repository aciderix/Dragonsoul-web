package dsbackend;

/**
 * Desktop Graphics backend (com.badlogic.gdx.f). Reports the GLFW window size and
 * hands out the GL20 backend; timing fields are updated each frame by the
 * launcher. Object-returning queries (display modes, monitors, cursors) return
 * null/empty defaults — refined only if the game actually dereferences them.
 *
 * Density defaults to 2.0 (XHDPI) to match the assets shipped in the APK
 * (ETC/XHDPI/...), which drives the game's asset-resolution selection.
 */
public final class DsGraphics implements com.badlogic.gdx.f {
    public volatile int width, height;
    public volatile float deltaTime;
    public volatile long frameId;
    public volatile int fps;
    private float density = 2.0f;
    private final com.badlogic.gdx.graphics.f gl20;

    public DsGraphics(com.badlogic.gdx.graphics.f gl20, int width, int height) {
        this.gl20 = gl20; this.width = width; this.height = height;
    }

    public int getWidth() { return width; }
    public int getHeight() { return height; }
    public int getBackBufferWidth() { return width; }
    public int getBackBufferHeight() { return height; }
    public float getDeltaTime() { return deltaTime; }
    public float getRawDeltaTime() { return deltaTime; }
    public long getFrameId() { return frameId; }
    public int getFramesPerSecond() { return fps; }
    public float getDensity() { return density; }
    public float getTargetDensity() { return density; }
    public float getPpiX() { return 96f; }
    public float getPpiY() { return 96f; }
    public float getPpcX() { return 96f / 2.54f; }
    public float getPpcY() { return 96f / 2.54f; }
    public int getType$4df6916e() { return 0; }

    public com.badlogic.gdx.graphics.f getGL20() { return gl20; }
    public com.badlogic.gdx.graphics.g getGL30() { return null; }
    public boolean isGL30Available() { return false; }
    public com.badlogic.gdx.graphics.glutils.g getGLVersion() { return null; }

    // DisplayMode (f$b) has a protected (w,h,refreshRate,bpp) constructor; build
    // a real one reflectively so the game can read its width/height (fields a/b).
    // The game dereferences this in scene2d Drawable.initScaling() on the Android
    // path, so returning null here NPEs the whole UI.
    private com.badlogic.gdx.f.b displayMode() {
        try {
            java.lang.reflect.Constructor<com.badlogic.gdx.f.b> c =
                com.badlogic.gdx.f.b.class.getDeclaredConstructor(int.class, int.class, int.class, int.class);
            c.setAccessible(true);
            return c.newInstance(width, height, 60, 32);
        } catch (Exception e) { throw new RuntimeException("cannot build DisplayMode", e); }
    }

    public com.badlogic.gdx.f.a getBufferFormat() { return null; }
    public com.badlogic.gdx.f.b getDisplayMode() { return displayMode(); }
    public com.badlogic.gdx.f.b getDisplayMode(com.badlogic.gdx.f.d monitor) { return displayMode(); }
    public com.badlogic.gdx.f.b[] getDisplayModes() { return new com.badlogic.gdx.f.b[] { displayMode() }; }
    public com.badlogic.gdx.f.b[] getDisplayModes(com.badlogic.gdx.f.d monitor) { return new com.badlogic.gdx.f.b[] { displayMode() }; }
    public com.badlogic.gdx.f.d getMonitor() { return null; }
    public com.badlogic.gdx.f.d getPrimaryMonitor() { return null; }
    public com.badlogic.gdx.f.d[] getMonitors() { return new com.badlogic.gdx.f.d[0]; }

    public boolean isContinuousRendering() { return true; }
    public boolean isFullscreen() { return false; }
    public void requestRendering() { }
    public void setContinuousRendering(boolean b) { }
    public boolean setFullscreenMode(com.badlogic.gdx.f.b mode) { return false; }
    public boolean setWindowedMode(int w, int h) { return false; }
    public void setResizable(boolean b) { }
    public void setTitle(String title) { }
    public void setUndecorated(boolean b) { }
    public void setVSync(boolean b) { }
    public boolean supportsDisplayModeChange() { return false; }
    public boolean supportsExtension(String name) { return false; }

    public com.badlogic.gdx.b.a newCursor$56fd1508(com.badlogic.gdx.graphics.k pixmap, int x, int y) { return null; }
    public void setCursor$6c4d0c86(com.badlogic.gdx.b.a cursor) { }
    public void setSystemCursor$48a93f7f(int type) { }
}
