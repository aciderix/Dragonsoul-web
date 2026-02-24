import com.perblue.rpg.util.DeviceInfo;
import com.perblue.rpg.network.messages.Platform;

/**
 * Web implementation of DeviceInfo.
 * Returns sensible defaults for browser environment.
 * This is one of only ~3 new files needed for the port.
 */
public class WebDeviceInfo implements DeviceInfo {
    public String getAdvertisingIdentifier() { return "web-player"; }
    public String getBuildTime() { return "2024-01-01"; }
    public String getCarrierName() { return "web"; }
    public String getDeviceID() { return "web-" + System.currentTimeMillis(); }
    public String getDisplayVersion() { return "1.0.0-web"; }
    public String getEmail() { return ""; }
    public int getFullVersion() { return 100; }
    public String getImei() { return ""; }
    public String getNetworkType() { return "wifi"; }
    public String getPackageName() { return "com.perblue.dragonsoul.web"; }
    public String getPhoneModel() { return "Web Browser"; }
    public String getPhoneName() { return "Browser"; }
    public Platform getPlatform() { return Platform.ANDROID; } // Use Android platform ID for server compat
    public String getReferalData() { return ""; }
    public String getReferralCode() { return ""; }
    public String getRegistrationID() { return ""; }
    public int getScreenSize() { return 960; }
    public String getSignature() { return ""; }
    public String getSystemDescription() { return "Web/TeaVM"; }
    public long getSystemTime() { return System.currentTimeMillis(); }
    public String getSystemVersion() { return "1.0"; }
    public int getSystemVolume() { return 100; }
    public String getUniqueIdentifier() { return "web-unique-id"; }
    public String getaPMacAddress() { return ""; }
    public String getaPSSID() { return ""; }
    public int getsDKVersion() { return 21; }
    public boolean isConnectedToCell() { return false; }
    public boolean isConnectedToWiFi() { return true; }
    public boolean isInitialized() { return true; }
    public boolean limitAdTracking() { return true; }
    public void setInitialized(boolean b) { }
}
