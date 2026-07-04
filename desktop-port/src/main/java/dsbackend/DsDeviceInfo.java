package dsbackend;

/**
 * Stub DeviceInfo (com.perblue.rpg.util.DeviceInfo) — the platform bridge RPGMain
 * requires. Returns benign desktop defaults. Platform is reported as ANDROID for
 * maximum parity with the game's own logic/asset paths.
 */
public final class DsDeviceInfo implements com.perblue.rpg.util.DeviceInfo {
    private boolean initialized;

    public com.perblue.rpg.network.messages.Platform getPlatform() {
        return com.perblue.rpg.network.messages.Platform.ANDROID;
    }
    public long getSystemTime() { return System.currentTimeMillis(); }
    // The thousands digit of (fullVersion % 10000) encodes the Android asset
    // density tier (1=HDPI, 2=MDPI, 3=XHDPI) in RPGMain.getCurrentAssetDensity().
    // The APK ships only XHDPI assets, so this must land on tier 3.
    public int getFullVersion() { return 23000; }
    public int getScreenSize() { return 0; }
    public int getSystemVolume() { return 100; }
    public int getsDKVersion() { return 21; }

    public boolean isInitialized() { return initialized; }
    public void setInitialized(boolean b) { this.initialized = b; }
    public boolean isConnectedToWiFi() { return true; }
    public boolean isConnectedToCell() { return false; }
    public boolean limitAdTracking() { return false; }

    public String getDeviceID() { return "desktop-0001"; }
    public String getUniqueIdentifier() { return "desktop-0001"; }
    public String getPhoneModel() { return "Desktop"; }
    public String getPhoneName() { return "Desktop"; }
    public String getSystemVersion() { return "1.0"; }
    public String getSystemDescription() { return "DragonSoul Desktop (LWJGL3)"; }
    public String getDisplayVersion() { return "2.22.0"; }
    public String getBuildTime() { return "0"; }
    public String getPackageName() { return "com.perblue.dragonsoul"; }
    public String getCarrierName() { return ""; }
    public String getNetworkType() { return "wifi"; }
    public String getEmail() { return ""; }
    public String getImei() { return ""; }
    public String getSignature() { return ""; }
    public String getReferalData() { return ""; }
    public String getReferralCode() { return ""; }
    public String getRegistrationID() { return ""; }
    public String getAdvertisingIdentifier() { return ""; }
    public String getaPMacAddress() { return ""; }
    public String getaPSSID() { return ""; }
}
