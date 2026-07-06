# Tuto INTRO — déroulé complet (72 étapes)

Extrait du bytecode : `com.perblue.rpg.game.tutorial.IntroTutorialActV1`
(`getMaxStep()==72`, constantes `S_*` = numéros d'étape). Le client envoie
`ChangeTutorialStep1(step)` à chaque avancement ; certaines étapes attendent une
**réponse serveur** (marquées ⚑ ci-dessous) — c'est là que notre serveur doit
répondre pour que le tuto se termine.

## Phase 1 — Combat d'intro (client, scripté) — étapes 0–17
| # | étape | ce qu'il faut faire |
|---|---|---|
| 0 | S_INITAL | init |
| 1 | S_INTRO_COMBAT_PRE_WAIT_1 | attente |
| 2–5 | S_INTRO_COMBAT_DIALOG_1_A…D | tap pour dérouler l'intro |
| 6 | S_INTRO_COMBAT_WAIT_1 | attente |
| 7 | S_INTRO_COMBAT_CAST_1 | taper la capacité guidée #1 (Dragon Missile) |
| 8–13 | WAIT_2 / CAST_2, WAIT_3 / CAST_3, WAIT_4 / CAST_4 | les 3 autres capacités guidées |
| 14 | S_INTRO_COMBAT_WAIT_5 | attente |
| 15–16 | S_INTRO_COMBAT_DIALOG_2_A/B | dialogue de victoire |
| 17 | S_INTRO_COMBAT_VFX | effet (le portail vert) |

## Phase 2 — Combat « temp » : le twist (alliés contrôlés) — étapes 18–28
| # | étape | |
|---|---|---|
| 18 | S_TEMP_COMBAT_PRE_WAIT_1 | attente |
| 19 | S_TEMP_COMBAT_DIALOG_1_A | dialogue |
| 20 | S_TEMP_COMBAT_ENEMIES_ENTER | les alliés contrôlés arrivent |
| 21–26 | S_TEMP_COMBAT_DIALOG_1_B…G | dialogues |
| 27 | S_TEMP_COMBAT_WAIT_1 | attente |
| 28 | S_TEMP_COMBAT_DIALOG_2_A | « They're too much for us, run! » (défaite scriptée) |

## Phase 3 — Interlude au camp — étapes 29–40
| # | étape | |
|---|---|---|
| 29–33 | S_INTERLUDE_DIALOG_A…E | retour au camp, dialogues |
| 35–40 | S_TUT_DIALOG_1_A…F | dialogues (P_LAST_STEP_OF_INTERLUDE = 40) |

## Phase 4 — Ouverture des coffres — étapes 41–51
| # | étape | |
|---|---|---|
| 41 | S_OPEN_CHEST_SCREEN | ouvrir l'écran des coffres |
| 42 | S_OPEN_GOLD_CHEST_MENU | sélectionner le Gold Chest |
| 43 | **S_ROLL_GOLD_CHEST ⚑** | ouvrir le Gold Chest → **réponse serveur = récompense (le 1er héros)** |
| 44 | S_TAP_THROUGH_GOLD_CHEST | dérouler l'animation d'ouverture |
| 45–46 | S_TUT_DIALOG_2_A/B | dialogue |
| 47 | S_CLOSE_GOLD_CHEST_POPUP | fermer la popup |
| 48 | S_OPEN_SILVER_CHEST_MENU | sélectionner le Silver Chest |
| 49 | **S_ROLL_SILVER_CHEST ⚑** | ouvrir le Silver Chest → **réponse serveur** |
| 50 | S_TAP_THROUGH_SILVER_CHEST | dérouler |
| 51 | S_OPEN_MAIN_MENU | retour au menu principal |

## Phase 5 — Équiper le premier héros (le Centaure) — étapes 52–57
| # | étape | |
|---|---|---|
| 52 | S_OPEN_HERO_MENU | ouvrir le menu héros |
| 53 | S_SELECT_CENTAUR | sélectionner **CENTAUR_OF_ATTENTION** (1er héros) |
| 54 | S_TAP_EQUIPMENT_SLOT | taper un slot d'équipement |
| 55 | **S_TAP_EQUIP_BUTTON ⚑** | équiper → **réponse serveur (confirmation)** |
| 56 | S_CLOSE_CENTAUR | fermer la fiche |
| 57 | S_CLOSE_HERO_LIST | fermer la liste |

## Phase 6 — Premier niveau de campagne (vrai combat) — étapes 58–72
| # | étape | |
|---|---|---|
| 58 | S_OPEN_CAMPAIGN_SCREEN | ouvrir la campagne |
| 59 | S_OPEN_FIRST_LEVEL | sélectionner le niveau 1‑1 |
| 60 | S_CONTINUE_ON_COMBAT_INFO | écran d'info de combat |
| 61 | S_SELECT_HEROS | choisir l'équipe |
| 62 | **S_START_BATTLE ⚑** | lancer le combat 1‑1 → **combat serveur / résultat** |
| 63 | S_TUT_WAIT_FOR_STAGE_3 | attente |
| 64 | S_TUT_PRE_WAIT_1 | attente |
| 65–68 | S_TUT_DIALOG_3_A…D | dialogues |
| 69 | S_TUT_WAIT_FOR_COMBAT | attente fin de combat |
| 70 | S_CONTINUE_ON_VICTORY | victoire |
| 71 | S_TUT_CLOSING_REMARK | remarque finale |
| 72 | **S_DONE** | tuto terminé → pose `CAMPAIGN_UNLOCKED`, héros octroyés |

## Étapes qui bloquent sans serveur (⚑)
Le combat d'intro (0–28) est 100 % client (scripté). Le tuto se **fige** dès qu'une
étape attend une réponse serveur :
1. **43 S_ROLL_GOLD_CHEST** — ouverture Gold Chest (c'est là qu'on bloque actuellement).
2. **49 S_ROLL_SILVER_CHEST** — ouverture Silver Chest.
3. **55 S_TAP_EQUIP_BUTTON** — équipement.
4. **62 S_START_BATTLE** — combat de campagne 1‑1.

Message client observé côté serveur pour ces actions : `Action1` (+ `ChangeTutorialStep1`
par étape). Prochaine phase serveur : répondre à ces `Action1` (au minimum renvoyer la
récompense d'ouverture de coffre = le **Centaure**), puis équipement et combat 1‑1.

## Faits clés
- Le **premier héros** octroyé par le tuto est le **Centaure (CENTAUR_OF_ATTENTION)**.
- Le tuto se termine en jouant **le vrai niveau de campagne 1‑1** (pas juste le combat scripté).
- À `S_DONE`, `CAMPAIGN_UNLOCKED` est posé → la campagne devient accessible normalement.
- Méthodes scriptées de l'acte : `startCombat1()`, `startCombat2()`, `pushInterludeScreen()`,
  `pushStartScreen()`, `playDeathScene()`, `hasCentaurRigged()`, `hasCrownEquiped()`.

## ✅ STATUT (2026‑07‑06) — INTRO joué de bout en bout
Les blocages ci‑dessus sont **résolus** : le serveur répond au coffre
(`RequestChestAcknowledgement`→`ChestAcknowledgement`), et le nouveau joueur canonique a le
**roster de départ** (Dragon Lady + Unstable Understudy) + ressources **0 or / 0 diamants /
60 stamina** (cf. STARTING_STATE.md). Précision : les 2 héros de départ viennent de la
**création de compte** (serveur), le **Centaure** est le premier héros *octroyé par le tuto*
(coffre). Le pilote `autotut` (DsDriver) traverse **tout l'INTRO step 0 → 72 hands‑off** (1‑1
gagné inclus), seul le nœud 1‑1 à step 59 est résolu par nom (`CAMPAIGN_SCREEN_LEVEL_1`).

## Vue d'ensemble — le « tuto » n'est pas un bloc unique
`IntroTutorialActV1` (72 étapes) = l'**onboarding**, finit en ouvrant 1‑2. Ensuite ~27
**mini‑tutos de features** se déclenchent au déblocage, chacun avec son `getMaxStep()` :

| Acte | steps | Acte | steps | Acte | steps |
|---|---|---|---|---|---|
| **IntroTutorialActV1** | **72** | RuneShrineActV1 | 13 | PowerPointsActV1 | 9 |
| GuildWarActV1 | 12 | UnlockHeroActV1 | 12 | RunesActV1 | 9 |
| MysticClosetActV1 | 11 | TempleInvite/Yours | 9 | BossPitActV1 | 8 |
| Crafting/Enchanting/Evolving/CryptRaid/LegQuestStory | 7 | Arena/RuneFusion/DailyQuest | 6 | Achievements/Promote/PowerUse/MysticClosetV2 | 4 |
| LegQuestInfo/AutoFight/Equipping | 2 | IntroTutorialActV0 | 1 | Story/BossStory | ∞ (événements) |

→ **~250 étapes discrètes** au total (hors 2 actes « histoire » ouverts). Chaque mini‑tuto
guide une feature au déblocage (arène, craft, runes, boss pit, guilde…).
