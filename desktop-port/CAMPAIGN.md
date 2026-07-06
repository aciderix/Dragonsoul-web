# Campagne (post‑tuto) — structure, état du pilote, faisabilité, TODO

> Source de vérité : `normalCampaign.tab` + classes du jeu (`CampaignStats`). Après l'INTRO
> (qui ne guide que 1‑1), la campagne se joue **normalement**, sans flèche de tuto.

## Structure (normal)
- **29 chapitres** (`0-` … `28-`).
- **Chapitre 1 = chapitre 0** (0‑indexé) = **19 niveaux** (`0-0` … `0-18`, affichés **1‑1 …
  1‑19**). Nombre de niveaux par chapitre : `CampaignStats.getNumLevels(NORMAL, ch)`.
- Chaque niveau = 3 vagues, coût **6 stamina**, récompense or + items (loot de campagne =
  **items**, pas des héros ; les héros se débloquent via soulstones/coffres).

## État vérifié (2026‑07‑06)
- Nouveau joueur canonique (Dragon Lady + Unstable Understudy + Centaure du coffre).
- **1‑1 gagné** en pilotage `autotut` **hands‑off** (`campaignLevels=1`, gold 422).
- **1‑2 gagné** (équipe de 3, toutes en pleine vie), `campaignLevels=2`, gold 914.
- ⇒ **Le port peut jouer la campagne** ; l'équipe canonique encaisse les premiers niveaux.

## Frictions pour compléter le chapitre 1 (les 19 niveaux)
1. **Pas de guidage après 1‑1** — l'INTRO s'arrête (step 72 en ouvrant 1‑2). Les 18 niveaux
   suivants n'ont **aucun pointeur de tuto** → `autotut` ne sait pas naviguer. Il faut un
   **navigateur de campagne** (voir TODO).
2. **Fast‑forward verrouillé jusqu'au Team Level 30** (`FFButtonState.TL_UPSELL` ; tooltip
   « Fast Forward unlocks at Team Level 30 »). ⇒ combats en **1x**, lents (surtout en GL
   logiciel). 19 combats = grind long (~1 h+).
3. **Montée en difficulté** — boss plus coriaces (dragons) ⇒ probable besoin de **renforcer
   l'équipe** (niveaux via XP de combat, soulstones, équipement), ce que le jeu attend.

## ✅ Navigateur `autocampaign` + combatStep — implémentés & validés (2026‑07‑06)
- **Quirk combatStep réglé** : le vrai bouton d'avancement de vague est **`nextStageButton`**
  (pas `tapToContinueLabel`, qui n'existe que pendant le tuto). Gate `!isDisabled()` pour ne
  taper qu'entre les vagues et **caster** pendant (portraits `ATTACK_SCREEN_HERO_BUTTON<i>`).
  FF ignoré si verrouillé (`FFButtonState != AVAILABLE`).
- **`autocampaign [P]|off`** : dispatch par écran, **par les acteurs du jeu** (zéro pixel) —
  `CampaignChooserScreen` → nœud du **niveau non‑complété le plus bas** (via `CampaignMapView.
  nodes`, champs `level`/`starsEarned` de `MapNode`) ; `CampaignBattleInfoScreen` →
  `CAMPAIGN_BATTLE_INFO_CONTINUE` ; `HeroChooserScreen` → `HERO_CHOOSER_FIGHT_BUTTON` ;
  combat → `combatStep` ; victoire → `VICTORY_CONTINUE_BUTTON`.
- **Détection de mur** : si aucun progrès pendant ~150 ticks (bloqué sur l'écran de défaite),
  `autocampaign` s'arrête et loggue le mur.
- **Validé** : `autocampaign` a gagné **1‑1, 1‑2, 1‑3** en auto (gold 2285), ciblé 1‑4.

## 🧱 MUR confirmé à 1‑4 (boss Dragon)
L'équipe canonique de départ (Dragon Lady + Unstable Understudy + Centaure, niveaux bas)
**perd 1‑4** — écran **Defeat** avec les conseils **du jeu** : « **Evolve Your Heroes**
(Soulstones) » / « **Equip More Gear** ». C'est un **gate de progression voulu** : le jeu
attend qu'on **renforce l'équipe** avant 1‑4.

## Verdict (mis à jour)
- **Automatisation** : ✅ le navigateur + le combat auto marchent (1‑1→1‑3 gagnés seuls).
- **Compléter le chapitre 1 avec l'équipe de départ** : ❌ **impossible tel quel** — mur dur à
  **1‑4** (boss Dragon). Il faut du **team‑building** (évoluer/équiper/monter de niveau via
  soulstones/gear/XP), exactement ce que le jeu demande. C'est donc faisable **après** avoir
  automatisé (ou fait manuellement) le renforcement d'équipe — pas avant.

## TODO
- [x] **Navigateur de campagne** (`autocampaign`) — fait & validé (voir ci‑dessus).
- [x] **Quirk `combatStep`** — réglé (`nextStageButton` au lieu de `tapToContinueLabel`).
- [x] FF gaté TL30 → `combatStep` ne clique FF que si `FFButtonState==AVAILABLE`.
- [ ] **Renfort d'équipe automatisable** (pour passer 1‑4) : évoluer/équiper/monter les héros
      via **les mécaniques du jeu** (soulstones, gear, XP), jamais de valeurs inventées.
      C'est le **prérequis** pour compléter le chapitre 1.
- [ ] **Dismiss propre de l'écran de défaite** (`UI$defeat_tips`, pas de nom de tuto sur son
      « Continue ») — pour l'instant on **détecte le mur et on s'arrête** (150 ticks).
- [ ] **Scroll de carte** pour les niveaux plus loin (1‑10+) hors écran : le tap du nœud est
      clampé à l'écran s'il est hors‑vue → il faudra scroller la `CampaignMapView` d'abord.
