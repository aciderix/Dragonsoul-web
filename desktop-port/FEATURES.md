# Balayage des features — « faire fonctionner le reste du jeu »

> Objectif : après le tuto INTRO, vérifier chaque écran/feature du hub et cataloguer
> ✅ marche / ⚠️ dégradé / ❌ cassé (+ cause). Méthode : ouvrir l'écran (pilote DsDriver),
> screenshot, surveiller le **log serveur** (message non géré = besoin serveur) et le **log
> jeu** (exception / asset manquant). Corriger proprement (shim fonctionnel, sourcé du jeu).

Joueur de test : post‑tuto, niveau 2, gold 2285, 3 héros (Dragon Lady, Unstable Understudy,
Centaure). Hub scrollable : Temple, Trader, Campaign, Events, Fight Pit, Boss Pit, Guilds,
Sign‑In, Enchanting, Coliseum, Chests, Rankings, The Mountain, Contests + tiroir (Heroes,
Items, Mailbox, Medals, Quests).

## 🔑 Déblocage des features = table `Unlockables` du jeu (headless, source de vérité)
`Unlockables.getTeamLevelReq(Unlockable)` = niveau d'équipe requis. Accessible ⇔
`teamLevel >= req`. **Pas de lecture de pixels** — on lit la table du jeu.

Échelle (entrées « par niveau » BOSS_PIT_*_N omises) :
```
 0  TRADER, SOULMART        20  BAZAAR, CHALLENGES, SKINS, FIGHT_PIT_QUICK
 3  WORLD_CHANNEL           25  EXPEDITION
 5  RANKINGS                30  CRYPT_RAID, FAST_FORWARD
 8  POWER_UPGRADE           35  ENCHANTING, EXPEDITION_QUICK
10  FIGHT_PIT               38  TITAN_TEMPLE
11  ELITE_CAMPAIGN          41  BLACK_MARKET
12  ALCHEMY                 42  TREASURE_CRYPT
14  THE_MOUNTAIN            44  COLISEUM
15  GUILDS                  50  GUILD_WAR, PURPLE_CHEST
                            55  BOSS_PIT, ADVANCED_TAGS
                            61  RUNES     85 ORANGE_CHEST   151 EXPERT_CAMPAIGN
```
+ CAMPAIGN / CHESTS = core (toujours) ; Events / Sign‑In = daily (toujours).

**Méthode de test** : monter naturellement jusqu'à 35/55/… est irréaliste (et bute sur le
mur 1‑4). Pour le **dev**, prévoir un **override `-Dds.teamLevel=N`** dans `DsUserState`
(débloque les features à tester) — c'est de la **config dev**, pas une invention de donnée de
jeu (le jeu recalcule stamina/max‑hero‑level depuis `teamlevelstats.tab` pour ce niveau).

## ⚠️ Règle d'accès (info joueur)
- **Texte gris** sous un bâtiment = **verrouillé** (déblocage par **niveau d'équipe**) →
  normal, pas un bug. **Texte doré** = **accessible**.
- Le hub **scrolle horizontalement** (gauche/droite) pour révéler d'autres bâtiments.
- Au niveau 2 : accessibles = **Campaign, Chests, Events, Sign‑In, Enchanting, Rankings**.
  Verrouillés (gris, normaux) = Temple, Trader, Fight Pit, Boss Pit, Guilds, Coliseum,
  The Mountain, Contests → à tester en montant de niveau (phase ultérieure).
- Écran **Player/Options** (avatar) : ✅ rend OK. ⚠️ « Account Date 1969/12/31 » (creationTime
  cosmétique à corriger). Server affiché = « Foam Finger (1) » (shard 1). Version 2.22.0.

## 🧭 Navigation headless — `UINavHelper.navigateTo(Destination)` (outil)
Le jeu a un enum **`UINavHelper$Destination`** (CAMPAIGN, ENCHANTING, FIGHT_PIT, BOSS_PIT,
GUILDS, COLISEUM, TEMPLE, RANKINGS, RUNES, MERCHANT, HERO_MANAGEMENT, EVENTS, SIGN_IN,
ALCHEMY, BAZAAR, BLACK_MARKET, EXPEDITION, CRYPT, MOUNTAIN, CONTESTS, SKINS, VIP…) et
`navigateTo(Destination, source, args…)`. Commande DsDriver **`nav <DEST>`** → saute
directement sur l'écran, **zéro pixel**. (Verrouillé → upsell du jeu = normal.)

### Découvertes du 1er balayage (dev player niv. 61, tutStep=72)
- ✅ **HERO_MANAGEMENT (Heroes)** : rend OK (Dragon Lady 85, Unstable Understudy 80).
- ✅ **ENCHANTING** : l'écran s'ouvre (« Materials / No Items Available » = vide, normal pour
  un joueur sans matériaux).
- ⚠️ **Prompt « What's your new name? »** : modale de **nouveau compte** (nom = placeholder
  « Player ») qui **bloque la nav** tant qu'on ne la ferme pas. → à gérer (donner un vrai nom
  au joueur, ou flag « nom choisi », ou la dismisser au boot).
- ⚠️ **`RejectedExecutionException`** (WARNING) : un task de la connexion client
  (`com.perblue.a.a.k`) rejeté car l'executor est **Terminated** → risque pour les features
  qui **envoient** au serveur (fetch de données). À investiguer (l'executor de la connexion
  se ferme‑t‑il après le boot ? cassé par le skip tutStep=72 ?).
- ⚠️ **BOSS_PIT** via `nav` n'a pas navigué (bloqué par la modale, ou besoin d'un paramètre
  boss). À re‑tester une fois la modale gérée.

## Catalogue (en cours)
| Feature | Statut | Notes / cause |
|---|---|---|
| Campaign | ✅ | tuto + campagne auto (voir CAMPAIGN.md), mur team‑building à 1‑4 |
| Chests | ✅ | coffre du tuto OK (ack serveur) ; à revérifier hors tuto |
| Heroes | … | |
| Items | … | |
| Enchanting | … | |
| Trader | … | |
| Boss Pit | … | |
| Fight Pit | … | |
| Coliseum | … | |
| Guilds | … | |
| Temple | … | |
| Events | … | |
| Sign‑In | … | |
| Rankings | … | |
| The Mountain | … | |
| Contests | … | |
| Mailbox / Medals / Quests | … | |
