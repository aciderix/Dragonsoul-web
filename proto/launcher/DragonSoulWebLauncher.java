import com.github.xpenatan.gdx.teavm.backends.web.WebApplication;
import com.github.xpenatan.gdx.teavm.backends.web.WebApplicationConfiguration;
import com.perblue.rpg.RPGMain;

/**
 * Web entry point for DragonSoul.
 * Replaces AndroidLauncher from the mobile version.
 * TeaVM compiles this class as the entry point → JavaScript.
 */
public class DragonSoulWebLauncher {
    public static void main(String[] args) {
        WebApplicationConfiguration config = new WebApplicationConfiguration();
        config.width = 0;  // 0 = fullscreen canvas
        config.height = 0;
        config.showDownloadLogs = true;
        
        // RPGMain extends Game (libGDX)
        // The Android version passes DeviceInfo - we pass null for now
        // RPGMain will need to handle null DeviceInfo gracefully
        RPGMain game = new RPGMain(null);
        new WebApplication(game, config);
    }
}
