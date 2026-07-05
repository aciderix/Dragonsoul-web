# DragonSoul — Protocole réseau & contenu (reverse depuis le jeu)

> Étude établie **depuis le bytecode du client** (source de vérité), pas depuis
> l'ancien serveur. Objectif : savoir exactement ce qu'un serveur doit servir
> pour franchir l'écran de chargement (login → BootData) et jouer.

## 0. Cible réseau (ServerType — patché dans cet APK)

`com.perblue.rpg.ServerType` (constructeur `(protocol, gameHost, gamePort, contentLocation)`):

| Type | gameHost | gamePort | contentLocation |
|---|---|---|---|
| **LIVE (défaut)** | **127.0.0.1** | **8080** (TCP) | **http://127.0.0.1:8080/live/index.txt** |
| LOCAL | localhost | 8080 | http://s3.../dev/index.txt |
| DEV/QA1/QA2/TRUNK | *.dragonsoulgame.com | 8080/443 | s3 .../index.txt |

⇒ Cet APK « Fixed2 » a été patché : **LIVE pointe vers `127.0.0.1:8080`** pour le
jeu (TCP) **et** le contenu (HTTP). Un seul serveur local sur 8080 doit gérer les
deux (router selon les 1ers octets : `GET ` = HTTP contenu, sinon protocole jeu).

## 1. Transport de jeu (TCP) — ENTIÈREMENT reversé

- Connexion : **`java.net.Socket`** brut vers `gameHost:gamePort`, `TcpNoDelay=true`,
  `KeepAlive=true`, `SoTimeout` (classe `com.perblue.a.a.k`, framework « grunt »
  `com.perblue.a.a`). Un thread lecteur dédié.
