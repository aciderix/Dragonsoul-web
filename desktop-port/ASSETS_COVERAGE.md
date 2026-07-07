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

## Écrans / fonds à contenu externe (atlas UI) — art perdu (cf. CONTENT_GATE.md)
Non couvrables (CDN mort) → placeholder atlas :
`external_campaign_maps` (cartes chap. 3+), `external_temple`, `external_runes`, `external_crypt`,
`external_expeditions`, `external_boss_pit`, `external_war`.
Icônes (dégradent déjà en « ? » via `loadOptionalDynamicUI`) : `external_items`, `external_skills`,
`external_units`, `external_skins`, `external_hero_tags`, `external_flags`, `external_challenges`,
`external_events`, `external_narrator`, `external_how_to_play`.

## Cible de la fouille multi‑versions (apk.dog)
Chercher dans **toutes** les versions d'APK dispo : les **~30 squelettes de héros** ci‑dessus, et
tout `external_*.atlas` (fonds d'écran). Rappel (VERSIONS.md) : le contenu externe a **toujours** été
CDN même en 1.0.2 — donc chances faibles côté atlas d'écran, mais les **squelettes de héros** peuvent
être bundlés différemment selon les versions → ça vaut le coup de vérifier.
