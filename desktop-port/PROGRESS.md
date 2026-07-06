# DragonSoul → Desktop natif (LWJGL3) — Journal de progression

> **But** : faire tourner DragonSoul nativement sur Linux (puis Windows/Mac) en
> réutilisant le bytecode du jeu (libGDX obfusqué + `com.perblue.*`) et en
> remplaçant uniquement la couche plateforme Android par un backend LWJGL3 maison.
>
> Ce fichier est le point de reprise en cas de reset d'environnement. Lire
> d'abord la section **ÉTAT ACTUEL** puis **PROCHAINES ÉTAPES**.

## Principe

Le jeu est un `ApplicationListener` libGDX standard :
`com.perblue.rpg.RPGMain extends com.badlogic.gdx.b` (Game obfusqué)
`implements com.badlogic.gdx.c` (ApplicationListener obfusqué,
méthodes standard `create/render/resize/pause/resume/dispose`).

Le **moteur** libGDX complet (scene2d, SpriteBatch, Texture, Spine) est déjà dans
le bytecode et est indépendant de la plateforme. Seule la **couche plateforme**
(Application, Graphics, Input, Files, Audio, GL20) est obfusquée + Android. On
l'implémente en LWJGL3 et on renseigne le singleton `Gdx`.

## Carte d'obfuscation (vérifiée par javap)

| Standard libGDX | Obfusqué | Méthodes |
|---|---|---|
| `Application` | `com.badlogic.gdx.a` | — |
| `Game` (abstract) | `com.badlogic.gdx.b` | RPGMain l'étend |
| `ApplicationListener` | `com.badlogic.gdx.c` | create/render/resize/pause/resume/dispose (**noms préservés**) |
| `Audio` | `com.badlogic.gdx.d` | |
| `Files` | `com.badlogic.gdx.e` | méthodes obfusquées `a/b/c/d(String)` → FileHandle `com.badlogic.gdx.c.a` |
| `Graphics` | `com.badlogic.gdx.f` | getWidth/getHeight/getDeltaTime (préservés) |
| `Input` | `com.badlogic.gdx.g` | getX/getY/isTouched/isKeyPressed (préservés) |
| `InputProcessor` | `com.badlogic.gdx.j` | |
| `Preferences` | `com.badlogic.gdx.i` | |
| `Screen` | `com.badlogic.gdx.k` | |
| `GL20` | `com.badlogic.gdx.graphics.f` | glClear/glBindBuffer/... (**noms préservés**) |
| `Gdx` singleton | **`com.badlogic.gdx.utils.b.a`** ✅ CONFIRMÉ | voir champs ci-dessous |

### Singleton Gdx confirmé : `com.badlogic.gdx.utils.b.a` (champs statiques)

| Champ | Type obfusqué | = |
|---|---|---|
| `a` | `com.badlogic.gdx.a` | Gdx.app (Application) |
| `b` | `com.badlogic.gdx.f` | Gdx.graphics (Graphics) |
| `c` | `com.badlogic.gdx.d` | Gdx.audio (Audio) |
| `d` | `com.badlogic.gdx.g` | Gdx.input (Input) |
| `e` | `com.badlogic.gdx.e` | Gdx.files (Files) |
| `g`, `h` | `com.badlogic.gdx.graphics.f` | Gdx.gl / Gdx.gl20 (GL20) |
| `i` | `com.badlogic.gdx.graphics.g` | Gdx.gl30 (GL30) |

Init backend = assigner ces 8 champs statiques puis instancier RPGMain.

FileHandle = `com.badlogic.gdx.c.a` : **classe concrète java.io.File** (standard
libGDX, pas la variante Android) → marche presque telle quelle sur desktop.

Signatures complètes : `desktop-port/docs/obfuscated-interfaces.txt`.

Classes à méthodes natives **préservées** (`Matrix4`, `BufferUtils`) → les natifs
desktop standard de libGDX (`gdx-platform:natives-desktop`, `libgdx64.so`) se lient.

## Layout du projet

```
desktop-port/
├── build.gradle            # Gradle + LWJGL 3.3.4 + gdx-platform natives + classes{1,2}.jar
├── settings.gradle
├── PROGRESS.md             # ce fichier
├── src/main/java/
│   ├── desktop/DesktopLauncher.java   # main() : init Gdx, fenêtre GLFW, boucle
│   └── dsbackend/                     # backend LWJGL3 (impls des interfaces obfusquées)
└── (assets extraits de ../DragonSoul-Fixed2.apk au run, pas dupliqués)
```

