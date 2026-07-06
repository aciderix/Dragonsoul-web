# Test sur vrai appareil (serveur local ↔ vrai client Android)

> Le **vrai jeu DragonSoul** (APK sur téléphone) a été lancé contre **notre serveur**
> (`run-server.sh`, sans notre launcher desktop). Validation réelle du protocole + relevé de
> bugs de gameplay. Log de session fourni par le joueur (2026‑07‑06). Ce document **étudie et
> documente** chaque point ; les correctifs sont notés RÉSOLU / À FAIRE / EN ATTENTE.

## ✅ Ce qui marche sur vrai client (confirmé dans le log)
- **Login → BootData** (notre serveur répond au vrai `ClientInfo1` du téléphone).
- **Tuto complet** (tous les `ChangeTutorialStep1` 0→72), coffres (`BuyChests1` + notre
  `RequestChestAcknowledgement1`→`ChestAcknowledgement`).
- **Changement de nom** (`SetPlayerName1`) — OK côté joueur.
- **Avatar** (`SetPlayerAvatar1`), **équipement / lineup** (`HeroLineupUpdate1`) — OK.
- **Combat de campagne** joué (nombreux `CampaignAttack1` = niveaux gagnés).
- ⇒ La pile réseau (sérialisation, XOR/Deflate, framing, messages) est **bonne avec le vrai
  client**, pas seulement notre launcher.

## 🐛 Problème 1 — skills Dragon Lady / Unstable Understudy non lançables → ✅ RÉSOLU
**Symptôme (joueur)** : en combat, la barre d'énergie de Dragon Lady et Unstable Understudy se
remplit, mais **taper le portrait ne lance pas leur skill**.

**Cause racine (reversée)** : nos 2 héros de départ sont **injectés à la main** dans le BootData
(`DsUserState.hero()`) avec une map `skills` **vide**. Or le vrai flux de don de héros du jeu
(`HeroHelper.unlock` → `HeroHelper.initSkills`) donne **niveau 1** à chaque skill du héros
débloqué à sa rareté. En combat, `HeroHelper.copySkillsToUnitData(Unit, hero)` copie les skills
du héros vers l'unité de combat : **skills vide ⇒ aucun skill actif ⇒ rien à lancer** (barre
pleine mais tap sans effet). Les héros passés par le vrai flux (Centaure du coffre, héros
summonés) ont bien leurs skills → eux peuvent lancer. **C'est la différence de traitement** entre
nos starters injectés et les héros débloqués par le jeu (intuition du joueur confirmée).

**Correctif (propre, sourcé du jeu)** : `DsUserState.initSkills(HeroData)` **mirroir exact** de
`HeroHelper.initSkills(hero, false)` — pour chaque `SkillType` où
`SkillStats.getUnitType(st)==type` et `SkillStats.getRarity(st)` ∉ {DEFAULT, ORANGE} et
`rarity.ordinal() <= hero.rarity.ordinal()` → `skills.put(st, 1)`. Utilise les **tables du jeu**
(`SkillStats`), zéro valeur inventée. Vérifié : un WHITE 1★ obtient son skill de base
(`DRAGON_LADY_1=1`, `UNSTABLE_UNDERSTUDY_1=1`) — identique à ce que produit `initSkills`.

> ⚠️ **Portée** : le fix s'applique aux **nouveaux** joueurs (`newPlayer`). Une save **existante**
> (téléphone, featuretest) a déjà des héros à skills vides → repartir d'une **save neuve** pour
> en bénéficier (ou future migration au chargement). À garder en tête pour re‑tester.

## 🐛 Problème 2 — pas de persistance au redémarrage → 🔎 ÉTUDIÉ (fix à décider)
**Symptôme (joueur)** : après redémarrage, la progression est perdue.

**Preuve dans le log** : session 2 = `resumed saved player gold=0 stamina=60 diamonds=0 heroes=2`
= l'état **de création** (2 starters), **Centaure + campagne + nom PERDUS**.

**Cause racine (architecture)** : sur le **téléphone il n'y a QUE notre serveur**, pas notre
launcher. Or notre persistance actuelle = **snapshot par le launcher** (`DsSnapshot`, qui lit
l'objet `User` vivant du **client desktop**). Le vrai client Android est **autoritatif‑local** :
il calcule tout et n'envoie que des **notifications** (`ChangeTutorialStep1`, `BuyChests1`,
`CampaignAttack1`, `HeroLineupUpdate1`, `SetPlayerName1`, `SetPlayerAvatar1`, `SettingsSync1`,
`Action1`…), **jamais** son état complet. Notre serveur ne **sauve** qu'à la création → toute la
progression est perdue.

**Voie de résolution (à décider)** : pour le scénario **vrai client**, c'est au **SERVEUR**
d'appliquer ces notifications à l'état sauvé (le rôle de `DsProgress`, déjà amorcé puis mis de
côté au profit du snapshot‑launcher). C'est **structurellement partiel** (le client n'envoie
jamais l'or/stamina exacts) mais capture **héros/campagne/tuto/nom/lineup/avatar** = l'essentiel.
Le complet‑exact = **serveur autoritatif** (calcule tout, cf. SERVER_DESIGN.md). Décision à
prendre : (a) activer/compléter `DsProgress` (persistance partielle mais réelle, immédiate) ;
(b) viser directement l'autoritatif (lourd). **Non implémenté** — en attente d'arbitrage.

## 🐛 Problème 3 — crash campagne « chapitres après 2‑3 » → 🔎 ÉTUDIÉ (fix à décider)
**Symptôme (joueur)** : crash en affichant les chapitres après 2‑3. Le client a d'ailleurs envoyé
un **`ErrorReport1`** juste avant `session ended` (frame#245 du log).

**Cause racine (reversée)** : les **fonds de carte** des chapitres sont des régions d'atlas.
Chapitres **1‑2** = dans `base.atlas` (**fourni** → OK). Chapitres **3→29** = régions
`chapter_three_map`…`chapter_twenty_nine_map` dans **`external_campaign_maps.atlas`** = **contenu
téléchargeable perdu**. Afficher un chapitre 3+ fait `skin.getDrawable(".../chapter_three_map")`
sur un atlas absent → **exception dans le thread de rendu → crash**. **Même mécanisme que le crash
Temple** (`temple_outside`). C'est la classe de problème « contenu externe manquant ».

**Correctifs mis en place pour diagnostiquer** :
- `DsGame.handleErrorReport` : dumpe désormais le `reportData` de tout `ErrorReport1` reçu →
  fenêtre directe sur les crashes du vrai client (le prochain crash sera lisible côté serveur).

**Fix du crash (en attente de décision, cf. discussion)** : **atlas placeholder peuplé** des vraies
régions (dégradation gracieuse, pas de crash) et/ou **récupération du vrai `external_*.atlas`**
dans une autre version d'APK. **PAS** l'atlas vide (= rustine qui crashe au lookup de région).
Non implémenté — priorité donnée d'abord à l'étude des autres bugs (skills, persistance).

## Récap priorités
| # | Problème | État | Prochaine action |
|---|---|---|---|
| 1 | Skills starters non lançables | ✅ **corrigé** (initSkills mirror) | re‑test combat sur save neuve |
| 2 | Pas de persistance (vrai client) | 🔎 étudié | décider : `DsProgress` (partiel) vs autoritatif |
| 3 | Crash campagne ch. 3+ | 🔎 étudié | décider : placeholder atlas vs vrai contenu (cf. discussion) |
| — | Name / avatar / équipement | ✅ marchent | — |
