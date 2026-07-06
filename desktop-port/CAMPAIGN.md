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

## Verdict
Compléter le chapitre 1 est **faisable** (rien de cassé, équipe gagne les premiers niveaux),
mais **pas une vérif rapide** : c'est un vrai run nécessitant (a) le navigateur de campagne,
(b) du temps (1x), (c) peut‑être du team‑building aux murs.

## TODO
- [ ] **Navigateur de campagne** (`autocampaign`) : sur `CampaignChooserScreen` → taper le
      prochain niveau dispo (résoudre le nœud par nom/`CampaignMapView`), puis
      `CampaignBattleInfoScreen` → continue, `HeroChooser` → Fight, laisser `combatStep`
      gérer le combat, écran de victoire → continue, boucler. **Sans pixels** (par noms
      d'acteurs), comme le reste du pilote.
- [ ] **Quirk `combatStep` post‑tuto** : il pilote le combat **pendant** le tuto (1‑1) mais
      n'a pas déclenché seul sur **1‑2** (pilotage manuel a marché). À diagnostiquer (autotut
      actif ? détection `AttackScreen` au bon tick ? label `tapToContinueLabel` visible ?).
- [ ] **Renfort d'équipe automatisable** si mur : évoluer/monter les héros, invoquer via
      soulstones — en réutilisant les mécaniques du jeu (jamais de valeurs inventées).
- [ ] (fait) FF gaté TL30 → `combatStep` ne clique FF que si `FFButtonState==AVAILABLE`.
