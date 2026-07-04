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

    public com.badlogic.gdx.f.a getBufferFormat() { return null; }
    public com.badlogic.gdx.f.b getDisplayMode() { return null; }
    public com.badlogic.gdx.f.b getDisplayMode(com.badlogic.gdx.f.d monitor) { return null; }
    public com.badlogic.gdx.f.b[] getDisplayModes() { return new com.badlogic.gdx.f.b[0]; }
    public com.badlogic.gdx.f.b[] getDisplayModes(com.badlogic.gdx.f.d monitor) { return new com.badlogic.gdx.f.b[0]; }
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
