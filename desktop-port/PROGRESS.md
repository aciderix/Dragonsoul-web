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
