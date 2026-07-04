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
