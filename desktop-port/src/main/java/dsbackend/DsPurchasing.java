package dsbackend;

import java.util.Collections;
import java.util.Set;

/**
 * Desktop stub for in-app purchasing (com.perblue.rpg.purchasing.IPurchasing):
 * no store on desktop. Boot-path methods are real no-ops; startPurchase is only
 * reachable from a buy action (not during boot). See SHIMS.md.
 */
public final class DsPurchasing implements com.perblue.rpg.purchasing.IPurchasing {
    public void initializePreNetwork() { }
    public void initializePurchasing(com.perblue.rpg.network.NetworkProvider np) { }
    public void setupGruntListeners() { }
    public boolean isSetup() { return false; }
    public Set<String> getInProcessPurchases() { return Collections.emptySet(); }
    public String getProductCost(String sku) { return ""; }
    public com.perblue.rpg.purchasing.IPurchasing.PurchaseErrorState startPurchase(String a, String b, String c) { return null; }
}
