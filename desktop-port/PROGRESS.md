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
