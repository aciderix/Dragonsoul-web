# Verrou de contenu additionnel — analyse & options

## Le problème
Le jeu télécharge, au boot, du **contenu additionnel** depuis les serveurs
d'origine (aujourd'hui **fermés → irrécupérable**). Sans ce contenu, le boot est
bloqué avant la connexion au serveur de jeu.

## Mécanisme (reverse depuis le jeu) — DEUX checks indépendants
1. **`UIHelper.checkForRequiredWorldAdditional()`** → lit
   `RPGAssetManager.getHasWorldAdditional()`. Si false → `RPGMain.setShouldRestart(true)`
   → **boucle de redémarrage** (« creating splash screen »).
2. **`AssetUpdater`** (sous-système de téléchargement) : détecte que le contenu
   reste absent après une tentative → `previouslyRestartedForMissingContent` →
   **« Avoiding infinite download loop »** → **dialogue « Content Update Failed /
   download loop issue »**. Bouton **Ok = Restart-Backstop** (redémarre) → cul-de-sac.

La détection est basée sur des **fichiers repères** par catégorie (absents de l'APK) :
- `world/units/hero_claw_man.atlas` (WORLD_ADDITIONAL)
- `ui/external_skins.atlas` (UI_DYNAMIC)
- `sound/war_you_won_broken_shield.ogg` (SOUND)
- (+ catégorie TEXT)

L'APK embarque ~22 héros de base ; ces repères sont du contenu *additionnel* téléchargé.

## Leviers testés
- ✅ **Levier #1** — `RPGAssetManager.setHasWorldAdditional(true)` (API publique du
  jeu, chaque frame + juste après `create()`) : **casse la boucle de restart** du
  check #1. Le jeu rend alors une vraie modale au lieu de boucler.
  (`DS_FORCE_WORLD_ADDITIONAL`)
- ❌ **Levier #2** — pré-remplir les prefs (`missingAdditionalWorld=false`,
  `shouldDownloadAdditionalWorld=false`) : **insuffisant**. Les prefs sont des
  *sorties* de la détection par fichiers, pas des entrées → le jeu re-détecte
  l'absence via les repères → dialogue #2.

## Options restantes (honnêtes, sans casser le jeu, sans patch bytecode)
1. **Repères minimaux valides** aux chemins vérifiés (+ ce que le check exige) pour
   que `hasWorldAdditional` devienne true **légitimement**, PUIS rendre le
   chargement d'assets **tolérant** (asset manquant → dégradé, pas crash).
   → Nécessite : localiser précisément où/comment les repères sont vérifiés
   (internal vs external), fabriquer des `.atlas/.png` minimaux valides, étendre la
   tolérance de `DsFiles`/AssetManager.
2. **Version antérieure du jeu** (idée utilisateur) — un APK plus ancien **sans** le
   système de téléchargement additionnel au boot éviterait tout ce verrou. Piste la
   plus propre à terme ; à rechercher.

## Reco
- Court terme (cet APK) : option 1 (repères minimaux + tolérance) — travail borné.
- Long terme / plus propre : option 2 (version antérieure) à évaluer.

## Verrou #3 — atlas de feature dynamiques (`UIHelper.loadDynamicUI`) — reversé 2026‑07‑06
Distinct du gate de boot : chaque **écran de feature** charge son atlas externe à l'ouverture.
`UIHelper.loadDynamicUI(path, boolean optional)` (bytecode) :
1. `assetExists(path)` → si présent et pas chargé : `load(path, TextureAtlas)` + `finishLoading()`.
2. re‑check `exists && loaded`. Si **KO** → pose pref `missingAdditionalWorld=true`, **et si
   `optional==false` (required) → `RPGMain.setShouldRestart(true)`** = **download‑loop**.
- `loadRequiredDynamicUI(path)` = `optional:false` → **boucle** sur miss (ex. Temple →
  `TempleLobbyScreen`). `loadOptionalDynamicUI(path)` = `optional:true` → **dégrade** (renvoie
  false, le jeu utilise un placeholder, ex. `icon_question_mark` pour les icônes items/skills).

### ⚠️ Piège : l'atlas VIDE est une rustine (testé, rejeté)
Marquer l'atlas manquant par un **fichier vide** fait passer `assetExists`/`isLoaded` (casse la
boucle), **mais** :
- le screen fait ensuite `skin.getDrawable("<atlas>/<region>")` → l'atlas vide n'a **aucune
  région** → **exception dans le thread de rendu → crash du process** (pire que la boucle, qui
  laissait le jeu vivant). Vécu sur Temple (`temple_outside` introuvable).
- **régression** sur les atlas à repli optionnel (`external_items/skills/runes/hero_tags`) :
  absents, le repli natif marche ; marqués vides, `loadOptional`→true puis lookup → crash.

### ✅ Fix propre — atlas placeholder PEUPLÉ (option 1 faite correctement)
Construire un atlas **valide** contenant les **vrais noms de régions** que le screen requiert
(extraits du bytecode/`.tab` — source de vérité), toutes pointant vers **une** texture
placeholder (tuile « missing » 1×1 ou visible). Le screen **rend** en dégradé (art perdu
substitué), **sans crash**, **sans logique truquée**. Ne marquer QUE les atlas **required** ;
laisser les **optional** absents (le jeu gère). Aucun atlas ne ship dans l'APK (tous étaient du
contenu téléchargé) → un placeholder ne shadow jamais un vrai atlas.
