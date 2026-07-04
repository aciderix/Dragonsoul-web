package desktop;

/**
 * Entry point for the native desktop (LWJGL3) build of DragonSoul.
 *
 * This is a placeholder used to verify the toolchain (Gradle + LWJGL resolution
 * + compilation against the obfuscated game bytecode). The real launcher wiring
 * — Gdx singleton init, GLFW window, create()/render() loop — is filled in once
 * dependency resolution is confirmed working.
 */
public final class DesktopLauncher {
    public static void main(String[] args) {
        System.out.println("[DesktopLauncher] toolchain OK");
        System.out.println("[DesktopLauncher] LWJGL version: " + org.lwjgl.Version.getVersion());
    }
}
