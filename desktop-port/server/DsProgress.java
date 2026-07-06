import java.util.*;

import com.perblue.rpg.network.messages.ChangeTutorialStep;
import com.perblue.rpg.network.messages.BuyChests;
import com.perblue.rpg.network.messages.CampaignAttack;
import com.perblue.rpg.network.messages.HeroLineupUpdate;
import com.perblue.rpg.network.messages.RewardDrop;
import com.perblue.rpg.network.messages.ResourceType;
import com.perblue.rpg.network.messages.UnitType;
import com.perblue.rpg.network.messages.HeroData;
import com.perblue.rpg.network.messages.HeroLineupType;
import com.perblue.rpg.network.messages.HeroLineup;
import com.perblue.rpg.network.messages.TutorialAct;
import com.perblue.rpg.network.messages.TutorialActType;
import com.perblue.rpg.network.messages.CampaignLevelStatus;
import com.perblue.rpg.network.messages.CampaignType;
import com.perblue.rpg.network.messages.ItemType;
import com.perblue.rpg.network.messages.Rarity;
import com.perblue.rpg.network.messages.UserExtra;
import com.perblue.rpg.game.data.item.ItemStats;
import com.perblue.rpg.game.tutorial.TutorialHelper;

/**
 * Applies the client's action/notification messages to the persisted player state, so
 * the server's stored UserExtra (gold/stamina/diamonds, heroes, campaign progress,
 * tutorial acts, lineups, items…) tracks the player as they play. The client is
 * authoritative-local (it computes rolls/combat and NOTIFIES us), so here we mirror the
 * meaningful, state-defining effects of each notification — reusing the game's own
 * enums/helpers (ItemStats, TutorialHelper) so values are the game's, not invented.
 *
 * Returns true from {@link #apply} when the state changed (so DsGame re-saves).
 */
final class DsProgress {

    /** @return true if {@code msg} mutated the state. */
    boolean apply(com.perblue.a.a.i msg, DsStore.State st) throws Exception {
        String name = msg.getFullName();
        UserExtra ux = st.userExtra;

        if (name.equals(ChangeTutorialStep.getFullName_Static())) {
            ChangeTutorialStep m = (ChangeTutorialStep) msg;
            if (m.type == null || m.step == null) return false;
            setTutorialStep(ux, m.type, m.step);
            log("tutorial " + m.type + " -> step " + m.step);
            return true;

        } else if (name.equals(BuyChests.getFullName_Static())) {
            BuyChests m = (BuyChests) msg;
            // Free tutorial rolls cost 0; a diamond roll deducts diamonds.
            if (m.cost != null && m.cost > 0) addResource(ux, ResourceType.DIAMONDS, -m.cost);
            if (m.rewardDrops != null) for (RewardDrop d : m.rewardDrops) applyDrop(ux, d);
            log("chest " + m.chestType + " -> " + (m.rewardDrops == null ? 0 : m.rewardDrops.size())
                    + " drops; heroes now " + ux.heroes.size());
            return true;

        } else if (name.equals(CampaignAttack.getFullName_Static())) {
            return applyCampaign(ux, (CampaignAttack) msg);

        } else if (name.equals(HeroLineupUpdate.getFullName_Static())) {
            HeroLineupUpdate m = (HeroLineupUpdate) msg;
            if (m.type == null || m.lineup == null) return false;
            ux.heroLineups.put(m.type, m.lineup);
            log("lineup " + m.type + " updated");
            return true;
        }
        return false;
    }

    // --- tutorial ---------------------------------------------------------------

    private void setTutorialStep(UserExtra ux, TutorialActType type, Integer step) throws Exception {
        for (TutorialAct a : ux.tutorialActs) {
            if (a.type == type) { a.step = step; return; }
        }
        TutorialAct a = new TutorialAct();
        a.type = type;
        a.step = step;
        a.version = TutorialHelper.getMaxVersion(type);
        ux.tutorialActs.add(a);
    }

    // --- chests / drops ---------------------------------------------------------

    private void applyDrop(UserExtra ux, RewardDrop d) throws Exception {
        if (d == null) return;
        if (Boolean.TRUE.equals(d.wasHeroDrop) && d.itemType != null) {
            UnitType u = ItemStats.getUnitType(d.itemType); // hero-item -> its UnitType
            if (u != null && !ux.heroes.containsKey(u)) {
                ux.heroes.put(u, newHero(u, ux.heroes.size() + 1));
            }
        } else if (d.resourceType != null) {
            addResource(ux, d.resourceType, d.quantity != null ? d.quantity : 1);
        } else if (d.itemType != null) {
            // inventory item (e.g. the tutorial's Paper Crown) or a hero soul stone
            int q = d.quantity != null ? d.quantity : 1;
            ux.items.merge(d.itemType, q, Integer::sum);
        }
    }

    private HeroData newHero(UnitType type, int heroNum) throws Exception {
        HeroData h = new HeroData();
        for (java.lang.reflect.Field f : HeroData.class.getFields()) {
            if (java.lang.reflect.Modifier.isStatic(f.getModifiers())) continue;
            if (Map.class.isAssignableFrom(f.getType())) f.set(h, new HashMap<>());
            else if (List.class.isAssignableFrom(f.getType())) f.set(h, new ArrayList<>());
        }
        h.type = type; h.level = 1; h.stars = 1; h.rarity = Rarity.WHITE;
        h.eXP = 0; h.heroNum = heroNum;
        h.isLegendary = Boolean.FALSE; h.isMercenary = Boolean.FALSE;
        return h;
    }

    // --- campaign ---------------------------------------------------------------

    private boolean applyCampaign(UserExtra ux, CampaignAttack m) throws Exception {
        if (m.campaignType == null || m.chapter == null || m.level == null) return false;
        Integer stars = (m.base != null) ? m.base.stars : null;
        if (stars == null || stars <= 0) return false; // a loss — no completion recorded
        CampaignLevelStatus st = findLevel(ux, m.campaignType, m.chapter, m.level);
        if (st == null) {
            st = new CampaignLevelStatus();
            st.campaignType = m.campaignType; st.chapter = m.chapter; st.level = m.level;
            st.totalWins = 0; st.winsAtCurrentStars = 0;
            ux.levelStatuses.add(st);
        }
        int prev = st.stars != null ? st.stars : 0;
        st.stars = Math.max(prev, Math.min(3, stars));
        st.totalWins = (st.totalWins != null ? st.totalWins : 0) + 1;
        st.winsAtCurrentStars = (st.stars == stars ? (st.winsAtCurrentStars != null ? st.winsAtCurrentStars : 0) : 0) + 1;
        st.lastWinTime = System.currentTimeMillis();
        if (m.lootEarned != null) for (RewardDrop d : m.lootEarned) applyDrop(ux, d);
        log("campaign " + m.campaignType + " " + m.chapter + "-" + m.level + " -> " + st.stars + "star");
        return true;
    }

    private CampaignLevelStatus findLevel(UserExtra ux, CampaignType t, int chapter, int level) {
        for (CampaignLevelStatus s : ux.levelStatuses) {
            if (s.campaignType == t && s.chapter != null && s.chapter == chapter
                    && s.level != null && s.level == level) return s;
        }
        return null;
    }

    // --- resources --------------------------------------------------------------

    private void addResource(UserExtra ux, ResourceType type, int delta) throws Exception {
        Integer cur = ux.resources.get(type);
        ux.resources.put(type, Math.max(0, (cur != null ? cur : 0) + delta));
    }

    private void log(String s) { System.out.println("[progress] " + s); }
}
