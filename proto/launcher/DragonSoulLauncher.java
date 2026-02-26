import com.perblue.rpg.RPGMain;

/**
 * Launcher web DragonSoul — Phase 3.6
 * Point d'entrée TeaVM : compile vers JavaScript.
 *
 * Phase 3.1 : RPGMain instancié avec succès.
 * Phase 3.2 : Initialise le singleton Gdx (GdxInitializer) puis appelle game.create().
 *             Les méthodes JDK manquantes sont patchées via JdkFixer (ClassHolderTransformer).
 * Phase 3.6 : renderFrame() exporté comme entry point explicite.
 *             Appelé par la boucle RAF du navigateur.
 */
public class DragonSoulLauncher {
    static RPGMain _game;

    public static void main(String[] args) {
        System.out.println("DragonSoul Web - Phase 3.6");

        GdxInitializer.init();
        System.out.println("Gdx singleton initialise");

        WebDeviceInfo deviceInfo = new WebDeviceInfo();
        RPGMain game = new RPGMain(deviceInfo);
        _game = game;
        System.out.println("RPGMain instancie");

        System.out.println("Appel de game.create()...");
        try {
            game.create();
            System.out.println("game.create() termine");
        } catch (Throwable t) {
            System.out.println("game.create() exception: " + t.getClass().getName());
            System.out.println("  Message: " + t.getMessage());
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

        // Premier frame : garantit que renderFrame() est dans le call graph TeaVM (pas DCE).
        // Le bridge JS remplace renderFrame() par une boucle RAF côté navigateur.
        renderFrame();
    }

    /** Called by the browser RAF render loop. */
    public static void renderFrame() {
        if (_game != null) {
            _game.render();
        }
    }
}
