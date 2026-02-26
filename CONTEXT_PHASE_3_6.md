# DragonSoul Web Port — Contexte Phase 3.6

## Objectif général
Porter le jeu Android DragonSoul (APK) pour tourner dans le navigateur via TeaVM (compilateur Java → JavaScript). La cible est d'avoir une boucle de rendu fonctionnelle sur un canvas WebGL2.

## Répertoire de travail
`/home/user/Dragonsoul-web/proto/`

## Branche git active
`claude/web-game-port-4NeVF`

## État d'avancement (fin session Phase 3.6)

### ✅ ACQUIS (fonctionnel dans les sessions précédentes)
- `game.create()` se termine normalement dans le navigateur (Phase 3.5)
- Shaders compilés (Decals-vs/fs chargés depuis GAME_ASSETS)
- Bridge WebGL2 injecté dans classes.js
- 32 patches post-processing dans `CompileRPGMain.java`
- `index.html` complet avec boucle RAF, FPS counter, status bar
- `game-assets.js` pré-charge les shaders GLSL

### ✅ ACCOMPLI cette session (Phase 3.6)
1. **`DragonSoulLauncher.java` modifié** :
   - Champ `static RPGMain _game`
   - Méthode `renderFrame()` qui appelle `_game.render()`
   - Appel de `renderFrame()` depuis `main()` (évite la DCE TeaVM)

2. **`JdkFixer.java` — nouveaux stubs** :
   - `java.lang.Class.getResource(String)` → null
   - `java.util.concurrent.ConcurrentLinkedQueue.size()` → 0
   - `java.util.concurrent.ConcurrentLinkedQueue.remove()` → null
   - `java.sql.Timestamp` (classe stub complète)

3. **`CompileRPGMain.java`** :
   - `tool.getClassesToPreserve().add("com.perblue.rpg.RPGMain")` ajouté (ligne ~68)
   - Fix 9 WebGL2-aware : garde `_webGL2Active` pour ne pas bypasser glLinkProgram en browser

4. **Résultat de compilation** :
   - **82 MB de JavaScript généré** (vs 67-69 MB avant)
   - **0 erreurs sévères** (vs 5 avant)
   - `DragonSoulLauncher_renderFrame` ✅ présent dans le JS
   - `cpr_RPGMain_render` ✅ présent dans le JS (ligne ~581228)
   - Metadata RPGMain : `"$render1", $rt_wrapFunction0(cpr_RPGMain_render)` ✅

### ⚠️ PROBLÈME EN COURS — Patches post-processing cassés
Le JS généré a changé (82 MB vs 67 MB) donc plusieurs patterns de CompileRPGMain.java ne trouvent plus leurs cibles. Sur ~27 patches, **23 s'appliquent** mais certains critiques manquent :

| Fix | Status | Description |
|-----|--------|-------------|
| Fix 4 | WARN | `cbgc_a_h` null guard — pattern `.$f18()` → maintenant `.$f9()` avec state machine |
| Fix 12a | WARN | `cbgu_ag__init_` pool fallback |
| Fix 18 | WARN | `cbga_e_get` type-not-found patterns |
| Fix 18b/d/e/f | WARN | `cbga_e_get0` patterns |
| Fix 20 | WARN | `RPGSkin_synchronizedLoad` |
| Fix 21a/21b | WARN | `cbgssu_h_getRegion/getDrawable` |
| Fix 30 | WARN | `cbgc_a_h _webContent shortcut` (dépend de Fix 4) |

**Ces fixes étaient nécessaires pour que `game.create()` réussisse** (Phase 3.5). Maintenant qu'ils manquent, `game.create()` pourrait échouer à nouveau.

## Tâche principale pour la prochaine session

### Étape 1 : Mettre à jour les patterns cassés dans CompileRPGMain.java

Pour chaque WARN, chercher le nouveau pattern dans le classes.js actuel et mettre à jour la chaîne `fix_X_old` correspondante dans `CompileRPGMain.java`.

**Méthode** : utiliser `sed` pour lire classes.js (pas `Read` tool — fichier trop grand).

#### Fix 4 — cbgc_a_h null guard
Nouveau pattern (lignes ~704276-704295 de classes.js) :
```javascript
cbgc_a_h = var$0 => {
    let var$1, var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        let $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        $tmp = var$0.$f9();
```
Nouveau fix4_old à chercher dans CompileRPGMain.java :
```java
String fix4_old = "cbgc_a_h = var$0 => {\n"
                + "    let var$1, var$2, $ptr, $tmp;\n"
                + "    $ptr = 0;\n"
                + "    if ($rt_resuming()) {\n"
                + "        let $thread = $rt_nativeThread();\n"
                + "        $ptr = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();\n"
                + "    }\n"
                + "    main: while (true) { switch ($ptr) {\n"
                + "    case 0:\n"
                + "        $ptr = 1;\n"
                + "    case 1:\n"
                + "        $tmp = var$0.$f9();";
String fix4_new = "cbgc_a_h = var$0 => {\n"
                + "    let var$1, var$2, $ptr, $tmp;\n"
                + "    if (var$0 === null || var$0 === undefined) return 512;\n"
                + "    $ptr = 0;\n"
                + "    if ($rt_resuming()) {\n"
                + "        let $thread = $rt_nativeThread();\n"
                + "        $ptr = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();\n"
                + "    }\n"
                + "    main: while (true) { switch ($ptr) {\n"
                + "    case 0:\n"
                + "        $ptr = 1;\n"
                + "    case 1:\n"
                + "        $tmp = var$0.$f9();";
```

