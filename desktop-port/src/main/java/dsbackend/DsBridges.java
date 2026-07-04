package dsbackend;

import java.util.Collections;
import java.util.List;

/**
 * Desktop stubs for the platform service bridges the Android launcher normally
 * wires into RPGMain: social networks, analytics, support, screen recording,
 * offerwall. None apply on desktop; they report "not signed in / unavailable"
 * and no-op actions. Analytics/support could later forward to real services.
 * See SHIMS.md.
 */
public final class DsBridges {

    /** SocialNetworkManager: hands out a single not-signed-in network for all. */
    public static final class Social implements com.perblue.rpg.social.SocialNetworkManager {
        private final Net net = new Net();
        public com.perblue.rpg.social.ISocialNetwork getFacebook() { return net; }
        public com.perblue.rpg.social.ISocialNetwork getGameCenter() { return net; }
        public com.perblue.rpg.social.ISocialNetwork getGameCircle() { return net; }
        public com.perblue.rpg.social.ISocialNetwork getGooglePlus() { return net; }
    }

    /** ISocialNetwork: signed-out, no friends, actions no-op. */
    static final class Net implements com.perblue.rpg.social.ISocialNetwork {
        public boolean isSignedIn() { return false; }
        public com.perblue.rpg.network.messages.AuthType getAuthType() { return com.perblue.rpg.network.messages.AuthType.DEVICE; }
        public String getCachedID() { return ""; }
        public String getFriendDisplayName(String id) { return ""; }
        public List<String> getFriendIDs() { return Collections.emptyList(); }
        public void init() { }
        public void clearListeners() { }
        public void achievementUpdate(int a, String b) { }
        public void getProfileDrawable(String id, com.perblue.rpg.social.ISocialNetwork.ProfileDrawableCallback cb) { }
        public void inviteFriends(String s) { }
        public void requestUserInfo(com.perblue.rpg.social.ISocialNetwork.UserInfoCallback cb) { }
        public void showAchievements() { }
        public void showFriends() { }
        public void showHomePage() { }
        public void signIn(com.perblue.rpg.social.ISocialNetwork.SignInCallback cb) { }
        public void signOut(com.perblue.rpg.social.ISocialNetwork.SignOutCallback cb) { }
    }

    /** IAnalytics: log to stdout (real, non-destructive). */
    public static final class Analytics implements com.perblue.rpg.IAnalytics {
        public void eventOccurred(String e) { }
        public void onLogin(long id) { }
        public void trackEvent(String a, String b, String c) { }
        public void trackPurchase(String a, int b, double c, String d) { }
        public void trackScreen(String s) { }
    }

    /** ISupport (Zendesk): no-op on desktop. */
    public static final class Support implements com.perblue.rpg.ISupport {
        public void setZendeskUser(String u) { }
        public void showKnowledgebase() { }
        public void showZendeskMyTickets() { }
        public void showZendeskTicketCreation(String a, String b) { }
    }

    /** IScreenRecording: unavailable on desktop. */
    public static final class ScreenRecording implements com.perblue.rpg.IScreenRecording {
        public boolean isAvailable() { return false; }
        public void start(boolean b, Runnable r) { }
        public void stop() { }
    }

    /** ITapjoyOfferwall: no ads on desktop. */
    public static final class Tapjoy implements com.perblue.rpg.ITapjoyOfferwall {
        public void displayOfferwall() { }
        public void initOfferwall(String s) { }
    }
}
