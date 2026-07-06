# Inventaire complet des écrans — état, problèmes, manques (serveur & assets)

> **But** : avant tout correctif, dresser la carte **complète et ordonnée** de chaque écran du
> jeu — ce qui marche, ce qui manque (données **serveur** vs **assets** contenu), les
> sous‑écrans — pour ensuite planifier des correctifs **robustes** avec une vision d'ensemble.
> On n'implémente **aucun** fix ici : on **observe et on documente**.
>
> **Méthode (par écran)** : ouvrir (`home` puis `nav <DEST>`) → **check visuel** (screenshot) +
> **logs** (serveur = message non répondu ; jeu = asset/atlas manquant, exception) →
> **documenter** → **naviguer les sous‑écrans** s'il y en a → **retour hub** → écran suivant.
>
> **Ordre** : (1) **bâtiments du hub**, (2) **Paramètres/Options** (avatar), (3) **écrans du
> menu déroulant** (Heroes, Items, Mailbox, Medals, Quests…). Une fois tout couvert, on saura
> **exactement** ce qui manque au serveur et les assets manquants au jeu → plan de correctifs.

## Légende statut
- ✅ **OK** : s'ouvre et rend, fonctionnel (éventuel état vide cohérent = normal en solo).
- ⚠️ **Dégradé** : s'ouvre mais incomplet (données serveur absentes / icônes manquantes).
- ❌ **Bloqué** : ne s'ouvre pas (download‑loop contenu, crash, exception).
- ❔ **À balayer** : pas encore testé.

Colonnes « manque » :
- **Serveur** = message que le client envoie et que notre serveur ne répond pas (→ liste vide,
  loading infini). C'est un **shim serveur** à écrire.
- **Assets** = atlas/texture de contenu téléchargeable **perdu** (serveurs morts). C'est un
  **atlas placeholder** à fabriquer (cf. CONTENT_GATE.md verrou #3).

---

## 🔑 Découverte statique — 6 verrous durs de contenu (download‑loop à la nav)
Reversé de `UINavHelper.navigateTo(Destination)` : certaines destinations appellent
`UIHelper.loadRequiredDynamicUI("ui/external_X.atlas")` **avant** d'ouvrir l'écran. Atlas
**absent** (DLC perdu) → `setShouldRestart(true)` → **download‑loop** (« Content Update Failed »).
Les 6 atlas requis à la nav, **tous manquants** :

| Atlas requis (manquant) | Destination | Écran | Statut |
|---|---|---|---|
| `external_temple.atlas` | TEMPLE | TempleLobbyScreen | ❌ loop (confirmé runtime) |
| `external_runes.atlas` | RUNES | RuneShrineScreen | ❌ loop (à confirmer) |
| `external_crypt.atlas` | CRYPT | CryptScreen | ❌ loop (à confirmer) |
| `external_expeditions.atlas` | EXPEDITION | ExpeditionMainScreen | ❌ loop (à confirmer) |
| `external_boss_pit.atlas` | BOSS_PIT | BossPitEntryScreen | ❌ loop (à confirmer) |
| `external_war.atlas` (×2) | GUILD_WAR / WAR_SHOP | (war) | ❌ loop (à confirmer) |

> ⚠️ **Ne pas** naviguer vers ces 6 en balayage runtime sans précaution : ça **fige** le jeu
> (LoadingScreen en boucle) → **relaunch** obligatoire. On les documente surtout en **statique**
> + **1 confirmation** chacun. Les **autres** destinations n'ont pas de gate à la nav → balayage
> runtime fluide en un seul boot.
>
> Fix (plus tard, pas maintenant) : **atlas placeholder peuplé** des vraies régions
> (CONTENT_GATE.md). L'atlas **vide** est une rustine (crash au lookup de région).

---

## 1. Bâtiments du hub

Hub (scroll horizontal) observé : **Temple, Trader, Campaign, Events, Fight Pit, The Mountain,
Boss Pit, Guilds, Sign‑In, Coliseum, Chests, Enchanting, Rankings, Contests**. Déblocage =
niveau d'équipe (`Unlockables`, cf. FEATURES.md) ; joueur de test **dev niv. 61** (tout
débloqué). Point rouge = action dispo.

