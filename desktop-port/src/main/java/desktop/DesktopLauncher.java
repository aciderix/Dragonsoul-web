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
        boolean forceWorldAdditional = Boolean.getBoolean("DS_FORCE_WORLD_ADDITIONAL");

        String nativeLib = System.getProperty("DS_GDX_NATIVE");
        if (nativeLib != null && new File(nativeLib).exists()) {
            System.load(new File(nativeLib).getAbsolutePath());
            System.out.println("[launcher] loaded gdx native: " + nativeLib);
        }

        // --- GLFW window + GL context ---
        GLFWErrorCallback.createPrint(System.err).set();
        if (!glfwInit()) throw new IllegalStateException("glfwInit failed");
        glfwDefaultWindowHints();
        glfwWindowHint(GLFW_VISIBLE, Boolean.getBoolean("DS_VISIBLE") ? GLFW_TRUE : GLFW_FALSE);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 2);
        glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_COMPAT_PROFILE);
        long win = glfwCreateWindow(W, H, "DragonSoul (desktop)", NULL, NULL);
        if (win == NULL) throw new IllegalStateException("glfwCreateWindow failed");
        glfwMakeContextCurrent(win);
        glfwSwapInterval(Boolean.getBoolean("DS_VISIBLE") ? 1 : 0);
        GL.createCapabilities();
        System.out.println("[launcher] GL " + org.lwjgl.opengl.GL11.glGetString(org.lwjgl.opengl.GL11.GL_VERSION));

        // --- backends ---
        DsGL20 gl = new DsGL20();
        DsGraphics graphics = new DsGraphics(gl, W, H);
        DsInput input = new DsInput();
        GlfwInput glfwInput = new GlfwInput(win, input); // real keyboard/mouse/scroll -> InputProcessor
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
        game.setNativeAccess(new DsNative()); // platform bridge (orientation, IAP, notifications...)
        game.setSocialNetworkManager(new DsBridges.Social());
        game.setAnalytics(new DsBridges.Analytics());
        game.setSupportManager(new DsBridges.Support());
        game.setScreenRecording(new DsBridges.ScreenRecording());
        game.setTapjoyOfferwall(new DsBridges.Tapjoy());
        DsApplication app = new DsApplication(game, graphics, input, audio, runDir);
        // Report ApplicationType = Android (switchmap value a$a.a). The APK ships
        // only the Android/ETC1 texture set, so we must take the game's Android
        // asset path (ETC compression). Density (XHDPI) is then selected via
        // DeviceInfo.getFullVersion()'s density-tier digit — see DsDeviceInfo.
        try {
            java.lang.reflect.Field f = Class.forName("com.badlogic.gdx.a$a").getDeclaredField("a");
            f.setAccessible(true);
            app.applicationType = f.getInt(null);
            System.out.println("[launcher] ApplicationType (a$a.a=Android) = " + app.applicationType);
        } catch (Throwable t) { System.out.println("[launcher] WARN: could not read a$a.a: " + t); }
        com.badlogic.gdx.utils.b.a.a = app;       // Gdx.app
        System.out.println("[launcher] RPGMain instantiated");

        if (Boolean.getBoolean("DS_PROBE_PNG")) { probePixmap(files, "fonts/Klepto.png"); probeFont(files, "fonts/Klepto.fnt"); }
        String probeAtlas = System.getProperty("DS_PROBE_ATLAS");
        if (probeAtlas != null) {
            // Directly construct TextureAtlas (g2d.b) on the GL thread: reads the
            // .atlas and loads/uploads every .etc1 page synchronously, so any ETC1
            // failure the game's RPGAssetManager.taskFailed swallows surfaces here
            // with a full stack trace.
            try {
                System.out.println("[probe] loading atlas " + probeAtlas + " ...");
                com.badlogic.gdx.graphics.g2d.n atl =
                    new com.badlogic.gdx.graphics.g2d.n(files.b(probeAtlas));
                System.out.println("[probe] atlas(sync) OK, regions=" + atl.a().b);
                // Now the ASYNC path (how the game actually loads it): AssetManager
                // runs loadAsync on a background thread, loadSync on this thread.
                // AssetManager is com.badlogic.gdx.a.e — un-nameable in source ('a'
                // is both the Application interface and the package), so reflect.
                Class<?> amClass = Class.forName("com.badlogic.gdx.a.e");
                Object mgr = amClass.getDeclaredConstructor().newInstance();
                amClass.getMethod("load", String.class, Class.class)
                       .invoke(mgr, probeAtlas, com.badlogic.gdx.graphics.g2d.n.class);
                amClass.getMethod("finishLoading").invoke(mgr);
                Object loaded = amClass.getMethod("isLoaded", String.class).invoke(mgr, probeAtlas);
                System.out.println("[probe] atlas(async,string-key) isLoaded=" + loaded);
                // Reproduce the SkeletonDataLoader dependency path: queue via an
                // AssetDescriptor built from a resolved FileHandle, then check under
                // which key it lands (relative string vs absolute path()).
                Class<?> adClass = Class.forName("com.badlogic.gdx.a.a");
                com.badlogic.gdx.c.a fh = files.b(probeAtlas);
                System.out.println("[probe] resolved handle path() = " + fh.toString());
                Object desc = adClass.getConstructor(com.badlogic.gdx.c.a.class, Class.class)
                                     .newInstance(fh, com.badlogic.gdx.graphics.g2d.n.class);
                Object mgr2 = amClass.getDeclaredConstructor().newInstance();
                amClass.getMethod("load", adClass).invoke(mgr2, desc);
                amClass.getMethod("finishLoading").invoke(mgr2);
                Object byRel = amClass.getMethod("isLoaded", String.class).invoke(mgr2, probeAtlas);
                Object byAbs = amClass.getMethod("isLoaded", String.class).invoke(mgr2, fh.toString());
                System.out.println("[probe] via-FileHandle dep: isLoaded(relative)=" + byRel
                                   + " isLoaded(path())=" + byAbs);
            } catch (Throwable t) {
                System.out.println("[probe] atlas FAILED:");
                t.printStackTrace(System.out);
            }
        }
        String probeAudio = System.getProperty("DS_PROBE_AUDIO");
        if (probeAudio != null) {
            try {
                Object snd = audio.newSound(files.b(probeAudio));
                long id = ((com.badlogic.gdx.b.c) snd).play(1f);
                System.out.println("[probe] Sound " + probeAudio + " -> id=" + id + " alError=" + org.lwjgl.openal.AL10.alGetError());
                com.badlogic.gdx.b.b mus = audio.newMusic(files.b(probeAudio));
                mus.setLooping(true); mus.play();
                System.out.println("[probe] Music playing=" + mus.isPlaying() + " alError=" + org.lwjgl.openal.AL10.alGetError());
            } catch (Throwable t) { System.out.println("[probe] audio FAILED:"); t.printStackTrace(System.out); }
        }

        // Pre-seed the game's own prefs so the (dead-server) additional-content
        // download subsystem treats content as present/not-needed instead of
        // looping into the "Content Update Failed" dialog. Written before boot so
        // the AssetUpdater reads our values. Opt-in; documented in SHIMS.md.
        if (forceWorldAdditional) {
            DsPreferences p = new DsPreferences(runDir, "rpgPrefs");
            p.a("missingAdditionalWorld", false);
            p.a("shouldDownloadAdditionalWorld", false);
            p.a();
            System.out.println("[launcher] pre-seeded rpgPrefs (content complete)");
        }

        System.out.println("[launcher] calling game.create() ...");
        game.create();
        System.out.println("[launcher] game.create() returned");
        game.resize(W, H);
        if (forceWorldAdditional) {
            try { game.getAssetManager().setHasWorldAdditional(true); } catch (Throwable ignored) {}
        }

        // --- optional scripted test driver (DS_SCRIPT=path, or '-' for stdin) ---
        final boolean[] stopFlag = { false };
        DsDriver driver = null;
        String scriptPath = System.getProperty("DS_SCRIPT");
        if (scriptPath != null) {
            java.util.List<String> lines = "-".equals(scriptPath)
                ? new java.io.BufferedReader(new java.io.InputStreamReader(System.in)).lines().collect(java.util.stream.Collectors.toList())
                : java.nio.file.Files.readAllLines(java.nio.file.Paths.get(scriptPath));
            driver = new DsDriver(input, new DsDriver.Host() {
                public void screenshot(String file) { captureScreenshot(file, W, H); }
                public void stop() { stopFlag[0] = true; }
            }, lines);
            System.out.println("[launcher] driver loaded: " + scriptPath);
        }

        // --- render loop ---
        long frames = 0;
        double last = glfwGetTime();
        while (!glfwWindowShouldClose(win) && !stopFlag[0] && (maxFrames == 0 || frames < maxFrames)) {
            double now = glfwGetTime();
            graphics.deltaTime = (float) (now - last);
            graphics.frameId = frames;
            last = now;
            input.drain();                 // synthetic (CLI) input on the render thread
            audio.update();                // pump streaming music
            // The once-downloaded "world additional" content lived on the game's
            // now-dead servers (unrecoverable). Without it the boot check
            // (UIHelper.checkForRequiredWorldAdditional -> setShouldRestart) loops
            // forever. Tell the game — via its OWN public API — that the content is
            // present so boot proceeds; missing assets then degrade gracefully
            // (heroes without skins) instead of blocking. Opt-in, documented in SHIMS.md.
            if (forceWorldAdditional) {
                try { game.getAssetManager().setHasWorldAdditional(true); } catch (Throwable ignored) {}
            }
            if (driver != null) driver.onFrame(frames);
            app.drainRunnables();
            game.render();
            String shot = System.getProperty("DS_SCREENSHOT");
            if (shot != null && (frames == maxFrames - 1)) captureScreenshot(shot, W, H);
            glfwSwapBuffers(win);
            glfwPollEvents();
            frames++;
            if (driver != null && driver.isDone() && maxFrames == 0) break;
        }
        System.out.println("[launcher] ran " + frames + " frames, disposing");
        try { game.dispose(); } catch (Throwable t) { t.printStackTrace(System.out); }
        glfwDestroyWindow(win);
        glfwTerminate();
    }

    /** Capture the current framebuffer to a PNG (proof of visual output). */
    static void captureScreenshot(String path, int w, int h) {
        java.nio.ByteBuffer buf = org.lwjgl.BufferUtils.createByteBuffer(w * h * 4);
        org.lwjgl.opengl.GL11.glReadPixels(0, 0, w, h,
                org.lwjgl.opengl.GL11.GL_RGBA, org.lwjgl.opengl.GL11.GL_UNSIGNED_BYTE, buf);
        // flip vertically (GL origin is bottom-left)
        java.nio.ByteBuffer flip = org.lwjgl.BufferUtils.createByteBuffer(w * h * 4);
        for (int y = 0; y < h; y++) {
            int src = (h - 1 - y) * w * 4;
            for (int x = 0; x < w * 4; x++) flip.put(y * w * 4 + x, buf.get(src + x));
        }
        org.lwjgl.stb.STBImageWrite.stbi_write_png(path, w, h, 4, flip, w * 4);
        System.out.println("[launcher] screenshot -> " + path);
    }

    /** Diagnostic: load a PNG straight through the game's Pixmap to surface the
     *  real decode exception (which the AssetManager otherwise swallows). */
    static void probePixmap(com.badlogic.gdx.e files, String path) {
        try {
            com.badlogic.gdx.c.a fh = files.b(path); // internal()
            Object pixmap = Class.forName("com.badlogic.gdx.graphics.k")
                    .getConstructor(com.badlogic.gdx.c.a.class).newInstance(fh);
            System.out.println("[probe] Pixmap loaded OK: " + path + " -> " + pixmap);
        } catch (Throwable t) {
            System.out.println("[probe] Pixmap FAILED for " + path + ":");
            Throwable c = t;
            while (c != null) { System.out.println("   " + c); c = c.getCause(); }
        }
    }

    /** Diagnostic: load a BitmapFont (page texture + GL upload) to surface the
     *  real font-loading exception the AssetManager swallows in taskFailed. */
    static void probeFont(com.badlogic.gdx.e files, String path) {
        try {
            com.badlogic.gdx.c.a fh = files.b(path);
            Object font = Class.forName("com.badlogic.gdx.graphics.g2d.b")
                    .getConstructor(com.badlogic.gdx.c.a.class, boolean.class).newInstance(fh, false);
            System.out.println("[probe] BitmapFont loaded OK: " + path + " -> " + font);
        } catch (Throwable t) {
            System.out.println("[probe] BitmapFont FAILED for " + path + ":");
            Throwable c = (t instanceof java.lang.reflect.InvocationTargetException && t.getCause() != null) ? t.getCause() : t;
            for (int i = 0; c != null && i < 6; i++) {
                System.out.println("   " + c);
                for (StackTraceElement s : c.getStackTrace()) {
                    if (s.getClassName().startsWith("com.badlogic") || s.getClassName().startsWith("com.perblue")) {
                        System.out.println("      at " + s); break;
                    }
                }
                c = c.getCause();
            }
        }
    }
}
