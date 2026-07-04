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
| `DsFiles` (Files) | **RÉEL** | I/O disque réelle. Mapping vérifié sur l'AndroidFiles d'origine. Gère les chemins absolus (pas de double-préfixe). |
| FileHandle | **RÉEL** | Classe standard libGDX (java.io), utilisée telle quelle. |
| `DsPreferences` | **RÉEL** | Persiste dans un .prefs (java.util.Properties/XML). |
| `DsGraphics` | **PARTIEL** | Taille fenêtre + GL réels. `getDisplayMode/Monitors/Cursor` → null/vide. À compléter si le jeu les déréférence (plein écran, curseur custom). |
| `DsApplication` | **RÉEL** | Logs → stdout ; postRunnable → file drainée sur le thread render (réel). `getClipboard` → null (presse-papier non branché). |
| `DsInput` (Input) | **NO-OP** | ⚠️ **Pas encore d'événements clavier/souris.** Suffisant pour le rendu, mais le jeu n'est **pas jouable** tant que les callbacks GLFW ne sont pas branchés. TODO prioritaire. |
| `DsAudio` (+Sound/Music) | **NO-OP** | Son silencieux. La logique de jeu n'en dépend pas ; à remplacer par OpenAL pour le son réel. |
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
1. **Input GLFW réel** (clavier/souris → InputProcessor) — requis pour jouabilité.
2. **Audio OpenAL réel** (sinon jeu muet).
3. Fonts CJK multi-pages (Chinese/Korean/Japanese) : le jeu attend `Chinese.png`
   alors que l'APK fournit `Chinese1/2/3.png` — non bloquant (langues asiatiques).
4. Remplacer `-Xverify:none` par un recalcul de stackmaps (ASM) pour robustesse.
5. Compléter `DsGraphics` (display modes/monitors) si besoin.
