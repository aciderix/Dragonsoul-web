import com.perblue.rpg.RPGMain;

/**
 * Launcher web DragonSoul — Phase 3.2
 * Point d'entrée TeaVM : compile vers JavaScript.
 *
 * Phase 3.1 : RPGMain instancié avec succès.
 * Phase 3.2 : Initialise le singleton Gdx (GdxInitializer) puis appelle game.create().
 *             Les méthodes JDK manquantes sont patchées via JdkFixer (ClassHolderTransformer).
 */
public class DragonSoulLauncher {
    public static void main(String[] args) {
        System.out.println("DragonSoul Web - Phase 3.2");

        // Initialise le singleton Gdx (WebApp, WebGraphics, WebAudio, WebGL20, etc.)
        GdxInitializer.init();
        System.out.println("Gdx singleton initialise");

        // Instancie RPGMain (sans modifier le code du jeu)
        WebDeviceInfo deviceInfo = new WebDeviceInfo();
        RPGMain game = new RPGMain(deviceInfo);
        System.out.println("RPGMain instancie");

        // Appel de game.create() — point de départ du rendu
        System.out.println("Appel de game.create()...");
        try {
            game.create();
            System.out.println("game.create() termine");
        } catch (Throwable t) {
            System.out.println("game.create() exception: " + t.getClass().getName());
            System.out.println("  Message: " + t.getMessage());
            // Phase 3.3 : trace complète pour diagnostiquer les erreurs de parsing .tab
            Throwable cause = t;
            while (cause != null) {
                System.out.println("  Cause: " + cause.getClass().getName() + ": " + cause.getMessage());
                StackTraceElement[] stack = cause.getStackTrace();
                if (stack != null) {
                    for (int i = 0; i < Math.min(stack.length, 8); i++) {
                        System.out.println("    at " + stack[i]);
                    }
                }
                cause = cause.getCause() == cause ? null : cause.getCause();
            }
        }
    }
}