| # | Bâtiment | Destination | Statut | Manque **serveur** | Manque **assets** | Sous‑écrans | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Campaign | CAMPAIGN | ✅ | — | — | CampaignChooser→BattleInfo→HeroChooser→Attack→Victory | jouable, mur team‑building 1‑4 (CAMPAIGN.md) |
| 2 | Chests | CHESTS | ✅ | — | — | ChestDetail | « Free Now! » rend OK |
| 3 | Enchanting | ENCHANTING | ✅ (vide) | ? | — | — | « No Items Available » (dev sans matériaux) |
| 4 | Coliseum | COLISEUM | ⚠️ | **`GetArenaInfo1`** non répondu → adversaires « Loading… » | — | ArenaLeagueScreen | + **name‑gate** (voir ⭐) ; Fights 5/5 |
| 5 | Guilds | GUILDS | ⚠️ | `ListRecommendedGuilds1` non répondu → liste vide | — | GuildRecommendation/Summary | solo = pas d'autres joueurs |
| 6 | Fight Pit | FIGHT_PIT | ⚠️ | **`GetArenaInfo1`** non répondu → adversaires « Loading… » | — | ArenaLeagueScreen | **name‑gate** ⭐ ; « Fights Left 5/5 », Redeem. S'ouvre après avoir passé le prompt de nom |
| 7 | Trader | MERCHANT | 🔒 | — | — | MerchantScreen | **Verrouillé : « unlocks by completing Chapter 2 »** (notre save featuretest = campaignLevels 0). Gate progression **correct**, pas un bug. + name‑gate ⭐ |
| 8 | Events | EVENTS | ⚠️ vide | pas de données d'events (serveur/contenu) | `external_events.atlas` (optional, dégrade) | EventsWindow (modale) | s'ouvre, zone vide (3 points = pagination), pas d'events actifs |
| 9 | Sign‑In | SIGN_IN | ✅ | (Action1 envoyés) | icône reward = « ? » placeholder (fallback optional OK) | — | « Daily Sign‑in Reward » + bouton **Claim** fonctionnel |
| 10 | Rankings | RANKINGS | ⚠️ | **données de classement non répondues → « Loading… »** | `external_flags.atlas` (optional, dégrade) | RankingScreen | rend OK (Team: Total Power/Team Power/Total Stars ; Leagues: Fight Pit/Coliseum ; Guild) mais lignes « Loading… » |
| 11 | Contests | CONTESTS | ⚠️ | contests planifiés par le serveur (aucun actif) | `external_challenges.atlas` (optional) | — (toast) | toast **« No Contest is running right now »** = correct (rien de planifié) |
| 12 | The Mountain | MOUNTAIN | ❌ | ? | **Spine `monster_sprite_heal.skel/.atlas`** (unit WORLD_ADDITIONAL manquant) | MountainChooserScreen | `Asset not loaded` dans `show()` (capté par navTo, pas de crash) — **classe d'asset différente** (skeleton d'unité, pas atlas UI) |
| 13 | **Temple** | TEMPLE | ❌ | `TitanTempleSummaries` (données) | `external_temple.atlas` | TempleLobby | download‑loop (verrou dur) |
| 14 | **Boss Pit** | BOSS_PIT | ❌ | ? | `external_boss_pit.atlas` | BossPitEntry/Stage | download‑loop (verrou dur) |
| — | **Runes** | RUNES | ❌ | ? | `external_runes.atlas` | RuneShrine | download‑loop + gate shard « future update » |
| — | **Crypt** | CRYPT | ❌ | ? | `external_crypt.atlas` | CryptScreen | download‑loop (verrou dur) |
| — | **Expedition** | EXPEDITION | ❌ | ? | `external_expeditions.atlas` | ExpeditionMain | download‑loop (verrou dur) |
| — | **Guild War / War** | GUILD_WAR / WAR_SHOP | ❌ | ? | `external_war.atlas` | — | download‑loop (verrou dur) |

*(les lignes ❔ sont à remplir par le balayage runtime ; ✅/⚠️ = déjà observé sessions précédentes.)*

