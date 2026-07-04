package desktop;

import java.io.File;

import org.lwjgl.glfw.GLFWErrorCallback;
import org.lwjgl.opengl.GL;
import static org.lwjgl.glfw.GLFW.*;
import static org.lwjgl.system.MemoryUtil.NULL;

import dsbackend.*;

/**
 * Native desktop launcher for DragonSoul.
 *
 * Wires a custom LWJGL3 backend into the obfuscated libGDX singleton
 * (com.badlogic.gdx.utils.b.a), instantiates the real RPGMain ApplicationListener
 * from the game bytecode, and drives its create()/render() lifecycle against a
 * GLFW window + OpenGL context.
 *
 * System properties:
 *   DS_ASSETS      dir with extracted APK assets (default build/assets)
 *   DS_RUNDIR      writable dir for prefs/external/local (default build/run)
 *   DS_GDX_NATIVE  path to libgdx64.so (Matrix4/BufferUtils JNI), optional
 *   DS_FRAMES      number of frames to run then exit (default 0 = until closed)
 *   DS_W / DS_H    window size (default 1280x720)
 */
public final class DesktopLauncher {

    public static void main(String[] args) throws Exception {
        String assets = System.getProperty("DS_ASSETS", "build/assets");
        File runDir = new File(System.getProperty("DS_RUNDIR", "build/run"));
        runDir.mkdirs();
        int W = Integer.getInteger("DS_W", 1280);
        int H = Integer.getInteger("DS_H", 720);
        int maxFrames = Integer.getInteger("DS_FRAMES", 0);

        String nativeLib = System.getProperty("DS_GDX_NATIVE");
        if (nativeLib != null && new File(nativeLib).exists()) {
            System.load(new File(nativeLib).getAbsolutePath());
            System.out.println("[launcher] loaded gdx native: " + nativeLib);
        }

        // --- GLFW window + GL context ---
        GLFWErrorCallback.createPrint(System.err).set();
        if (!glfwInit()) throw new IllegalStateException("glfwInit failed");
        glfwDefaultWindowHints();
        glfwWindowHint(GLFW_VISIBLE, GLFW_FALSE);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 2);
        glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_COMPAT_PROFILE);
        long win = glfwCreateWindow(W, H, "DragonSoul (desktop)", NULL, NULL);
        if (win == NULL) throw new IllegalStateException("glfwCreateWindow failed");
        glfwMakeContextCurrent(win);
        GL.createCapabilities();
        System.out.println("[launcher] GL " + org.lwjgl.opengl.GL11.glGetString(org.lwjgl.opengl.GL11.GL_VERSION));

        // --- backends ---
        DsGL20 gl = new DsGL20();
        DsGraphics graphics = new DsGraphics(gl, W, H);
        DsInput input = new DsInput();
        DsAudio audio = new DsAudio();
        DsFiles files = new DsFiles(assets,
                new File(runDir, "external").getPath(), new File(runDir, "local").getPath());

        // --- wire the obfuscated Gdx singleton (com.badlogic.gdx.utils.b.a) ---
        com.badlogic.gdx.utils.b.a.b = graphics;  // Gdx.graphics
        com.badlogic.gdx.utils.b.a.c = audio;     // Gdx.audio
        com.badlogic.gdx.utils.b.a.d = input;     // Gdx.input
        com.badlogic.gdx.utils.b.a.e = files;     // Gdx.files
        com.badlogic.gdx.utils.b.a.g = gl;        // Gdx.gl
        com.badlogic.gdx.utils.b.a.h = gl;        // Gdx.gl20
        System.out.println("[launcher] Gdx singleton wired");

        // --- the real game ---
        DsDeviceInfo device = new DsDeviceInfo();
        com.perblue.rpg.RPGMain game = new com.perblue.rpg.RPGMain(device);
        DsApplication app = new DsApplication(game, graphics, input, audio, runDir);
        com.badlogic.gdx.utils.b.a.a = app;       // Gdx.app
        System.out.println("[launcher] RPGMain instantiated");

        System.out.println("[launcher] calling game.create() ...");
        game.create();
        System.out.println("[launcher] game.create() returned");
        game.resize(W, H);

        // --- render loop ---
        long frames = 0;
        double last = glfwGetTime();
        while (!glfwWindowShouldClose(win) && (maxFrames == 0 || frames < maxFrames)) {
            double now = glfwGetTime();
            graphics.deltaTime = (float) (now - last);
            graphics.frameId = frames;
            last = now;
            app.drainRunnables();
            game.render();
            glfwSwapBuffers(win);
            glfwPollEvents();
            frames++;
        }
        System.out.println("[launcher] ran " + frames + " frames, disposing");
        try { game.dispose(); } catch (Throwable t) { t.printStackTrace(System.out); }
        glfwDestroyWindow(win);
        glfwTerminate();
    }
}
