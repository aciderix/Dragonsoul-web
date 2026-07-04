package dsbackend;

import java.util.Collections;
import java.util.List;

/**
 * Desktop implementation of the game's native bridge (com.perblue.rpg.INative):
 * orientation, notifications, permissions, IAP, network probes, etc. On desktop
 * these are mostly not applicable; the two that matter for debugging —
 * handleSilentException and systemLog — are wired to real output so nothing is
 * swallowed. See SHIMS.md.
 */
public final class DsNative implements com.perblue.rpg.INative {

    // orientation / window — not applicable on a fixed desktop window
    public void enablePortrait(boolean b) { }
    public void enableResizeForKeyboard(boolean b) { }
    public void setWakeLock(boolean b) { }

    // diagnostics — real output (don't swallow)
    public void systemLog(String msg) { System.out.println("[native] " + msg); }
    public void handleSilentException(Throwable t) { System.out.println("[native] silent exception:"); t.printStackTrace(System.out); }
    public void handleSilentException(Throwable t, com.perblue.rpg.util.ErrorReportCategory c) { handleSilentException(t); }
    public void handleSilentException(Throwable t, com.perblue.rpg.util.ErrorReportCategory c, String s) { handleSilentException(t); }

    // purchasing — none on desktop
    public com.perblue.rpg.purchasing.IPurchasing createPurchasingInterface() { return new DsPurchasing(); }

    // reflection-based code enumeration (skill registry) — not available this way
    public Class<?>[] getClasses(String pkg) { return new Class<?>[0]; }
    public java.util.zip.ZipFile getCodeFile() { return null; }

    // environment probes
    public long getTimeZoneOffset() { return java.util.TimeZone.getDefault().getRawOffset(); }
    public String getIMEType() { return ""; }
    public CharSequence getSystemDeprecationMessage() { return ""; }
    public CharSequence getSystemDeprecationDetailedMessage() { return ""; }
    public List<String> getAccountEmails(boolean b) { return Collections.emptyList(); }
    public boolean isNetworkConnected() { return true; }
    public boolean isHardwareKeyboardHidden() { return true; }
    public boolean hasAlwaysDeniedPermissions() { return false; }
    public boolean isAppInstalled(String p) { return false; }
    public boolean isAppInstalled(String p, int a, int b) { return false; }
    public boolean openApp(String p, boolean b) { return false; }
    public boolean shouldRestrictDataUsage() { return false; }
    public boolean showReviewPrompt() { return false; }

    // actions — no-op on desktop
    public void asyncUpdateAvailable(Runnable r) { }
    public void networkProviderInitialized() { }
    public void loadURL(String url) { }
    public void openReviewApp() { }
    public void openUpdateGame(String s) { }
    public void queueNotification(String a, long t, String b) { }
    public void removeQueuedNotification(String a) { }
    public void registerForPushNotifications() { }
    public void requestPermissions() { }
    public void restart(String s) { }
    public void scheduleNotifs() { }
    public void sendIssueEmail(String a, String b, String c, String d) { }
    public void showAccountManager() { }
    public void showNativeToast(String s, int i) { }
    public void showPermissionSettings() { }
}
