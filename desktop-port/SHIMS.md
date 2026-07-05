# Registre des shims / substitutions — DragonSoul desktop

> Principe (demandé explicitement) : **un shim doit être fonctionnel**. On ne
> répond pas « oui oui » au jeu pour se retrouver avec un jeu cassé sans savoir
> pourquoi. Ce fichier liste TOUT ce qui n'est pas le comportement natif Android
> d'origine, avec son niveau de fidélité et le risque associé.

Légende fidélité :
- **RÉEL** : implémentation fonctionnelle équivalente à l'originale.
- **PARTIEL** : fonctionne pour le chemin actuel, incomplet (peut casser ailleurs).
- **NO-OP** : ne fait rien ; acceptable seulement si l'effet n'est pas requis ici.
- **FACTICE** : valeur inventée (mais plausible/correcte pour notre contexte).

## Couche plateforme (dsbackend/)

| Élément | Fidélité | Détail / risque |
|---|---|---|
| `DsGL20` (GL20) | **RÉEL** | Délègue à LWJGL GL11/13/15/20/30. Surface = les 75 méthodes réellement appelées par le jeu. |
| FileHandle | **RÉEL** | Classe standard libGDX (java.io), utilisée telle quelle. |
| `DsGraphics` | **PARTIEL** | Taille fenêtre + GL réels. `getDisplayMode/Monitors/Cursor` → null/vide. À compléter si le jeu les déréférence (plein écran, curseur custom). |
| `DsApplication` | **RÉEL** | Logs → stdout ; postRunnable → file drainée sur le thread render (réel). `getClipboard` → null (presse-papier non branché). |
| `DsInput` (Input) | **RÉEL** | Clavier/souris/scroll GLFW → InputProcessor (mapping keycodes GLFW→libGDX vérifié). Souris = pointeur touch 0. + file d'injection synthétique pour le pilotage CLI (`DsDriver`). |
| `GlfwInput` | **RÉEL** | Callbacks GLFW (garde les refs anti-GC), mapping keycodes. |
| `DsDriver` (CLI) | **RÉEL** | Pilotage headless par script : tap/move/key/text/wait/screenshot/quit. `DS_SCRIPT=fichier` ou `-` (stdin). |
| `DsAudio` (+Sound/Music) | **RÉEL** | OpenAL (LWJGL) + STB Vorbis. Sound = décodage OGG complet → buffer AL ; Music = streaming pompé par `update()`. Repli propre si pas de device (headless → device null, API OK sans son audible). |
| `DsNet` (Net / Gdx.net) | **RÉEL** | HTTP via `java.net.HttpURLConnection` (le seul usage de Net ici = le login ; le socket de jeu est du `java.net.Socket` brut, hors Net). Réponse (`l$b`) construite en Proxy dynamique, HttpStatus (`f.c`) en réflexion (types inexprimables). Params en query-string pour GET (fidèle libGDX). Bypass proxy sur localhost. |
| `DsFiles` (Files) | **RÉEL** | Handles Classpath à **chemin relatif** (racine assets sur le classpath) : `internal(path).path()==path` comme sur Android → les clés d'assets matchent les loaders du jeu (corrige la « course » ui_main.atlas). External/local = handles absolus disque. |
| `DsPreferences` | **RÉEL** | .prefs XML. **Correctif** : `a(String):Z`=getBoolean et `e(String):Z`=contains (étaient inversés ; vérifié sur les sites d'appel réels — le jeu lit `missingAdditionalWorld` via `a()` et fait `if(e(k)) b(k,def)`). |
| `DsBridges.*` (Social/Analytics/Support/ScreenRecording/Tapjoy) | **NO-OP** | Services plateforme non applicables sur desktop : `isSignedIn()=false`, `isAvailable()=false`, actions no-op. Analytics/Support pourraient plus tard pointer vers de vrais services. |
| `DsDeviceInfo` | **FACTICE** | Valeurs device inventées mais cohérentes. `getPlatform()=ANDROID` (parité assets/logique). `getFullVersion()=23000` : le chiffre 3 = tier densité XHDPI (contrainte réelle, voir ci-dessous). |
| `getType$2826c76()` = `a$a.a` (Android) | **RÉEL (choix)** | Renvoie l'ApplicationType Android → chemin assets ETC (le seul fourni par l'APK). |

## Décisions de build (réelles, pas des shims)

| Élément | Détail |
|---|---|
| Natif libGDX **1.9.3** | Version exacte du jeu (ABI Gdx2DPixmap `setBlend(int)`). Utiliser une autre version = SIGSEGV. |
| Densité **XHDPI** + compression **ETC** | Seul jeu d'assets présent dans l'APK. Piloté par getType=Android + fullVersion tier 3. |
| Remap ASM `b_`/`c_`/`utils.b_` | Résout des collisions nom-classe/nom-package inexprimables en Java. Renommage pur, sémantique inchangée. |
| `-Xverify:none` | Le bytecode dex2jar n'a pas les stackmap frames exigées par le vérificateur Java 7+. La vérification est un contrôle de **chargement** ; la désactiver ne change **rien** à l'exécution. Alternative durable : recalculer les frames via ASM COMPUTE_FRAMES. |
| `org.json` + `com.google.android:android` (stubs) | `org.json` = vraie lib. `android.jar` = **stubs qui lèvent "Stub!" si appelés** — filet de résolution de types uniquement. Toute méthode réellement appelée doit être remplacée par un shim fonctionnel (elles crient bruyamment, pas de corruption silencieuse). |

## À faire (dettes connues)
1. ✅ ~~Input GLFW réel~~ — FAIT (clavier/souris/touch + CLI).
2. ✅ ~~Audio OpenAL réel~~ — FAIT (OpenAL + STB Vorbis).
3. **Serveur** : sans serveur, le jeu boucle sur l'écran de chargement (login →
   BootData jamais reçus). Prochaine phase : brancher `Dragonsoul-server v2`.
4. ✅ ~~Race de chargement async `get(ui_main…)`~~ — FAIT : ce n'était pas une
   course mais une collision de clés (handles absolus vs clé relative). Voir DsFiles.
5. **Assets téléchargés manquants** : recenser de façon fiable ce qui était
   téléchargé au lancement (catégories WORLD_ADDITIONAL, UI_DYNAMIC, SOUND, TEXT)
   pour compléter ou retirer proprement.
6. Fonts CJK multi-pages (Chinese/Korean/Japanese) : le jeu attend `Chinese.png`
   alors que l'APK fournit `Chinese1/2/3.png` — non bloquant.
7. Remplacer `-Xverify:none` par un recalcul de stackmaps (ASM) pour robustesse.
