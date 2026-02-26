# Prompt pour la prochaine session Claude Code

Colle ce prompt au début de la prochaine session :

---

Tu reprends le portage web de DragonSoul (Android APK → navigateur via TeaVM).

**Branche git** : `claude/web-game-port-4NeVF`
**Répertoire** : `/home/user/Dragonsoul-web/`

Lis d'abord le document de contexte complet :
```
/home/user/Dragonsoul-web/CONTEXT_PHASE_3_6.md
```

## Situation actuelle (Phase 3.6 en cours)

La dernière session a réussi à inclure `cpr_RPGMain_render` et `DragonSoulLauncher_renderFrame` dans le JS généré (82 MB, 0 erreurs sévères). C'est un progrès majeur.

**MAIS** : le build actuel a cassé plusieurs patches post-processing dans `CompileRPGMain.java`. Ces patches étaient nécessaires pour que `game.create()` réussisse (Phase 3.5 acquise). Il faut les réparer.

## Ta tâche immédiate

1. **Mettre à jour les patterns cassés** dans `proto/launcher/CompileRPGMain.java`

   Pour chaque fix marqué WARN dans la sortie du build, trouver le nouveau pattern dans le `classes.js` actuel (utiliser `sed -n 'Xp'` ou `grep -n`), puis mettre à jour `fix_X_old` dans `CompileRPGMain.java`.

   Fixes à réparer (voir détails dans CONTEXT_PHASE_3_6.md) :
   - Fix 4 (cbgc_a_h null guard) — pattern `.$f9()` avec state machine
   - Fix 12a (cbgu_ag__init_ pool fallback)
   - Fix 18, 18b, 18d, 18e, 18f (cbga_e_get asset loading)
   - Fix 20 (RPGSkin_synchronizedLoad)
   - Fix 21a/21b (cbgssu_h_getRegion/getDrawable)
   - Fix 30 (cbgc_a_h _webContent shortcut)

2. **Rebuilder** : `gradle buildWeb 2>&1 | tail -40`
   Objectif : **0 WARN** dans les patches.

3. **Tester dans le navigateur** :
   ```bash
   python3 -m http.server 8080 --directory /home/user/Dragonsoul-web/proto/output/web/
   ```
   Ouvrir http://localhost:8080/ — vérifier que game.create() passe et que la boucle RAF démarre.

4. **Si render() produit des erreurs GL** : inspecter et créer de nouveaux patches.

5. **Committer et pusher** sur `claude/web-game-port-4NeVF`.

## Contraintes importantes

- **classes.js fait 82 MB** — utiliser `sed` pour lire/éditer, JAMAIS les outils Read/Write/Edit (crash session)
- Ne JAMAIS utiliser `--rerun-tasks` avec gradle (cause 0-byte output par le passé — à éviter)
- Build incrémental (`gradle buildWeb` sans flags) fonctionne bien
- Le bridge WebGL2 est injecté à la fin de classes.js par Fix 28 — ne pas le modifier directement

## Commandes utiles

```bash
# Chercher un pattern dans classes.js
grep -n 'nom_fonction' /home/user/Dragonsoul-web/proto/output/web/classes.js | head -5

# Lire autour d'une ligne
sed -n '704276,704310p' /home/user/Dragonsoul-web/proto/output/web/classes.js

# Build
cd /home/user/Dragonsoul-web/proto && gradle buildWeb 2>&1 | tail -40

# Vérifier que renderFrame existe
grep -n 'DragonSoulLauncher_renderFrame\b\|cpr_RPGMain_render\b' \
  /home/user/Dragonsoul-web/proto/output/web/classes.js | head -5

# Push
git add -A && git commit -m "Phase 3.6: ..." && git push -u origin claude/web-game-port-4NeVF
```