- **Framing par message** (méthode `k.a(message)`) :
  ```
  [ int32 little-endian : longueur du corps wrappé ][ corps wrappé ]
  ```
  - longueur écrite par `com.perblue.common.a.b.packInt` = **int32 LE** (4 octets,
    octet de poids faible d'abord). ⚠️ nom trompeur, ce n'est PAS un varint.
  - corps wrappé = `codec.wrapOut( message.writeAll(writer) )`.

### 1.1 Codec (chiffrement + compression) — clé EN DUR
- Interface `com.perblue.a.a.a` : `wrapOut(byte[])`, `wrapIn(byte[])`, `closeIn/Out`.
- Impl jeu : **`com.perblue.rpg.network.XORConnectionWrapper extends com.perblue.common.i.a`**
  - côté client : `ClientXORConnectionWrapper`, côté serveur : **`ServerXORConnectionWrapper`**
    (présent dans le bytecode → réutilisable pour NOTRE serveur).
- Algo (`com.perblue.common.i.a`) : **Deflate puis XOR roulant** par clé.
  - `wrapOut` = `Deflater` (reset/setInput/deflate/finish) → XOR roulant (`posOut`, `xorWithKey`).
  - `wrapIn` = XOR inverse → `Inflater`.
- **Clé XOR (8 octets, en dur dans ClientXORConnectionWrapper)** :
  ```
  { 2, -90, -18, -43, -48, -68, 106, -104 }   // signés
  { 0x02, 0xA6, 0xEE, 0xD5, 0xD0, 0xBC, 0x6A, 0x98 }  // hex
  ```
  Aucun handshake de clé : c'est un secret partagé constant. Le serveur utilise la
  même clé (XOR symétrique ; `ServerXORConnectionWrapper` l'embarque).

### 1.2 Modèle de message
- Base **`com.perblue.a.a.i`** : `messageNumber` (int), `responseMessageNumber` (int),
  `version` (`com.perblue.a.a.l`), `getFullName()`, `writeAll(writer)` (en-tête + data),
  `writeData`/`writeDataV1` (sérialisation versionnée des champs).
- Écriture (`k.a`) : `n++` → `message.setMessageNumber(n)` ; si le message a un
  callbackRouter, il est enregistré dans une map `messageNumber → routeur` (matching
  requête/réponse via `responseMessageNumber`).
- Registre : **`com.perblue.rpg.network.messages.MessageFactory`** (`implements com.perblue.a.a.j`),
  `getInstance().readMessage(reader)` désérialise n'importe quel message.
- **649 classes de messages** dans `com.perblue.rpg.network.messages.*`, non obfusquées.
  Chacune : `FULL_NAME`, ctor `()` (envoi), ctor `(reader)` (réception), `writeData`.
  - Login : **`ClientInfo`** (FULL_NAME = `ClientInfo1`) — envoyé par le client.
  - Réponse : **`BootData`** (FULL_NAME = `BootData1`) — attendue du serveur.

### 1.3 Séquence de login (à confirmer/compléter)
1. Client connecte le socket TCP.
2. Client envoie **`ClientInfo1`** (userID, uniqueIdentifier, version, platform,
   shardID, langue/pays/tz, infos device, isReconnect, loginRequestID, statVersions,
   privateLoginInfo…).
3. Serveur doit répondre **`BootData1`** (serverTime, firstBoot, userInfo,
   privateUserInfo, userExtra…). Champs requis exacts : **à déterminer** en
   construisant un BootData minimal et en observant ce que le client déréférence.

## 2. Update de contenu (HTTP) — bloque le boot actuellement

- `AssetUpdater` télécharge un manifeste `index.txt` puis les archives manquantes.
- Colonnes du manifeste (constantes `AssetUpdater.COL_*`) :
  `CATEGORY, COMPRESSION, DENSITY, ENVIRONMENT, REVISION, SIZE, URL`.
- Catégories vérifiées au boot : `WORLD_ADDITIONAL, UI_DYNAMIC, SOUND, TEXT`.
- Pour **débloquer** : servir sur `GET /live/index.txt` un manifeste cohérent avec
  la révision embarquée (⇒ « nothing to download ») pour que l'AssetUpdater réussisse
  et laisse le client passer à la connexion de jeu.
- Séparateur/format exact de ligne : **à confirmer** (probablement TSV avec en-tête).

## 3. Architecture serveur retenue (la plus fidèle)

**Serveur en Java réutilisant les classes du jeu** (`game-remapped.jar`), pas une
réimplémentation binaire :
1. `ServerSocket` sur 8080. Peek des 1ers octets → router HTTP (contenu) vs jeu.
2. **Contenu** : mini-serveur HTTP répondant `index.txt` (rien à télécharger).
3. **Jeu** : envelopper le socket avec **`ServerXORConnectionWrapper`** (codec exact),
   lire les frames `[int32 LE len][wrapIn→ MessageFactory.readMessage]`, obtenir
   `ClientInfo`, puis construire et renvoyer `BootData` (via `new BootData()` +
   champs + `writeAll` + `wrapOut` + préfixe longueur).

Avantage : sérialisation/chiffrement 100 % identiques au client (mêmes classes).

## 4. Points restants (à faire)
- [ ] Format exact de `writeAll` (en-tête avant `writeData` : nom/hash + version ?).
- [ ] Séparateur exact d'`index.txt` + révision attendue.
- [ ] Champs **minimaux requis** de `BootData1` pour ne pas planter le client.
- [ ] Boucle serveur complète (accept, décodage ClientInfo, réponse BootData, puis
      messages suivants : WorldData, etc.).
- [ ] Inventaire fiable des assets téléchargés manquants (WORLD_ADDITIONAL/UI_DYNAMIC/
      SOUND/TEXT) pour compléter ou retirer proprement.

## 5. Fichiers clés (client, pour reprise)
```
com.perblue.rpg.ServerType                         # adresses (LIVE=127.0.0.1:8080)
com.perblue.rpg.network.NetworkProvider            # connect/sendMessage/setAddress
com.perblue.a.a.k                                  # connexion TCP + framing
com.perblue.a.a.d                                  # builder de connexion (grunt)
com.perblue.common.a.b.packInt                     # int32 LE (framing longueur)
com.perblue.common.i.a                             # codec XOR+Deflate
com.perblue.rpg.network.{Client,Server}XORConnectionWrapper  # codec + clé
com.perblue.rpg.network.messages.MessageFactory    # readMessage (registre)
com.perblue.rpg.network.messages.ClientInfo/BootData
com.perblue.rpg.assetupdate.{AssetUpdater,CategoryUpdater}   # contenu HTTP
```

---
## Mise à jour — verrou de boot identifié : contenu additionnel manquant

Test empirique avec le serveur v0 (index.txt vide) :
- OK: l'AssetUpdater récupère index.txt -> "nothing to download, update complete".
- BLOQUE: MISSING_ADDITIONAL=true. Le jeu vérifie des fichiers repères par
  catégorie: world/units/hero_claw_man.atlas (WORLD_ADDITIONAL),
  ui/external_skins.atlas (UI_DYNAMIC), sound/war_you_won_broken_shield.ogg (SOUND).
  Ce contenu jadis téléchargé manque en local.
- La connexion (RPGMain.startNetwork -> connectToServer) est GATEE par la
  complétude du contenu: tant que MISSING_ADDITIONAL=true, le jeu boucle sur le
  chargement et n'ouvre jamais le socket de jeu (0 connexion TCP cote serveur).

Deux pistes (alignees avec "recenser puis retirer/completer"):
1. Recensement fiable du contenu requis (marqueurs + listes des categories).
2. Lever le gate sans toucher au bytecode: placeholders des repères OU flag/prefs
   (shouldDownloadAdditionalWorld/missingAdditionalWorld), puis tolerer les assets
   manquants a l'usage.
3. En parallele: serveur de login (repondre BootData a ClientInfo).

---
## Mise à jour — la connexion est en DEUX étapes (login HTTP puis jeu TCP)

Après avoir franchi le gate de contenu (l'écran de chargement réel s'affiche
désormais, cf. PROGRESS.md), on a instrumenté un serveur d'écoute sur 8080 et
observé le trafic client :
- ✅ `GET /live/index.txt` (AssetUpdater) — reçu et servi.
- ❌ **Aucune** connexion TCP « jeu ». Le jeu **n'ouvre jamais** le socket de jeu.

Décompilation de `RPGMain` : la connexion passe par **deux étapes**.

### Étape 1 — Login HTTP : `RPGMain.connectToLoginServer(userID, status, ServerType)`
- Construit une `HashMap` de paramètres :
  `uniqueIdentifier, imei, aPMacAddress, email, advertisingIdentifier, userID,
   shardID, platform, ...` (depuis `DeviceInfo`).
- **POST** vers l'endpoint **`/login`** (relatif à `gameHost:gamePort` =
  `http://127.0.0.1:8080/login`).
- La réponse porte un **status** (`"Got status <n> from login request"`), gère un
  `"redirect"` (bascule `ServerType.DEV`) ; en cas d'échec →
  `tryShowingLoginErrorPrompt` / `handleServerConnectionFailed` (mode `OFFLINE`).
- En succès → appelle **`startNetwork(userID, status, ChangeServer)`**.

### Étape 2 — Jeu TCP : `RPGMain.startNetwork(...)`
- Ouvre le **`java.net.Socket`** vers le serveur de jeu (adresse issue du login),
  enveloppe avec `ServerXORConnectionWrapper`, envoie **`ClientInfo1`**, attend
  **`BootData1`** (cf. sections précédentes). `BootData` reçu →
  `MainMenuScreen.updateFromNetwork` met `loadState=CREATED` → home visible.

### Conséquence pour notre serveur (sur 8080)
Il doit gérer **trois** rôles (routage par peek/verbe, déjà amorcé dans DsServer) :
1. `GET /live/index.txt` — manifeste de contenu (fait, v0).
2. **`POST /login`** — répondre l'adresse du serveur de jeu + session/status OK
   (à reverser : format exact de la réponse attendu par `connectToLoginServer`).
3. **TCP jeu** — `ServerXORConnectionWrapper` : lire `ClientInfo1`, renvoyer
   `BootData1` (champs minimaux requis à déterminer empiriquement).

Prochaine étape concrète : implémenter `POST /login` (le plus court chemin pour que
le jeu ouvre enfin le socket de jeu), puis le handshake `ClientInfo`→`BootData`.

---
## ✅ Protocole de jeu opérationnel de bout en bout (via les classes DU JEU)

Serveur v1 (`server/DsGame.java`, lancé par `run-server.sh` avec le classpath du
jeu) : **réutilise la sérialisation du jeu** — aucune réimplémentation du format
binaire, donc zéro risque d'hallucination. Vérifié en exécution :

- **Décodage `ClientInfo1`** : `unpackInt` → `wrapper.wrapIn` →
  `MessageFactory.readMessage(reader)` avec `new ServerXORConnectionWrapper()`.
  Le serveur affiche le `ClientInfo` complet (langue, platform, uniqueIdentifier,
  userID, timeZone, loginRequestID…). Le codec XOR+Deflate du jeu fonctionne tel quel.
- **Encodage `BootData`** : `new BootData()` → `writeAll(writer)` →
  `wrapper.wrapOut` → `packInt` → socket. Envoyé (363 octets wrappés).
- **Le client ACCEPTE le BootData** : `RPGMain.handleBootData` s'exécute, puis le
  client enchaîne (`ClockChange1`). La pile réseau complète est donc bonne.

Types encodés/décodés via les classes du jeu ; ceux dont le package entre en
collision avec une classe homonyme (`com.perblue.a.a.a.a` lecteur,
`com.perblue.a.a.a.b` écrivain, `com.perblue.common.a.b` pack/unpackInt) sont
atteints par réflexion. Le serveur tourne avec `libs/game-remapped.jar` (mêmes
classes que le client → sérialisation identique par construction).

### Blocage suivant (hors réseau) : chargement de classe dex2jar
`handleBootData` déclenche le `<clinit>` de `GeneralSkillStats` (données de skills)
qui lève `IncompatibleClassChangeError: com.perblue.rpg.simulation.DamageSource and
DamageSource$DamageSourceType disagree on InnerClasses attribute`. C'est un artefact
**dex2jar** (attribut InnerClasses incohérent), pas un souci de serveur/BootData ni
un shim. À corriger côté préparation du bytecode (passe ASM : normaliser/retirer les
attributs InnerClasses, comme le remap existant). Une fois levé, les données de jeu
se chargent et on peut compléter les champs de `BootData` (userInfo, etc.).
