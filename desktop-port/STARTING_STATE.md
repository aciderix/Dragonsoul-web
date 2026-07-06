# État de départ d'un vrai joueur — vérité de gameplay & bug de notre seed

> **Source de vérité** : observation d'une **vidéo des 30 premières minutes** du vrai jeu
> (2026‑07‑06). À croiser/confirmer avec le bytecode (voir §« Étude bytecode »). Nos valeurs
> (PRINCIPLES.md) : le JEU est la source de vérité, **jamais** de valeurs inventées.

## 1. Ce que fait un VRAI joueur (vidéo)

### Roster de départ
- Le joueur commence avec **Dragon Lady** et **Unstable Understudy** *avant* de débloquer
  le **Centaure** (« Centaur of Attention »), obtenu via le coffre du tuto.
- **Electroyeti** se débloque **en avançant dans le chapitre 1** (comme le Centaure vient
  de sa scène). ⇒ l'équipe se **construit au fil du chapitre 1**, elle n'est pas figée.

### Ressources de départ (≠ ce qu'on seed !)
| Ressource | Vrai jeu | Notre seed (FAUX) |
|---|---|---|
| Or | **0** | 100000 |
| Diamants | **0** | 500 |
| Énergie (stamina) | **60 / 60** | 120 / 60 |
- La **limite** de stamina **augmente** avec « x truc à étudier » (progression — au moins le
  **niveau de compte** : on a observé max 60→62 à la montée niv. 1→2 ; à confirmer si un
  bâtiment/recherche l'augmente aussi).

### Déroulé du tuto
- Le joueur **avance le tuto sans problème** et **termine TOUS les combats du chapitre 1**.
- Ensuite la **flèche jaune** l'oriente vers le **chapitre 2**.
- ⇒ Avec la **bonne équipe** (Dragon Lady + Unstable Understudy + Centaure, puis Electroyeti),
  le **1‑4 (boss dragon) est battable**. Notre défaite en 1‑4 vient d'une **équipe
  incomplète** (Centaure seul), **pas** d'un mur de difficulté légitime.

### Amélioration des héros
- Au fur et à mesure qu'il **loot de l'équipement**, le joueur **améliore ses héros** :
  flèche en **haut à droite** (tiroir de nav) → bouton **Héros**.

### Affordance UI
- Un **petit point rouge** sur un bouton = **une action est disponible** là (héros à
  équiper/évoluer, récompense à réclamer, etc.). Utile pour piloter « proprement » sans
  deviner : suivre les points rouges = suivre ce que le jeu propose.

## 2. Notre BUG — le seed `ds.tutStep=41` est une rustine qui hallucine l'état

Pour gagner du temps en dev on saute au coffre via `-Dds.tutStep=41` **et** on seed des
ressources dans `DsUserState` (`newPlayer` : 100000 or / 500 diamants / 120 stamina, +
`grantHeroes`). Conséquences, **contraires à nos valeurs** :

1. **Héros de départ perdus** : sauter l'intro du tuto shunte l'octroi de **Dragon Lady** et
   **Unstable Understudy** → équipe incomplète dès le départ → **faux mur en 1‑4**.
2. **Ressources inventées** : 100000/500/120 ne viennent **pas du jeu** — pure hallucination.
   Le vrai départ est **0 / 0 / 60**.
3. Donc toute notre « save » de dev repose sur un état **non canonique**.

## 3. Résolution propre (direction — respecter PRINCIPLES)

Le client est **autoritatif‑local** : pour un **vrai nouveau joueur**, le jeu initialise
lui‑même ressources + héros + tuto. La voie propre :

- **Ne PAS seed** un état post‑tuto ni des ressources. Pour `firstBoot`, envoyer un
  `BootData` **minimal/neuf** et **laisser la logique du jeu jouer le tuto depuis le début
  (step 0)** → le jeu accorde Dragon Lady + Unstable Understudy, met 0/0/60, puis le Centaure
  au coffre, Electroyeti en avançant, etc. — **zéro valeur inventée**.
- Garder un **raccourci dev optionnel** SÉPARÉ et honnête (ex. rejouer depuis une save réelle
  déjà avancée par le jeu), mais **jamais** en injectant des valeurs à la main.
- La persistance snapshot (déjà en place) capture ensuite l'état **réel** produit par le jeu.

## 4. Étude bytecode — FINDINGS (vérité du code, 2026‑07‑06)

### Carte des étapes de `IntroTutorialActV1` (nos `tutStep` correspondent EXACTEMENT)
- `S_INITAL = 0` → **combat d'intro** (steps 1‑17 : `S_INTRO_COMBAT_*`, PRE_WAIT/DIALOG/CAST_1‑4/WAIT/VFX)
- steps 18‑28 = `S_TEMP_COMBAT_*` (2ᵉ phase de combat scriptée)
- steps 29‑33 = `S_INTERLUDE_DIALOG_A..E` ; **`P_LAST_STEP_OF_INTERLUDE = 40`**
- **`S_OPEN_CHEST_SCREEN = 41`** ⇐ **notre `-Dds.tutStep=41` atterrit ici**, on shunte 0‑40.
- 42‑57 = coffres (or → Centaure à `S_CLOSE_CENTAUR=56`, argent, héros)
- 58‑70 = campagne 1‑1 (open/select/battle/victory) ; 71 remark ; **`S_DONE=72`**

### Les héros de départ ne sont PAS accordés côté client
- Dans le combat d'intro, Dragon Lady / Unstable Understudy / Electroyeti sont fabriqués par
  **`CombatSimHelper.createUnitData(UnitType, Rarity, level, …)`** → **unités de combat
  scriptées** (avec `setIsBoss`, `setHPMultiplier`), **pas** un ajout au roster réel.
- **Aucun** `User.addHero / unlockHero` dans le tuto d'intro. **Aucune** .tab « starter heroes ».
- ⇒ Le roster de départ (Dragon Lady + Unstable Understudy) venait de la **création de compte
  côté SERVEUR** (serveurs morts). **C'est à NOUS de le refléter** dans `DsUserState`
  (source de vérité : le camp joueur du combat d'intro **+** la vidéo).

### Ressources & cap de stamina = `teamlevelstats.tab` (niveau de compte)
Colonnes : `EXP_TO_NEXT_LEVEL  MAX_HERO_LEVEL  MAX_STAMINA  STAMINA_GAIN_ON_LEVEL  POOL_EXP_PER_STAMINA`
| Team level | MAX_STAMINA | STAMINA_GAIN_ON_LEVEL |
|---|---|---|
| 1 | **60** | 0 |
| 2 | 62 | 20 |
| 3 | 63 | 20 |
- ⇒ départ **60/60** (niveau 1) ; à la montée de niveau : **+20 stamina** et cap→62 (colle
  pile avec l'observé 95→115 et max 60→62). Le jeu **lit déjà** cette table (content‑sync).
- Or/diamants de départ = **0/0** (map `resources` vide par défaut, pas de table).

### Débloquer des héros = soulstones (progression), pas le loot d'items de campagne
- `normalCampaign.tab` : les héros apparaissent surtout comme **ennemis** (ex. `[boss]ELECTROYETI`
  en 0‑1 = notre 1‑2 !) ; le loot de campagne = **items** (PAPER_CROWN…), pas des héros.
- L'ajout au roster (Centaure au coffre, Electroyeti au fil du chap. 1) passe par les
  **soulstones/coffres** — mécanique séparée. Centaure = `ChestHelper` truqué (step 56).

### ⚠️ Risque ouvert (raison probable du saut à 41)
- [ ] **Le tuto joue‑t‑il correctement depuis step 0 dans NOTRE port ?** Le combat d'intro
      (1‑17) est un combat scripté ; à **tester** headless. C'était sans doute la raison du
      raccourci `tutStep=41`. À valider avant de fonder la résolution dessus.

## 6. Plan de résolution (proposé — respecter PRINCIPLES)

1. **`DsUserState.newPlayer` = état canonique** (miroir du serveur d'origine, zéro invention) :
   - ressources : `gold=0, diamonds=0, stamina=60`, **team level = 1** (stamina = MAX_STAMINA(1)
     lu via la classe de stats du jeu, pas en dur).
   - roster : **Dragon Lady + Unstable Understudy** en `HeroData` niveau 1 / rareté WHITE,
     construits via la **fabrique du jeu** (pas des stats à la main) ; laisser le jeu calculer
     la puissance depuis ses tables.
   - **tutorial acts vides** ⇒ le tuto démarre à **step 0** ; **retirer** le seed `tutStep=41`
     du chemin par défaut.
2. **Tester** que l'INTRO joue depuis step 0 (combat d'intro compris). Si un point bloque, le
   traiter proprement (shim fonctionnel), **sans** revenir à un état inventé.
3. Garder un raccourci dev **honnête & séparé** = **reprendre une save réelle** déjà avancée
   par le jeu (le snapshot existant), jamais l'injection de valeurs.
4. La persistance snapshot capture ensuite l'état **réel** produit par le jeu.

## 7. Principe : le serveur SOURCE tout depuis les classes/tables du jeu (validé)

**Idée** (validée en runtime le 2026‑07‑06) : le serveur tourne déjà avec le classpath du jeu
(`game-remapped.jar` + `apk-resources`), donc au lieu de **réécrire à la main** des données du
jeu (hallucination) ou de les figer en dur, il **appelle directement les classes de données du
jeu**, qui lisent les vrais `.tab`. Preuve : `TeamLevelStats.getMaxStamina(1)` renvoie **60**
(2→62, gain/level 20) depuis un JVM nu — identique à `teamlevelstats.tab`.

- **Fidélité parfaite, zéro transcription** : la classe EST la source de vérité (pas de copie
  qui dérive). Mieux que « extraire vers des fichiers ».
- **Fondation anti‑cheat** : le futur serveur autoritaire recalculera coûts/loot/combat avec
  **exactement** les mêmes tables/classes → toute valeur d'un client qui diverge = triche.
- **Règle** : partout où l'on met une valeur de jeu, préférer un appel à la classe du jeu
  (`TeamLevelStats`, `CampaignStats`, `ItemStats`, `StaminaStats`, `ChestHelper`, sim de
  combat…) plutôt qu'une constante.

### ⚠️ Honnêteté sur la portée — « tous les aspects sans exception » n'est PAS acquis d'office
La **méthode** peut couvrir *toutes* les données du jeu, mais l'état actuel ne couvre pas encore
tout. À distinguer :
- ✅ **Couvert maintenant** : état de départ = ressources (stamina via `TeamLevelStats`,
  or/diamants 0/0) + roster canonique (Dragon Lady + Unstable Understudy).
- ❓ **Non encore vérifié** (à lever, ne pas prétendre acquis) :
  - étoiles/rareté **exactes** des 2 héros de départ (on a supposé niv.1 / WHITE / 1★) ;
  - le tuto **joue‑t‑il depuis step 0** dans notre port (combat d'intro scripté) ;
  - autres champs que le serveur d'origine posait à la création (lineups d'autres modes,
    flags initiaux, VIP…) — on init les collections vides, à auditer.
- 🔭 **Futur (pas fait)** : combat/loot/progression sont **encore autoritatifs‑CLIENT** ; le
  serveur ne les **calcule** pas encore. Le miroir complet = **serveur autoritaire** (à venir).

### Garantir la complétude = AUDIT, pas une affirmation
Pour tendre vers « zéro invention » de façon **vérifiable** :
- [ ] Inventorier **chaque constante de jeu codée en dur** (serveur + launcher) et la remplacer
      par un appel à la classe/table du jeu.
- [ ] Lever les 3 points « non vérifiés » ci‑dessus (dont un test tuto step 0 réel).
- [ ] Tenir cette checklist à jour : la complétude se **prouve** point par point, elle ne se
      décrète pas.

## 5. Pilotage semi‑headless en DEV — ✅ base implémentée & validée

> **DEV uniquement**, jamais en prod (le vrai joueur pilote lui‑même). But : lire l'état
> réel du jeu **en mémoire** (pas de pixels) pour savoir quoi faire, et réduire captures/tours.

**Mécanisme (vérité du code)** : le tuto expose tout via `TutorialHelper` (statique, appelé
avec `RPGMain.getYourUser()`), sans lire l'écran :
- `getPointers(user)` → `TutorialPointerInfo` (`getPointAt()` = `UIComponentName`,
  `getActorTutorialName()` = nom d'acteur scene2d) — **la cible de la flèche jaune**.
- `isAnyPointerShowing()`, `isNarratorShowing(user)`, `getNarrators(user)` (texte).
- `autoProgressNarrator()` — **passe un dialogue** headless.
- `RPGMain.getScreenManager().getScreen()` → écran courant ; `BaseScreen.questPointers` →
  `TutorialPointer.getTarget()` → l'acteur réel (pour un clic aux coords, cf. next step).

**Commandes `DsDriver` ajoutées** (`tutinfo`, `narr`, `autonarr [P]|off`) — **testées** :
```
[tut] screen=TutorialAttackScreen INTRO(step=7)
[tut]   narrator@LOWER_LEFT: Call my Dragon Missile now!
[tut]   pointAt=ATTACK_SCREEN_HERO_BUTTON actor=ATTACK_SCREEN_HERO_BUTTON4
```
`autonarr` a fait défiler seul l'intro (step 2→4→6→7) sans capture ni tap. On connaît écran +
étape + texte + composant exact à cliquer.

**`taparrow` + `autotut` — ✅ implémentés & validés.** Bonne surprise : les **méthodes**
scene2d ne sont **pas** obfusquées (seulement les noms de classes), donc `Actor.getWidth/
getHeight/localToStageCoordinates/getStage/getTutorialName` sont appelables directement.
- `taparrow` : résout l'acteur cible via `BaseScreen.questPointers → getTarget()`, sinon
  **recherche sur tout le stage** (`RPGMain.getStage().i()` = root) par `getTutorialName()`
  (couvre les overlays modaux, ex. bouton fermer du reveal « New Hero »). Centre de l'acteur
  (stage) → pixels écran par **auto‑calibration** : on échantillonne les 2 coins écran via
  `Stage.a()` (screen→stage) et on inverse → gère l'échelle du viewport et le flip Y sans
  résolution en dur. `Vector2` (`…math.p`) : champs `b`=x, `c`=y.
- `autotut [P]|off` : chaque P frames, clique une flèche affichée sinon avance un dialogue.
- **Validé** : depuis un nouveau joueur canonique, `autotut` a piloté **step 0 → combat
  d'intro (4 casts) → coffre (Centaure, heroes=3) → fermeture overlay → menu héros → équip
  Couronne → campagne (step 59)**, entièrement hands‑off, zéro capture. Coords confirmées par
  l'avancée du step à chaque clic.

**Reste (mineur)** :
- [ ] auto‑clic **`>>` / vague suivante** en combat **non‑tuto** (ex. rejouer 1‑1 hors tuto) —
      le combat du tuto est déjà piloté par `taparrow`. Sur le modèle `autotap`.
- Bénéfice atteint : piloter le tuto entier avec ~2 commandes et zéro capture.