Bytecode du jeu : `../classes1.jar` (RPGMain + base gdx) + `../classes2.jar`
(logique perblue). Déjà committés dans le repo. Assets : dans l'APK committé.

## Toolchain (vérifiée)

- JDK 21, Gradle 8.14.3, Maven — OK
- **Xvfb présent** → affichage virtuel pour tester le rendu headless
- Mesa libGL (llvmpipe) présent → contexte GL logiciel possible
- **Gradle résout LWJGL + gdx-platform via le proxy** — ✅ testé
- `gradle run` exécute le launcher, LWJGL 3.3.4 se charge — ✅ testé

## ÉTAT ACTUEL

- [x] Étape 0 : recon environnement (JDK/Gradle/Xvfb/Mesa/réseau)
- [x] Étape 1 : squelette Gradle + résolution LWJGL + compile contre le bytecode + run OK
- [x] Étape 2 : singleton Gdx localisé (`com.badlogic.gdx.utils.b.a`) + interfaces dumpées (docs/obfuscated-interfaces.txt)
- [x] Étape 2.5 : **rendu headless dé-risqué** — GLFW+OpenGL 4.5 (Mesa llvmpipe) sous Xvfb, frame OK
- [ ] Étape 3 : backend LWJGL3 — Files (java.io) + FileHandle
- [ ] Étape 4 : backend — Application + Graphics + fenêtre GLFW + contexte GL
- [ ] Étape 5 : backend — GL20 (75 méthodes) → org.lwjgl.opengl.GL20/GL30
- [ ] Étape 6 : backend — Input (GLFW callbacks) + Audio (OpenAL, stub au début)
- [ ] Étape 7 : init singleton Gdx, charger libgdx64.so, instancier RPGMain, driver create()/render()
- [ ] Étape 8 : extraire assets de l'APK, faire avancer le boot (atlas/Spine/fonts)
- [ ] Étape 9 : premier rendu sous Xvfb, itérer sur les stubs SDK tiers

## PROCHAINES ÉTAPES (reprise)

1. `javap` pour trouver la classe qui porte les champs statiques du singleton Gdx
   (chercher une classe avec champs de types `a`,`d`,`e`,`f`,`g` + GL).
2. `javap` complet des interfaces `a`,`d`,`e`,`f`,`g`,`graphics.f` → générer les
   impls dans `dsbackend/`.
3. Commit à chaque interface implémentée qui compile.

## Commandes utiles

```bash
cd desktop-port
gradle --no-daemon run                 # compile + lance le launcher
gradle --no-daemon compileJava         # compile seul
# run headless avec affichage virtuel (software GL Mesa) :
LIBGL_ALWAYS_SOFTWARE=1 GALLIUM_DRIVER=llvmpipe \
  xvfb-run -a -s "-screen 0 1280x720x24" gradle --no-daemon run
```

Classpath runtime résolu : `gradle -q printRuntimeClasspath`.
Rendu headless vérifié : GL 4.5 Compat / GLSL 4.50 / llvmpipe (voir GLSmokeTest).

---
## Mise à jour — backend LWJGL3 complet + remap ASM (compile OK)

### Obstacle majeur résolu : collisions nom-classe/nom-package
L'obfuscation crée 75 collisions où une classe `X` coexiste avec un package `X`
(légal en bytecode, **inexprimable en source Java**). Bloquant pour nous :
- `com.badlogic.gdx.b` (Game) vs package `b` (Cursor/Music/Sound `b.a/b.b/b.c`)
- `com.badlogic.gdx.c` (ApplicationListener) vs package `c` (FileHandle `c.a`)
- `com.badlogic.gdx.utils.b` (classe) vs package `utils.b` (**holder Gdx** `utils.b.a`)

**Solution** : `tools/RemapTool.java` (ASM) renomme ces 3 classes en `b_`/`c_`/
`utils.b_` dans TOUT le jeu (refs incluses, ex. RPGMain extends b→b_). Produit
`libs/game-remapped.jar`. Régénérer : `bash tools/remap.sh`. Source les nomme
ensuite : ApplicationListener = `com.badlogic.gdx.c_`, packages b/c/utils.b libres.

