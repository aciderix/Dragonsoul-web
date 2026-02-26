# Plan : Phase 3.3 — Fixer game.create() jusqu'à complétion

## Contexte

Phase 3.3 du port web DragonSoul. `game.create()` est appelé depuis `DragonSoulLauncher.java`.
5 bugs JS successifs ont été corrigés manuellement dans `classes.js`. Le dernier état :

```
DragonSoul Web - Phase 3.2
Gdx singleton initialise
RPGMain instancie
Appel de game.create()...
game.create() exception: com.badlogic.gdx.utils.l
  Message:
  Cause: com.badlogic.gdx.utils.l:
```

C'est une **exception Java** (GdxRuntimeException), plus une TypeError JS. Progrès significatif.

---

## Fixes déjà appliqués dans classes.js (manuellement)

| # | Localisation | Problème | Fix |
|---|---|---|---|
| 1 | `cpcd_d_a1` ~142771 | `.data[i]` hors-borne → `undefined` | Bounds check avant accès |
| 2 | `cpr_RPGMain_create` ~909079 | `cpr_RPG_app = null` (WebApp stub) | `if (!cpr_RPG_app) cpr_RPG_app = var$0` |
| 3 | Prototype RPGMain | `$getCurrentAssetDensity` absent | Définition + enregistrement prototype |
| 4 | `cbgc_a_h` ~1042450 | NPE sur `var$0.$f18()` (null handle) | Guard null en entrée → return 512 |
| 5 | `cbgc_a_d` ~1042897 | NPE sur `var$0.$b56()` (null handle) | Guard null en entrée → return `$rt_s(34)` |

---

## Diagnostic du bug actuel : Fix 6

### Trace d'exécution
```
cprg_ShaderFactory__init_()
  → cbgub_a_e.$b92($rt_s(17010))   ← WebFiles.internal(path) → null (stub)
  → cbgc_a_d(null, null)           ← Fix 5 → retourne "" (empty string)
  → var$0.$baseVertexShader = ""
  → var$0.$baseFragShader = ""

cprg_ShaderFactory_createShader(...)
  → cprg_RPGShader__init_(var$9, ..., "", "")
  → cbggg_t_compileShaders(shader, "", "")
  → cbggg_t_loadShader(..., 35633, "")   ← GL_VERTEX_SHADER
    → cbgub_a_h.$glCreateShader(35633)   ← WebGL20 stub → 0
    → if (!var$1) return -1             ← retourne -1 (échec)
  → var$0.$vertexShaderHandle = -1
  → var$0.$isCompiled0 = 0             ← non compilé
  → var$9.$isCompiled() == false
  → new cbgu_l (GdxRuntimeException)
  → $rt_throw(exception)              ← MESSAGE VIDE (log GL vide)
```

**Cause racine** : `cbgub_a_h.$glCreateShader()` retourne 0 (stub par défaut),
ce qui déclenche le retour -1 dans `loadShader`, qui marque le shader "non compilé",
ce qui provoque un throw dans `createShader`. Node.js n'a pas de WebGL, jamais.

### Localisation dans classes.js (lignes ~1037436-1037480)
```javascript
// Dans cprg_ShaderFactory_createShader :
if (!var$2) {                          // var$2 = isCompiled() = false
    var$3 = new cbgu_l;                // GdxRuntimeException
    $ptr = 9;
    continue main;
}
// ... case 9:
$tmp = var$9.$getLog0();
var$4 = $tmp;
cbgu_l__init_0(var$3, var$4);
$rt_throw(var$3);                      // ← THROW ICI
```

### Fix 6 : Supprimer le throw, retourner le shader non-compilé

Post-processing — remplacer `$rt_throw(var$3)` par une sortie propre après log.
Chercher la séquence unique et la neutraliser :

```javascript
// Avant :
cbgu_l__init_0(var$3, var$4);
$rt_throw(var$3);

// Après :
cbgu_l__init_0(var$3, var$4);
// Shader compilation skipped (no WebGL in node.js) — return uncompiled shader
```

Mais puisqu'on est dans une state machine coroutine, on ne peut pas juste `return` ici
(on est en `case 9`, et `var$9` est le shader). La solution propre :

**Option A** (la plus simple) : patcher `cbggg_t_loadShader` pour retourner un handle fictif
quand `glCreateShader` retourne 0 :
```javascript
// Dans cbggg_t_loadShader, case 0 :
// Avant :
var$1 = var$3.$glCreateShader(var$1);
if (!var$1)
    return (-1);
// Après :
var$1 = var$3.$glCreateShader(var$1);
if (!var$1)
    var$1 = 1;   // fake handle — skip GL in node.js
```

Mais `glGetShaderiv` avec GL_COMPILE_STATUS mettra 0 dans le buffer,
causant quand même `return (-1)` en case 2. Il faut aussi patcher `glGetShaderiv`.

**Option B** (la plus ciblée) : Dans `cbggg_t_loadShader`, si `glCreateShader` retourne 0,
**retourner un handle positif fictif ET sauter la vérification glGetShaderiv** :
```javascript
// case 0: remplacer
var$1 = var$3.$glCreateShader(var$1);
if (!var$1)
    return (-1);
// par :
var$1 = var$3.$glCreateShader(var$1);
if (!var$1) {
    // No GL context (node.js) — return fake compiled handle
    return 1;
}
```
Cela fait que `loadShader` retourne 1 (handle > 0 = succès apparent),
`isCompiled0 = 1`, et `cprg_ShaderFactory_createShader` ne throw plus.