### ⭐ Name‑gate — les features sociales/compétitives exigent un nom (transversal)
Reversé de `UINavHelper.navigateTo` : le cas **FIGHT_PIT** (et d'autres) fait
`if (User.getName().isEmpty()) { ChangeNamePrompt.show(); return; }` **avant** d'ouvrir l'écran.
La modale **« What's your new name? »** (champ pré‑rempli « Player », Cancel/Ok/dé) se pose
**par‑dessus** MainMenuScreen (donc `getScreen()` reste MainMenuScreen).
- ✅ **SetPlayerName marche côté serveur** : cliquer **Ok** envoie `SetPlayerName1`, notre serveur
  l'**enregistre** (`SetPlayerName -> "Player" (recorded)`), **et** la feature en attente s'ouvre
  (Fight Pit a envoyé `GetArenaInfo1` juste après). Donc le prompt **débloque bien** la nav en cours.
- ⚠️ **MAIS le prompt RÉAPPARAÎT** à la feature sociale **suivante** (re‑vu sur MERCHANT). Le
  nom/flag n'est **pas durablement effacé** côté client. Révision de « marche de bout en bout » :
  le serveur **enregistre**, mais le gate n'est **pas persistant** → à investiguer.
  - Hypothèse : `User.getName()` reste **vide** au runtime (le client ne commit le nom que sur
    **réponse serveur** à `SetPlayerName`, qu'on n'envoie pas), OU le flag `FREE_NAME_CHANGE`
    n'est consommé que sur réponse. ⇒ **manque serveur probable : répondre à `SetPlayerName`**.
- **Méthode de balayage** : pour les features name‑gated, `nav` → si prompt → `tap Ok` → l'écran
  s'ouvre → screenshot.

---

## 2. Paramètres / Options (écran avatar) — ❔ à balayer
Accès : bouton avatar (haut‑gauche) / chevron (haut‑droite). Déjà noté : rend OK, « Account
Date 1969/12/31 » (creationTime cosmétique), server « Foam Finger (1) », version 2.22.0.
→ à re‑balayer proprement + sous‑onglets (options, compte, support…).

---

## 3. Écrans du menu déroulant (tiroir) — en cours
Chevron haut‑droite → Heroes, Items, Mailbox, Medals, Quests… (+ autres).

| Écran | Destination | Statut | Manque serveur | Manque assets | Notes |
|---|---|---|---|---|---|
| Heroes | HERO_MANAGEMENT | ✅ | — | — | rend OK : Dragon Lady 85 / Unstable Understudy 80 (1★, slots gear vides) + liste **« not summoned yet »** (Andragonus 0/80, Abyss Dragon 0/80, Anubis Dragon 0/80, Vermilion Priestess 0/10, Snapper Bone 0/30, White Tigress 0/80). Filtres Power/Level/Rarity/Stars/Role/Name |
| Items | ? | ❔ | ? | ? | tiroir → à ouvrir (probable window) |
| Mailbox | ? | ❔ | ? | ? | à balayer |
| Medals | ? | ❔ | ? | ? | à balayer |
| Quests | ? | ❔ | ? | ? | à balayer |

> 🛠️ **Fix outillage (fait)** : les screenshots montraient le **hub** au lieu de l'écran plein
> (Heroes, Rankings). Cause : le jeu **charge les écrans en async** — `getScreen()` renvoie le
> nouvel écran (donc `tutinfo` le voit) mais `render()` dessine encore le **précédent** jusqu'à
> `LoadState==CREATED`. Un `wait` fixe capturait donc l'ancien écran. Ajout commande DsDriver
> **`waitloaded`** : cède les frames jusqu'à `CREATED` (+ court settle), puis screenshot fiable.
> Motif : `nav X` / `waitloaded` / `screenshot`.

---

## 4. Synthèse (à compléter en fin d'inventaire)
### 4.a Manques **serveur** (shims à écrire) — messages non répondus
- `ListRecommendedGuilds1` (Guilds) — liste vide.
- adversaires Coliseum (message à identifier) — « Loading… ».
- `TitanTempleSummaries` (Temple) — à confirmer.
- *(compléter au fil du balayage.)*

### 4.b Manques **assets** (atlas placeholder à fabriquer) — DLC perdu
Verrous durs (nav) : `external_temple / runes / crypt / expeditions / boss_pit / war`.
Optionnels (dégradent déjà) : `external_events / items / skills / hero_tags / …`.
- *(compléter : régions requises par écran, pour l'atlas placeholder.)*

### 4.c Plan de correctifs (après inventaire complet)
- *(à rédiger une fois la carte complète — priorisation serveur vs assets.)*