#### Fix 30 — cbgc_a_h _webContent shortcut
Chercher pattern correspondant APRÈS Fix 4 appliqué (avec le null guard présent).

#### Fix 12a — cbgu_ag__init_ pool fallback
Chercher le nouveau pattern avec :
```bash
sed -n '835640,835690p' proto/output/web/classes.js
```
Le pattern a changé : l'ancienne version avait directement `cbgu_ag_a(var$1)` sans state machine.

#### Fix 18, 18b, 18d, 18e, 18f — cbga_e_get patterns
Chercher avec :
```bash
grep -n 'cbga_e_get\b' proto/output/web/classes.js | head -5
```

#### Fix 20 — RPGSkin_synchronizedLoad
Chercher avec :
```bash
grep -n 'cpru_RPGSkin_synchronizedLoad\b' proto/output/web/classes.js | head -3
```

#### Fix 21a/21b — cbgssu_h_getRegion/getDrawable
Chercher avec :
```bash
grep -n 'cbgssu_h_getRegion\|cbgssu_h_getDrawable' proto/output/web/classes.js | head -5
```

### Étape 2 : Rebuild et vérifier
```bash
cd /home/user/Dragonsoul-web/proto && gradle buildWeb 2>&1 | tail -40
```
Attendu : **32 patches OK, 0 WARN** et game.create() fonctionne encore.

### Étape 3 : Tester dans le navigateur
Lancer un serveur HTTP dans `proto/output/web/` :
```bash
python3 -m http.server 8080 --directory /home/user/Dragonsoul-web/proto/output/web/
```
Ouvrir `http://localhost:8080/` et vérifier :
- game.create() OK (status bar)
- render() appelé (FPS counter qui monte, "Premier frame rendu avec succès !")
- Pas d'erreurs JS critiques dans la console

### Étape 4 : Si render() échoue avec des erreurs GL
Les erreurs probables et leurs fixes JS dans le bridge (Fix 28, injected à la fin de classes.js) :
- `useProgram: program not valid` → vérifier que Fix 9 (linkProgram) fonctionne bien avec `_webGL2Active`
- `bufferData: no buffer` → déjà géré dans le bridge
- NPE dans la boucle de rendu → inspecter l'erreur dans la console, créer un nouveau patch

## Fichiers clés

| Fichier | Rôle |
|---------|------|
| `proto/launcher/DragonSoulLauncher.java` | Entry point TeaVM, contient `renderFrame()` |
| `proto/launcher/CompileRPGMain.java` | Lance TeaVM + post-processing (32 patches) |
| `proto/launcher/JdkFixer.java` | ClassHolderTransformer : stubs JDK manquants |
| `proto/output/web/classes.js` | 82 MB JS généré (NE PAS éditer avec Read/Write — trop gros, utiliser sed) |
| `proto/output/web/index.html` | Page web avec boucle RAF |
| `proto/output/web/game-assets.js` | Shaders GLSL pré-chargés (GAME_ASSETS) |

## Points techniques importants

### Noms obfusqués clés dans classes.js
- `cpr_RPGMain` → RPGMain (game principal)
- `cpr_RPG_app` → singleton RPGMain (défini par Fix 2 dans create())
- `cpr_RPGMain_render` → RPGMain.render() — maintenant présent ✅
- `cpr_RPGMain_create` → RPGMain.create()
- `DragonSoulLauncher_renderFrame` → fonction d'entrée pour la boucle RAF ✅
- `cbggg_t_linkProgram` → glLinkProgram (patché Fix 9)
- `cbggg_t_loadShader` → glCompileShader (patché Fix 6)
- `cbg_b` → com.badlogic.gdx.b (Game class)
- `cbg_c` → com.badlogic.gdx.c (ApplicationListener interface)

### Bridge WebGL2 (Fix 28)
Injecté à la fin de classes.js, contient :
- `setupWebGL2(canvas)` → active le bridge, set `window._webGL2Active = true`
- `$rt_exports.renderFrame` → appelle `DragonSoulLauncher_renderFrame()`
- `WebGraphics.prototype.$getDeltaTime` → timing RAF
- Audio stubs (`_fakeAudioDevice`)
- Fix `$glBufferData` pour eviter crash sur buffer vide

### Comment éditer classes.js (grand fichier)
TOUJOURS utiliser `sed`, JAMAIS les outils Read/Write :
```bash
sed -n 'Xp' proto/output/web/classes.js  # lire ligne X
sed -i 's/ancien/nouveau/g' proto/output/web/classes.js  # remplacer
```

### Build
```bash
cd /home/user/Dragonsoul-web/proto
gradle buildWeb 2>&1 | tail -50
```
Le buildWeb : compile Java → TeaVM → post-process classes.js

## Résultat attendu final
- Boucle RAF tourne à ~60 FPS
- `cpr_RPGMain_render` appelé à chaque frame
- WebGL draw calls visibles (status bar "DrawCalls" s'incrémente)
- Quelques pixels sur le canvas (même une couleur unie de fond = succès Phase 3.6)
