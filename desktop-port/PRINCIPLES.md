# Principes & valeurs du portage DragonSoul → desktop

Ce document fige **comment** on travaille. Toute décision technique doit s'y
conformer. (Voir PROGRESS.md pour l'historique, SHIMS.md pour le registre des
substitutions, SERVER_DESIGN.md pour le serveur.)

## 1. On ne modifie JAMAIS le bytecode du jeu
Le jeu (`com.perblue.*` + libGDX obfusqué) est réutilisé tel quel. On ne remplace
que la **couche plateforme** (Application/Graphics/Input/Files/Audio/GL, réseau) par
un backend LWJGL3 maison, et on fournit un **serveur** local. Le seul traitement du
bytecode autorisé est une **normalisation** non-sémantique pour le charger sur desktop
(remap de collisions nom-classe/nom-package en `b_`/`c_`/`utils.b_`, strip d'attributs
`InnerClasses` incohérents laissés par dex2jar). Jamais de patch de logique de jeu.

## 2. Un shim doit être FONCTIONNEL — jamais de « oui oui t'inquiète »
On ne répond pas au jeu par une valeur bidon juste pour « avancer ». Un faux
acquiescement produit un jeu **cassé plus tard**, impossible à déboguer car on a perdu
la cause. Chaque substitution est soit **RÉELLE** (équivalente à l'originale), soit
explicitement notée PARTIEL/NO-OP/FACTICE dans SHIMS.md **avec son risque**. Exemple
vécu : on avait fait renvoyer au client un faux `BuyChests` (fausse récompense) ;
c'était une rustine — on l'a **supprimée** après avoir reversé le vrai mécanisme
(`RequestChestAcknowledgement` → `ChestAcknowledgement`).

## 3. La source de vérité, c'est LE JEU — pas notre mémoire
Toute donnée (format réseau, enums, valeurs, tables, étapes de tuto…) est **extraite du
bytecode / des ressources du jeu**, pas retranscrite de tête. On préfère **réutiliser
les classes du jeu** (sérialisation, `MessageFactory`, `ServerXORConnectionWrapper`,
`ChestHelper`, `TutorialHelper`, enums…) plutôt que réimplémenter un format → **zéro
risque d'hallucination par construction**. Quand on extrait de l'info, on l'extrait
dans un **fichier réutilisable** (ex. `content.<shard>.tab` chargé tel quel, TUTORIAL.md
généré depuis `IntroTutorialActV1`), pas en dur dans un commentaire.

Corollaire pour le **futur serveur autoritatif** : on le construira **en miroir du code
du jeu** (mêmes calculs de coûts/loot/combat via les classes du jeu), pas en
réinventant les règles.

## 4. On travaille « proprement »
On reverse le **vrai mécanisme** avant d'agir. Quand un comportement surprend, on
cherche la cause dans le bytecode (décompilation ciblée), on vérifie par des sondes
opt-in (`DS_PROBE_*`, `DS_TRACE_*`), et on ne code qu'ensuite. On isole les hypothèses
par des tests décisifs (ex. round-trip de sérialisation client/serveur avec les
wrappers réels) plutôt que par supposition.

## 5. Multi-serveur dès le départ
L'architecture serveur prévoit dès maintenant : héberger son propre serveur, lister /
rejoindre, mot de passe optionnel (voir SERVER_DESIGN.md). Les choix locaux ne doivent
pas fermer cette porte.

## 6. La persistance doit être COMPLÈTE et fidèle
Sauvegarder « une partie de joueur » = **tout** l'état (gold, stamina, diamants, héros,
équipement, progression campagne, tuto, lineups, flags…), pas un sous-ensemble. Une
persistance partielle (certains champs sauvés, d'autres réinitialisés) est **pire
qu'inutile** : elle crée des incohérences. Cf. SERVER_DESIGN.md pour la stratégie
(snapshot de l'état vivant du client en phase dev ; serveur autoritatif en miroir
ensuite).

## 7. Reproductibilité & reprise
Le conteneur peut se réinitialiser : on **commit/push régulièrement** sur la branche de
travail, les artefacts lourds (ex. `libs/game-remapped.jar`) sont **régénérables** par
script (`build-remap.sh`) depuis des sources committées, et la doc (PROGRESS.md) porte
le point de reprise. L'identifiant de modèle n'apparaît jamais dans un commit/artefact.