### Backend implémenté (dsbackend/) — compile contre game-remapped.jar
- `DsGL20` : 75 méthodes GL20 → LWJGL GL11/13/15/20/30
- `DsFiles` : mapping Files vérifié (b(String)=internal, a=classpath, c=external,
  d=local), FileHandle Absolute (lecture disque directe depuis assets extraits)
- `DsGraphics` : taille fenêtre + gl20, density=2.0 (XHDPI), défauts pour le reste
- `DsInput` : stocke le processor, pas d'événements (pas requis pour 1er rendu)
- `DsAudio` (+ Sound/Music no-op) : boot sans OpenAL
- `DsPreferences` : java.util.Properties sur disque
- `DsApplication` : logs stdout, postRunnable→file drainée par le launcher
- `DsDeviceInfo` : stub des 30 getters, Platform=ANDROID
- `desktop/DesktopLauncher` : GLFW+GL, wire singleton `com.badlogic.gdx.utils.b.a`
  (champs a=app,b=graphics,c=audio,d=input,e=files,g/h=gl20), new RPGMain(deviceInfo),
  create()/render() loop.

### État
- [x] Étape 3-7 : backend + launcher **compilent**
- [ ] Étape 8 : exécuter (extraire assets APK + libgdx64.so), déboguer create()

### Lancer
`bash run-desktop.sh` (extrait assets/natif, run sous Xvfb). Voir le script.

---
## Mise à jour — le jeu BOOTE : assets chargés, UI en construction

