# Phase 3.3 — État du travail (session en cours)

## Objectif
Porter DragonSoul sur le web via TeaVM. `game.create()` doit s'exécuter sans crash JS fatal.

## Branche de travail
`claude/web-game-port-4NeVF`

## Commande de test
```bash
node -e "const m=require('./proto/output/web/classes.js'); m.main([]);" 2>&1 | head -40
```

## Dernier résultat connu
```
DragonSoul Web - Phase 3.2
Gdx singleton initialise
[ERROR] com.perblue.common.h.a: Problem geting log   (x6 — logger stub manquant, ignorable)
RPGMain instancie
Appel de game.create()...
game.create() exception: java.lang.RuntimeException
  Message: (JavaScript) TypeError: Cannot set properties of null (setting '$order1')
```

## Fixes appliqués dans proto/output/web/classes.js

| # | Fonction JS | Problème | Fix |
|---|---|---|---|
| 1 | `cpcd_d_a1` ~142771 | `.data[i]` hors-borne → `undefined` | Bounds check avant accès |
| 2 | `cpr_RPGMain_create` ~909079 | `cpr_RPG_app = null` (WebApp stub) | `if (!cpr_RPG_app) cpr_RPG_app = var$0` |
| 3 | Prototype RPGMain | `$getCurrentAssetDensity` absent | Définition + enregistrement prototype |
| 4 | `cbgc_a_h` | NPE sur `var$0.$f18()` (null handle) | Guard null → return 512 |
| 5 | `cbgc_a_d` | NPE sur `var$0.$b56()` (null handle) | Guard null → return `$rt_s(34)` |
| 6 | `cbggg_t_loadShader` ~100660 | `glCreateShader()=0` → return -1 | Return 1 (fake handle) |
| 7 | `juc_Executors_newFixedThreadPool` ~213400 | Retourne null (stub) → NPE `$isShutdown` | Fake ExecutorService (isDone=true) |
| 8 | `cbga_e_finishLoading` ~132585 | Boucle infinie (assets jamais chargés) | Return immédiat |
| 9+10 | `cbggg_t_linkProgram` + `cbggg_t_createProgram` | `glCreateProgram()=0` → -1 → isCompiled=false → throw | Return fake handle, skip GL link |

## Prochain bug à corriger
**`TypeError: Cannot set properties of null (setting '$order1')`**

Chercher avec :
```bash
grep -n "\$order1" /home/user/Dragonsoul-web/proto/output/web/classes.js | head -20
```
Puis trouver quelle variable est null et ajouter un guard.

## Règle IMPORTANTE : ne jamais utiliser Read/Edit sur classes.js
Le fichier fait 65MB → crash de session. Utiliser **Python ou sed** pour les patches :
```python
python3 - <<'PYEOF'
path = '/home/user/Dragonsoul-web/proto/output/web/classes.js'
old = "texte_exact_à_remplacer"
new = "nouveau_texte"
with open(path, 'r') as f:
    content = f.read()
if old in content:
    content = content.replace(old, new, 1)
    with open(path, 'w') as f:
        f.write(content)
    print("OK")
else:
    print("PATTERN NOT FOUND")
    idx = content.find("texte_partiel")
    if idx >= 0: print(repr(content[idx-10:idx+100]))
PYEOF
```

## Prochaines étapes
1. Fixer `$order1` NPE (java.nio.ByteOrder ou similaire)
2. Continuer jusqu'à `game.create() termine`
3. Ajouter tous les fixes dans `CompileRPGMain.java` (post-processing automatique)
4. Commit + push final Phase 3.3

## Architecture clé
- `proto/launcher/DragonSoulLauncher.java` — point d'entrée, appelle `game.create()`
- `proto/launcher/CompileRPGMain.java` — compile via TeaVM + post-processing JS
- `proto/output/web/classes.js` — JS généré (~65MB, patches manuels en cours)
- `proto/tools/GenerateStubs.java` — génère les stubs WebApp, WebGL20, WebFiles, etc.
- `proto/launcher/GdxInitializer.java` — initialise le singleton Gdx
