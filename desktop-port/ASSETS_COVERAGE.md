# Couverture des assets (art) — ce qu'on a / ce qui manque

> Établi via le **mapping du jeu** `DisplayDataUtil.getSpineDisplayData(UnitType).skeletonPath`
> (source de vérité, pas de nommage deviné), croisé avec les squelettes qu'on possède
> (APK Fixed2 + `world_additional_heroes.zip` récupéré). Sert de **cible de recherche** pour
> fouiller d'autres versions d'APK.

## Héros (art de combat = squelette Spine + texture + atlas)
- **93 UnitType « héros » jouables** (skeleton `hero_*`).
- **Sources d'art qu'on a** : **14** dans l'APK Fixed2 + **50** dans le zip récupéré = **64 squelettes**.
- **~59 héros couverts exactement** + **~4 via variante `_mastery`** (druidinatrix, plant_soul,
  spider_queen, void_wyvern) + quelques‑uns via nommage underscore (ex. WEREDRAGON→`hero_were_dragon`).
- ⇒ **~30 héros dont l'art est vraiment absent** (à chercher dans d'autres versions) :

```
tomb_angel, angelic_herald, bulwark_angel, angel_dragon, dragon_slayer,
eternal_enchanter, grand_huntress, triple_threat, last_defender,
sojourner_sorceress, karaoke_king, shadow_of_sven, sun_seeker,
stepladder_brothers, forgotten_dragon, black_wing, greedy_dragon,
unripe_mythology, ancient_dwarf, digger_mole, sadistic_dancer,
white_tiger (WHITE_TIGRESS), solid_longevity (SNAPPER_BONE),
vermilion_bird (VERMILION_PRIESTESS), pch_anubis_dragon, abyss_dragon,
umlaut_the_first, dark_hero, claw_man (CLAW_MAN)
```
> Le nom de fichier ≠ nom UnitType (ex. WHITE_TIGRESS→`hero_white_tiger`, SNAPPER_BONE→
> `hero_solid_longevity`). Colonne de gauche = nom **squelette** à retrouver.

**Note** : un squelette de héros sert **aussi** pour sa version **ennemi** en campagne → chaque
héros couvert couvre aussi l'ennemi correspondant.

### ⚠️ Test d'intégration d'UN héros (MEDUSA) — 2026‑07‑07 : squelette OK, combat KO
Placé `world/units/hero_medusa.*` (du zip) + ajouté MEDUSA au roster (temporaire) :
- ✅ **Menus/portraits** : Medusa **rend parfaitement** (HeroChooser « Choose Your Heroes! » —
  visage vert cheveux‑serpents), identique aux héros de base. Le **squelette** suffit pour le portrait.
- ❌ **Combat** : **crash** — `Asset not loaded: world/particles/hero_medusa.atlas`. Chaque héros a
  **DEUX** atlas requis : `world/units/hero_X.*` (corps, **présent** dans le zip) **ET**
  `world/particles/hero_X.atlas` (**VFX de skills**, **ABSENT** du zip). Les 14 de base ont leurs
  particules dans l'APK ; le zip en a **0/50**.
- ⇒ **Le zip est à moitié complet** : les 50 héros sont **utilisables en menu** mais **plantent en
  combat** faute de leurs particules (elles aussi perdues, CDN). Pour les rendre **jouables en
  combat** : soit leurs `world/particles/hero_X.atlas` (irrécupérables), soit un **atlas placeholder
  de particules** peuplé des régions que le squelette référence (dégradation = pas/peu de VFX, mais
  pas de crash) — **même technique que le chantier placeholder (A)**. Donc **A est le socle** : il
  débloque à la fois les écrans (campagne 3+, Temple) **et** le combat des héros récupérés.

## Écrans / fonds à contenu externe (atlas UI) — art perdu (cf. CONTENT_GATE.md)
Non couvrables (CDN mort) → placeholder atlas :
`external_campaign_maps` (cartes chap. 3+), `external_temple`, `external_runes`, `external_crypt`,
`external_expeditions`, `external_boss_pit`, `external_war`.
Icônes (dégradent déjà en « ? » via `loadOptionalDynamicUI`) : `external_items`, `external_skills`,
`external_units`, `external_skins`, `external_hero_tags`, `external_flags`, `external_challenges`,
`external_events`, `external_narrator`, `external_how_to_play`.

## Fouille multi‑versions (apk.dog) — ❌ PROUVÉE INUTILE (2026‑07‑07)
Vérifié sur **4 versions couvrant toute la vie du jeu** (1.0.2 = 2015 → 2.22.0 = 2019, qu'on a en
local) :
- **Les 4 bundlent EXACTEMENT les mêmes 14 squelettes de héros** (diff = 0). Aucune version n'a un
  héros que Fixed2 n'a pas.
- **Manifestes d'assets** : `2.22.0‑stock ≡ Fixed2` (diff 0 — Fixed2 = stock 2.22.0 + patch
  ServerType). Fixed2/2.22.0 est la version la **plus riche** (569 assets) ; les plus vieilles en
  ont **moins** (2.21.4 = 545, 1.0.2 = 387). Aucune version ne bundle un `external_*`/hero/map/temple
  que Fixed2 n'a pas.
- ⇒ Sur **tout** le cycle de vie : mêmes 14 héros, zéro atlas externe, la version qu'on a déjà
  (Fixed2) = la plus complète. **Les ~30 héros manquants + tous les atlas d'écran ont TOUJOURS été
  du CDN**, dans **chaque** version.

**Conclusion** : télécharger les ~13 autres versions apk.dog = **inutile** (elles se situent entre
des versions déjà identiques côté art bundlé). Seules sources d'art manquant = **dumps CDN**
récupérés (comme `world_additional_heroes.zip`, qui a déjà comblé 50 héros). Méthode de dl apk.dog
notée dans VERSIONS.md si jamais besoin, mais **sans objet** ici.

### Minage EXHAUSTIF des 26 versions (2026‑07‑07) — 1.0.2 → 2.22.0 + iOS
Diff normalisé (densité/langue neutralisées) de **toutes** les versions vs 2.22.0 :
- **6 assets seulement** existent dans une ancienne version et **pas** dans 2.22.0 :
  `sound/combat_stun.ogg`, `ui/logo_gradient_bg.png`, `world/particles/thought_bubble_icons.atlas`
  (+etc1), `world/units/monster_wraith0.skel`, `monster_wraith1.skel`.
- **Référencés par le code 2.22.0 ?** Seul **`combat_stun.ogg`** l'est (4 classes) → **récupéré** de
  1.0.2 dans `recovered-assets/sound/` (le jeu le rejoue au lieu d'un silence). Les 5 autres = **0
  référence** (obsolètes) → ignorés.
- **iOS (IPA)** : mêmes 14 héros, aucun `external_*`, textures PVRTC. Rien de neuf.
- **Zéro** `external_*` / `chapter_*map` dans **tout** le corpus 26 versions + iOS.
- 2.22.0 a **194 assets de plus** que 1.0.2 → notre version est la **plus riche** (quasi‑sur‑ensemble).

**Verdict FINAL (verrouillé)** : l'art manquant (30 héros + atlas d'écran) est **irrécupérable** —
absent de **toutes** les versions Android (26), de l'**iOS**, des 2 repos, de tous les buckets S3 et
de Wayback. C'était du CDN, mort. **Seul gain du minage = `combat_stun.ogg`.** On construit avec ce
qu'on a (63/93 héros + campagne + tuto).