Progression runtime (create() de RPGMain s'exécute loin) :
1. ✅ Singleton Gdx câblé, RPGMain instancié, create() appelé
2. ✅ Ressources classpath (.tab/.properties) : extraites de l'APK (getResourceAsStream)
   → `run-desktop.sh` extrait tout sauf assets/res/lib/dex vers build/apk-resources
3. ✅ **Natif gdx = 1.9.3** (pas 1.9.11 !) : le jeu utilise l'API Gdx2DPixmap
   `setBlend(int)` (1 arg) → seul 1.9.3 matche, sinon SIGSEGV. Vérifié via source libGDX.
4. ✅ Densité + compression : `RPGMain.getCurrentAssetDensity` → XHDPI si getType==iOS,
   sinon switch sur `(getFullVersion()%10000)/1000` (1=HDPI,2=MDPI,3=XHDPI).
   L'APK ne fournit QUE ETC/XHDPI → getType=Android (a$a.a=1, chemin ETC) +
   getFullVersion=23000 (tier 3 = XHDPI). **boot.atlas se charge.**
5. ⏳ Blocage actuel : NPE dans scene2d initScaling via RPGSkin.getDrawable
   (LoadingScreen.createUI) — page de police manquante (fonts/*.fnt "deps" échouent).

### Décisions de version/plateforme (réelles, pas des shims)
- Natif libGDX **1.9.3** desktop (match ABI Gdx2DPixmap)
- ApplicationType=Android, Platform=ANDROID, densité XHDPI → assets ETC/XHDPI réels

---
## 🎉 RÉSULTAT FINAL — DragonSoul REND nativement sur Linux

`game.create()` réussit, la boucle de rendu tourne, et l'**écran-titre réel du jeu
« Fantasy Legend Studios » s'affiche** (capture : `docs/screenshot-splash.png`),
rendu sous Xvfb + Mesa llvmpipe depuis le bytecode obfusqué via le backend LWJGL3.

Chaîne complète validée : bytecode → backend LWJGL3 maison → GLFW+OpenGL →
RPGMain.create() → rendu de l'UI réelle.

Corrections finales du boot :
- `DsGraphics.getDisplayMode()` renvoie un vrai DisplayMode (null → NPE initScaling)
- `DsNative` (INative) + `DsPurchasing` (IPurchasing) : ponts natifs (orientation,
  notifications, IAP…) ; `handleSilentException`/`systemLog` réels
- L'AssetUpdater tente un serveur de contenu (127.0.0.1:8080) → échec non fatal
  (silent exception) ; brancher `Dragonsoul-server v2` (Python) pour aller plus loin

### Lancer / capturer
```bash
bash run-desktop.sh                              # headless, N frames puis dispose
# capture d'écran :
#   -DDS_SCREENSHOT=out.png  (déjà câblé dans le launcher, dernière frame)
```

### Restant pour la JOUABILITÉ (dettes, voir SHIMS.md)
- [ ] Input GLFW réel (clavier/souris → InputProcessor `com.badlogic.gdx.j`)
- [ ] Audio OpenAL réel (actuellement muet)
- [ ] Serveur local (contenu + jeu) : `Dragonsoul-server v2` du repo d'extraction
- [ ] Fonts CJK multi-pages (Chinese/Korean/Japanese) — non bloquant
- [ ] Remplacer `-Xverify:none` par recalcul stackmaps ASM (robustesse)

---
## 🖼️ Écran de chargement RÉEL affiché + diagnostic du blocage MainMenu

### Course async ui_main.atlas — RÉSOLUE
Le jeu franchissait le gate de contenu et atteignait `MainMenuScreen.createUI`, qui
plantait sur `Asset not loaded: ETC/XHDPI/world/ui/ui_main.atlas` — alors que
l'atlas ET ses 4 pages `.etc1` existent et se chargent parfaitement isolément.

**Cause racine** (validée par la sonde `DS_PROBE_ATLAS`) : libGDX indexe chaque
asset par la chaîne passée à `Gdx.files.internal(path)`. `SeletonDataLoader`
(loader Spine du jeu) met en file sa dépendance atlas via un
`AssetDescriptor(FileHandle)` → **clé = `FileHandle.path()`**, puis son `loadSync`
fait `get(param.atlasFile)` avec la **chaîne relative brute**. Sur Android les deux
coïncident (les handles internal gardent leur chemin relatif). Notre `DsFiles`
renvoyait des handles **absolus** → dépendance rangée sous la clé absolue,
`get(relatif)` la manque → « Asset not loaded » (avalé par `taskFailed`).

**Correctif** : `DsFiles` renvoie des handles **Classpath à chemin relatif** pour
les assets internal/classpath (`DsFileHandle` expose le ctor protégé
`FileHandle(String,type)`), et `run-desktop.sh` met la racine des assets sur le
classpath → les lectures passent par le classloader, `path()` reste relatif, les
clés matchent le jeu comme sur Android. External/local restent des handles absolus.

**Résultat** : le jeu affiche le **vrai écran de chargement DragonSoul** (art ETC1
des héros, logo, barre de progression, astuces) — `docs/screenshot-loading.png`.

### Blocage suivant : MainMenu attend `BootData` (→ serveur de login)
Instrumenté `DS_TRACE_SCREEN` : après chargement, `LoadingScreen` reste en état
`GAME` avec `start=MainMenuScreen/CREATING`, `totalProgress` figé à ~0.58.

Décompilation de la machine à états :
- `LoadingScreen.render` (GAME) : crée le start screen, puis attend
  `getStartScreen().getLoadState()==CREATED` pour transiter vers le home.
- `BaseScreen.create()` mettrait `CREATED` immédiatement (`isAsyncLoaded()==false`),
  **mais `MainMenuScreen.create()` force `loadState=CREATING`** après `super.create()`.
- `MainMenuScreen` ne passe `CREATED` **que dans `updateFromNetwork(msg)`** quand
  `msg instanceof BootData` → `refreshUserInfo()`, `RPGMain.bootDataHandled()`.

**Conclusion** : le home screen se termine à la réception d'un message **`BootData`**.
Le jeu est donc légitimement arrivé au point où il faut le **serveur de login**
(connexion TCP → `ClientInfo1` → réponse `BootData1`, cf. PROTOCOL.md). Prochaine
étape : implémenter ce serveur (puis multi-serveur, cf. SERVER_DESIGN.md).
Note backend : `Gdx.net` (champ `com.badlogic.gdx.utils.b.a.f`) n'est pas encore
câblé — à vérifier selon que le jeu utilise `Gdx.net` ou des sockets java bruts.

### Diagnostics ajoutés au launcher (tous opt-in)
- `DS_PROBE_ATLAS=<path>` : charge un atlas en sync + async + via AssetDescriptor,
  révèle les exceptions avalées et les collisions de clé.
- `DS_TRACE_SCREEN=true` : logge écran courant / LoadState / totalProgress / start screen.
- `DS_TRACE_FILES=true` : trace chaque résolution de fichier (OK/MISS/CP).

---
## 🏠 ÉCRAN D'ACCUEIL ATTEINT — le jeu est JOUABLE (login → BootData → home)

`docs/screenshot-home.png` : la **scène d'accueil complète** de DragonSoul rendue
nativement sous Linux — bâtiments animés (Temple, Trader, Campaign, Events, Fight
Pit, Boss Pit, Guilds, Coliseum, Chests, Enchanting, Ranking…) en skeletons Spine,
feu de camp/torches/chaudron en particules, HUD (monnaies, chat, avatar).

Chaîne complète validée de bout en bout :
1. Port natif LWJGL3 (bytecode obfusqué) → 2. gate de contenu (markers) →
3. écran de chargement (tous assets ETC1) → 4. **serveur de login** HTTP `/login` →
5. **protocole de jeu** `ClientInfo1` → `BootData1` (sérialisation via les classes
DU JEU) → 6. `MainMenuScreen.updateFromNetwork(BootData)` → `CREATED` → transition.

Dernier verrou levé (hors réseau) : `IncompatibleClassChangeError` sur
`DamageSource$DamageSourceType` (attribut InnerClasses incohérent, artefact
dex2jar). Corrigé par une passe ASM dans `RemapTool` qui **retire les attributs
InnerClasses des classes `com/perblue/*`** (sauf `IPurchasing`/`ISocialNetwork` dont
notre backend nomme les types imbriqués). Attribut purement réflexif → aucune
sémantique d'exécution changée.

### Reproductibilité (⚠️ container peut se réinitialiser)
`libs/` est gitignoré ; `libs/game-remapped.jar` est un **artefact** régénéré depuis
les `classes1.jar`/`classes2.jar` (committés) par **`bash build-remap.sh`**.
À exécuter une fois sur un checkout frais, avant `run-desktop.sh` / `run-server.sh`.

### Lancer le tout
```bash
cd desktop-port
bash build-remap.sh          # régénère libs/game-remapped.jar (une fois)
bash run-server.sh 8080 &    # serveur login + protocole de jeu (classes du jeu)
DS_SCREENSHOT=home.png DS_FRAMES=3000 bash run-desktop.sh   # le jeu → accueil
```

### Restant (vers plus de profondeur de jeu)
- `BootData` minimal (serverTime/firstBoot) suffit pour l'accueil ; compléter
  `userInfo`, héros, ressources… pour peupler le HUD et entrer en campagne.
- Multi-serveur (SERVER_DESIGN.md) : passerelle, découverte LAN/communauté, mot de passe.
- Persistance serveur (SQLite), messages suivants (ClockChange déjà reçu, etc.).

---
## 🎯 Tuto INTRO jouable de bout en bout (sauf gagner le combat 1‑1)

En session live continue (DsDriver), tout le tuto se déroule nativement :
1. **Contenu par-shard chargé** — `getPossibleGoldChestHeroes` plantait
   (`nextInt(0)`) car le pool de héros était vide : `ContentStats` (table
   `content.<shard>.tab`) n'était pas chargée. Le client la charge normalement
   dans `handleBootData` via `updateStats(currentServer.shardID, statData)`.
   - Le serveur envoie bien `currentServer.shardID` + `statData` ; vérifié que
     notre BootData round-trip donne `shardID=1` (writer/reader du jeu ET cycle
     `ServerXOR→ClientXOR`, `bodyEqual`), et que le **codec du client** round-trip
     un BootData correctement (`self-roundtrip shardID=7`). MAIS le shardID livré
     dans le BootData live ne prend pas effet au décodage sur ce build (cause non
     identifiée — sérialisation/codec/wrapper/framing tous vérifiés OK).
   - **Fix couche plateforme** : `DesktopLauncher` force la synchro du shard après
     le boot via `updateStats(shard,{})` du jeu → charge le vrai
     `content.<shard>.tab` de l'APK. Confirmé `availableHeroes=91`,
     `goldChestHeroes=90`. Flag `DS_CONTENT_SHARD` (défaut 1).
2. **Gold Chest** → roulé → **Centaure** (héros truqué du tuto).
3. **Silver Chest** → **Couronne** — avec le vrai handshake serveur : le client
   envoie `RequestChestAcknowledgement`, notre `DsGame` répond `ChestAcknowledgement`
   (push) → `resetChestRollChances()` → le roll passe.
4. **Équipement** : Couronne équipée sur le Centaure (Power 82→86, Action EQUIP).
5. **Campagne** : carte « Castle Dracul » → niveau 1‑1 → vrai combat 3 vagues
   (goblin, archer, boss Brozerker) → `HeroLineupUpdate` + `CampaignAttack`.

### Prochain blocage : gagner le 1‑1 (gameplay, pas un bug)
Les skills du Centaure se chargent bien (les lignes `_2/_3/_4/_5 not recognized`
ne concernent que les variantes d'étoiles, pas le 1‑star). Le combat tourne
parfaitement. Le souci est le **timing du skill en aveugle** : il faut taper le
portrait du héros quand la barre d'énergie est pleine ; piloté par captures
successives, on ne voit pas la barre en temps réel. Au 2ᵉ essai le Centaure
atteint le boss à pleine vie avec de gros crits, mais on ne finit pas.

**Contrainte réseau** : environnement sortant-only, pas d'entrée vers le
conteneur, Artifacts sous CSP → **pas de streaming web + inputs live** possible.
Solution retenue : **auto‑skill dans DsDriver** (lit l'énergie de combat, tape le
portrait quand le skill est prêt) — mode « auto » headless, propre.

### À faire (suite)
- [ ] Auto‑skill DsDriver → gagner le 1‑1 → `S_DONE` → `CAMPAIGN_UNLOCKED`.
- [ ] Stabilité serveur (les tâches serveur en arrière-plan meurent) + persistance
      (SQLite) pour reprendre sans re‑piloter.
- [ ] Élucider (optionnel) pourquoi `currentServer.shardID` ne prend pas au décodage.

---
## ▶️ Reprise (demain) — après la victoire 1‑1, attaquer le 2e château (1‑2)

**Statut** : le combat 1‑1 est **gagné (3 étoiles)**, on est sur la carte campagne,
la flèche jaune pointe le **niveau 1‑2** (2e château). D'après le déroulé attendu,
1‑2 est **perdu volontairement** pour enseigner la **construction d'équipe**
(summon de héros via soulstones — la liste de héros `0/80` vue à l'écran Heroes).

**Point de reprise rapide** (pas encore de persistance) :
```bash
# serveur + jeu dans un seul process, tuto sauté au coffre :
SRV_LOG=… GAME_LOG=… DS_JAVA_OPTS="-Dds.tutStep=41" \
  DS_FRAMES=0 DS_LIVE_FILE=<live.cmd> bash run-both.sh
# puis rejouer jusqu'à la victoire 1‑1 :
cat scripts/replay-intro-to-1-1.cmd >> <live.cmd>
# (vérifier chaque étape à l'écran ; un replay peut désynchroniser d'un tap)
```

**À reverser demain (avant/pendant 1‑2)** :
- Le flux **après INTRO** : IntroTutorialActV1 finit à `S_DONE` (1‑1). La suite
  (attaquer 1‑2, perdre, monter une équipe) est-elle un **autre acte de tuto** ou
  du flux organique ? (cf. TutorialActType : pas de « TEAM_BUILDING » explicite ;
  candidats : flux naturel post-défaite qui pousse au summon.)
- Ce que le **serveur doit fournir** pour le summon : message de summon héros →
  réponse serveur (héros/soulstones), ou grant scripté de soulstones. À extraire
  du bytecode (comme pour BuyChests/ChestAcknowledgement).

**Améliorations pour ne plus rejouer** :
- **Seed d'état post‑1‑1** (Centaure niv.3 + couronne + 1‑1 à 3 étoiles + acte tuto
  au bon point) → vrai « saut direct » comme `ds.tutStep=41`.
- **Persistance serveur (SQLite)** → l'état survit aux redémarrages.

---
## 💾 Persistance de progression joueur (snapshot dev — ✅ implémenté & vérifié)

**But** : sauvegarder TOUT l'état joueur (gold/stamina/diamants, héros, équipement,
campagne, tuto, lineups, flags) pour reprendre exactement, sans re-piloter.

### Fait (WIP, commit « player-progression persistence »)
- `DsStore` : sauve/charge `UserInfo`+`UserExtra` par joueur, via le **writer/reader du
  jeu** (octets identiques au wire). Chargement au boot, save à chaque changement.
- `DsGame` : à `ClientInfo`, charge le joueur sauvé (ou en crée+sauve un neuf), et
  construit le `BootData` depuis cet état.
- `DsUserState` : scindé en `newPlayer(serverTime)` (retourne l'état) + `attachBootFields`.
- `DsProgress` : applique les notifs du client (`ChangeTutorialStep`, `BuyChests`,
  `CampaignAttack`, `HeroLineupUpdate`) à l'état stocké. **Vérifié** : Centaure,
  complétion 1‑1 (`CampaignAttack`, indexé **chapitre 0 / niveau 0** — 0‑based !),
  étape de tuto et lineup **persistent** au redémarrage.

### Limite structurelle constatée
Le client est **autoritatif-local** et n'envoie jamais ses ressources exactes (le vrai
serveur DragonSoul était autoritatif/anti-triche). Donc l'approche « appliquer les
notifs » est **partielle** : `gold` (100422→100000) et `stamina` (114→120) dérivent, et
le tuto ne reprend pas pile. Reversé : le client range **les ressources** en write-through
dans `UserExtra.resources` (donc `User.getExtra()` est à jour pour ça) mais **héros /
campagne / tuto** en objets runtime séparés (UnitData / ClientCampaignLevelStatus /
UserTutorialAct) → `getExtra()` est périmé pour ces champs.

### Décision (cf. PRINCIPLES §6)
- **Phase dev → snapshot de l'état vivant du client.** Le launcher (couche plateforme, a
  accès à l'objet `User` autoritatif) construit un `UserExtra` complet = `getExtra()`
  (bon pour ressources/flags) **+** reconstruit héros/campagne/tuto depuis les getters
  runtime, et écrit la save directement (serveur+jeu = même disque). Le serveur ne fait
  plus que **charger**. → état **exact et complet**.
- **Plus tard → serveur autoritatif en MIROIR du code du jeu** (recalcul coûts/loot/combat
  via les classes du jeu, zéro invention). Plus fidèle, plus lourd.

### Implémenté & vérifié — `DsSnapshot` (launcher) + `DsGame` load-only
- `DsSnapshot.save(RPGMain, File)` : deep-copy de `getExtra()` (writer→bytes→reader du jeu),
  puis **écrase** héros/tuto/campagne par les convertisseurs/getters **du jeu** —
  `ClientNetworkStateConverter.getHeroData(UnitData)`, `IUserTutorialAct` getters,
  `ClientCampaignLevelStatus` getters — zéro valeur inventée. En-tête `UserInfo` via
  `getBasicUserInfo(User)`. Écrit au format `DsStore` (`[len][UserInfo][len][UserExtra]`,
  writeAll du jeu, tmp+rename atomique).
- **Garde-fou de readiness** : `getYourUser()` peut renvoyer un `User` *avant* que le
  `BootData` l'ait peuplé (map `resources` vide) → un snapshot alors écrirait des zéros et
  corromprait la save. On skippe tant que `getExtra().resources` est vide (un joueur loggé
  a toujours une map peuplée). Sans ça : premier snapshot post-boot = `gold=0 heroes=0`.
- **`nullSafeStrings`** : `packString` refuse `null` ; on met à `""` les champs `String`
  publics restés nuls dans l'en-tête fraîchement construit (`creationTimeServerTxt`, etc.).
- `DsGame` : à `ClientInfo`, **charge** la save si elle existe (sinon crée+sauve un neuf) et
  construit le `BootData` depuis cet état. Ne fait plus d'application incrémentale ; le
  **launcher est l'unique writer** (client autoritatif-local ⇒ snapshot exact >
  reconstruction partielle). `DsProgress` conservé pour le futur serveur autoritatif.
- **Vérifié bout en bout** (2026‑07‑06) : boot neuf (gold=100000/stamina=120/diamants=500,
  0 héros) → pilotage du coffre (Centaure accordé, `RequestChestAcknowledgement`→`Ack`) →
  snapshot `heroes=1` → **redémarrage sans re-pilotage** → serveur « resumed saved player
  gold=100000 stamina=120 diamonds=500 heroes=1 » et le client reconstruit le Centaure.
  Le garde-fou supprime bien le snapshot transitoire à zéro.

### Reprise / test
`run-both.sh` lance serveur+jeu dans **un seul process** (le harness tue la tâche
d'arrière-plan la plus ancienne quand une nouvelle démarre — sinon le serveur mourait).
Save dans `build/run/save/user-<id>.dat` (`-Dds.saveDir` pour changer).