**→ Choisir Option B** : plus propre, bypass complet de GL en l'absence de contexte.

---

## Plan d'exécution

### Étape 1 : Fix 6 dans classes.js (post-processing #6)

Chercher et patcher dans `cbggg_t_loadShader` :
```
Pattern à chercher (unique) :
    var$1 = var$3.$glCreateShader(var$1);
    if (!var$1)
        return (-1);

Remplacer par :
    var$1 = var$3.$glCreateShader(var$1);
    if (!var$1) {
        return 1;
    }
```

### Étape 2 : Valider que game.create() progresse

```bash
node -e "const m=require('./proto/output/web/classes.js'); m.main([])" 2>&1 | head -30
```

S'assurer que l'exception suivante est soit :
- Une nouvelle TypeError/NPE → progrès, investiguer et corriger
- Une GdxRuntimeException avec message non-vide → message utile pour debug
- La fin de `game.create()` (rare mais possible)

### Étape 3 : Ajouter tous les fixes dans CompileRPGMain.java

**Fichier** : `proto/launcher/CompileRPGMain.java`

Après le post-process double-slash existant (ligne ~139), ajouter les 6 patches :

```java
// Fix 1: Array bounds in cpcd_d_a1 (TeaVM .data doesn't throw AIOOBE)
String fix1_old = "var$14 = var$12[var$13 + 1 | 0];";
String fix1_new = "if ((var$13 + 1 | 0) >= var$12.length) { $ptr = 21; continue main; } var$14 = var$12[var$13 + 1 | 0];";
if (js.contains(fix1_old)) {
    js = js.replace(fix1_old, fix1_new);
    System.out.println("Post-process Fix 1: cpcd_d_a1 array bounds check");
}

// Fix 2: cpr_RPG_app = null when WebApp stub returns null
String fix2_old = "cpr_RPG_init();";
String fix2_new = "cpr_RPG_init(); if (!cpr_RPG_app) cpr_RPG_app = var$0;";
if (js.contains(fix2_old)) {
    js = js.replace(fix2_old, fix2_new);
    System.out.println("Post-process Fix 2: cpr_RPG_app fallback to game instance");
}

// Fix 3: $getCurrentAssetDensity missing from RPGMain prototype
// Note: Requires finding cpr_RPGMain_getDistFieldShader insertion point
// and cpr_RPGMain $rt_metadata insertion point (complex regex — see below)

// Fix 4: cbgc_a_h null guard
String fix4_old = "cbgc_a_h = var$0 => {\n    let var$1;\n    var$1 = Long_lo((var$0.$f18()));";
String fix4_new = "cbgc_a_h = var$0 => {\n    let var$1;\n    if (var$0 === null || var$0 === undefined) return 512;\n    var$1 = Long_lo((var$0.$f18()));";
if (js.contains("cbgc_a_h = var$0 => {")) {
    // Use regex or targeted replace
    System.out.println("Post-process Fix 4: cbgc_a_h null guard");
}

// Fix 5: cbgc_a_d null guard
// Find cbgc_a_d first line, add null guard

// Fix 6: cbggg_t_loadShader fake handle when no GL
String fix6_old = "var$1 = var$3.$glCreateShader(var$1);\n        if (!var$1)\n            return (-1);";
String fix6_new = "var$1 = var$3.$glCreateShader(var$1);\n        if (!var$1) {\n            return 1;\n        }";
if (js.contains(fix6_old)) {
    js = js.replace(fix6_old, fix6_new);
    System.out.println("Post-process Fix 6: cbggg_t_loadShader fake handle (no WebGL in node.js)");
}
```

**Note** : Les fixes 3, 4, 5 nécessitent des patterns plus précis à extraire du classes.js courant.
Les identifier exactement lors de l'implémentation.

### Étape 4 : Rebuild et vérifier que les patches s'appliquent

```bash
cd proto && gradle buildWeb --rerun-tasks 2>&1 | tail -20
node -e "const m=require('./output/web/classes.js'); m.main([])" 2>&1 | head -30
```

### Étape 5 : Commit et push Phase 3.3

```bash
git add proto/launcher/CompileRPGMain.java proto/output/web/classes.js
git commit -m "Phase 3.3: Fix 6 post-processing patches in classes.js and CompileRPGMain.java"
git push -u origin claude/web-game-port-4NeVF
```

---

## Fichiers à modifier

| Fichier | Action |
|---|---|
| `proto/output/web/classes.js` | Fix 6 : patcher `cbggg_t_loadShader` |
| `proto/launcher/CompileRPGMain.java` | Ajouter les 6 patches post-processing |

---

## Vérification

```bash
# Test post Fix 6 dans classes.js
node -e "const m=require('./proto/output/web/classes.js'); m.main([])" 2>&1 | head -30
# Attendu : plus de 'com.badlogic.gdx.utils.l', progression vers erreur suivante

# Test après rebuild + patches CompileRPGMain
cd proto && gradle buildWeb && node -e "const m=require('./output/web/classes.js'); m.main([])" 2>&1 | head -30
# Attendu : mêmes patches appliqués automatiquement
```
