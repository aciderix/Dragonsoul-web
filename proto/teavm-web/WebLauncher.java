import com.github.xpenatan.gdx.teavm.backends.web.WebApplication;
import com.github.xpenatan.gdx.teavm.backends.web.WebApplicationConfiguration;
import com.perblue.rpg.RPGMain;

/**
 * WebLauncher - Entry point for DragonSoul in browser.
 * Replaces AndroidLauncher. Uses original RPGMain AS-IS.
 */
public class WebLauncher {
    public static void main(String[] args) {
        WebApplicationConfiguration config = new WebApplicationConfiguration();
        config.width = 960;
        config.height = 540;
        config.showDownloadLogs = true;

        // Create DeviceInfo for web
        WebDeviceInfo deviceInfo = new WebDeviceInfo();
        
        // Create the ORIGINAL game instance - constructor takes DeviceInfo
        RPGMain game = new RPGMain(deviceInfo);
        
        new WebApplication(game, config);
    }
}
