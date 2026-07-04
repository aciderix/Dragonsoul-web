# DragonSoul Desktop — Design multi-serveurs (auto-hébergement, liste/join, mot de passe)

> Exigences (dès le départ) :
> 1. N'importe qui peut **héberger son propre serveur**.
> 2. Le client peut **lister et rejoindre** des serveurs.
> 3. **Sécurité optionnelle par mot de passe**.
>
> Contrainte forte : le jeu ouvre lui-même son socket vers `ServerType.LIVE` =
> `127.0.0.1:8080` (patché dans l'APK), avec une clé XOR **fixe** codée en dur, et
> son propre protocole (voir PROTOCOL.md). **On ne modifie pas le bytecode du jeu.**

## Idée directrice : une passerelle locale (client) + un serveur hébergeable

```
   [ Jeu (RPGMain) ]  --TCP/HTTP-->  127.0.0.1:8080  [ Passerelle locale ]
                                                           |  (choix serveur + mdp,
                                                           |   auth hors-protocole-jeu)
                                                           v
                                        [ Serveur hébergé ]  host:port  (Java, réutilise
                                          les classes du jeu : login→BootData, contenu)
```

Le jeu croit toujours parler à `127.0.0.1:8080`. **La passerelle locale** (dans notre
launcher) :
- sert/relaie le **contenu HTTP** (`GET /live/index.txt`) ;
- relaie le **protocole de jeu TCP** vers le serveur distant choisi ;
- gère l'**auth mot de passe** entre passerelle et serveur, **en dehors** du protocole
  de jeu (le jeu n'en sait rien) ;
- route par les 1ers octets reçus (`GET ` → HTTP contenu, sinon → jeu).

Avantages : zéro modification du jeu ; le choix du serveur et le mot de passe vivent
100 % côté launcher/serveur (qu'on contrôle) ; le protocole de jeu reste intact.

> Alternative simple pour le « direct connect » : au lieu de relayer, on peut aussi
> réécrire par réflexion `ServerType.LIVE.gameHost/gamePort/contentLocation` au
> démarrage vers le serveur choisi (sans passerelle). Mais la passerelle est
> nécessaire dès qu'on veut gérer le **mot de passe** sans toucher au jeu → on garde
> la passerelle comme chemin principal, la réécriture directe comme cas « LAN sans mdp ».

## Composants

### A. Client desktop (notre launcher)
1. **Sélecteur de serveur** (écran pré-jeu, notre UI — pas l'UI du jeu) :
   - onglets : **Direct** (IP:port + mdp), **LAN** (découverte UDP), **Communauté**
     (liste distante), **Favoris/récents**.
   - affiche nom, joueurs, latence (ping), 🔒 si mot de passe requis.
2. **Passerelle locale** (`127.0.0.1:8080`) : contenu + relais jeu + auth mdp.

### B. Serveur hébergeable (`dragonsoul-server`, Java)
- Réutilise les classes du jeu (`ServerXORConnectionWrapper`, `MessageFactory`,
  `BootData`…) pour une sérialisation/chiffrement **identiques** au client.
- Modules : **login** (ClientInfo→BootData), **monde/état**, **contenu** (index.txt).
- Config : nom, port, mot de passe (optionnel), déclaration au directory (optionnel).
- Persistance des comptes/progression (fichier/SQLite au début).

### C. Découverte (discovery)
- **Direct IP** : toujours dispo (saisie manuelle).
- **LAN** : le serveur émet un beacon UDP (broadcast) ; le client écoute → liste locale.
- **Communauté** : un **index de serveurs** (JSON hébergé) ; les serveurs publics s'y
  ajoutent ; le client le récupère. Simple, décentralisable (URL configurable).
- **(Option) Master server** : petit service où les serveurs font un heartbeat et que
  le client interroge. Plus de features (statut live, filtres) mais un point central.

## Mot de passe (sécurité optionnelle)

Auth **entre la passerelle et le serveur**, hors protocole de jeu :
- **Niveau 1 — porte d'accès** (recommandé par défaut) : à l'ouverture de la connexion
  jeu, la passerelle envoie une trame d'auth (challenge-réponse : le serveur envoie un
  nonce, la passerelle renvoie `HMAC(mdp, nonce)`), le serveur valide puis on bascule
  en relais transparent du protocole de jeu. Rejette les mauvais mdp proprement.
- **Niveau 2 — chiffrement lié au mdp** (option renforcée) : dériver la clé du codec
  XOR de la connexion passerelle↔serveur depuis le mdp (`KDF(mdp)`) au lieu de la clé
  fixe. Sans le bon mdp, le trafic est indéchiffrable. (La liaison jeu↔passerelle reste
  en clé fixe, en local loopback.)
- Serveur **sans** mot de passe : pas d'étape d'auth, connexion directe.

## Intégration avec le protocole reversé (PROTOCOL.md)
- Le relais jeu manipule des **trames** `[int32 LE len][corps wrappé]` : la passerelle
  peut relayer octet à octet sans déchiffrer (elle ne connaît pas forcément la clé jeu),
  l'auth mdp se faisant sur un préambule séparé avant le 1er octet de jeu.
- Le serveur, lui, déchiffre avec `ServerXORConnectionWrapper` (clé fixe) et lit
  `ClientInfo` via `MessageFactory`, répond `BootData`.

## Découpage d'implémentation (incrémental, vérifiable)
1. **Serveur v0 (contenu)** : sert `index.txt` « rien à télécharger » → **débloque le boot**.
2. **Passerelle v0** : loopback 8080 → relaie vers `host:port` configuré (direct connect,
   sans mdp) + sert le contenu. Vérifie que le jeu atteint la connexion de jeu.
3. **Serveur v1 (login)** : accept + `ServerXORConnectionWrapper` + lit `ClientInfo` →
   répond `BootData` minimal → **franchir le loading**.
4. **Sélecteur de serveur** (UI launcher) : Direct + LAN + Communauté.
5. **Mot de passe** : auth passerelle↔serveur (niveau 1), puis option niveau 2.
6. **Directory** : beacon LAN + index communautaire (+ option master server).

## Choix à confirmer
- Périmètre découverte au départ (Direct / LAN / Communauté / Master).
- Mot de passe : porte d'accès seule, ou aussi chiffrement lié au mdp.
- Persistance serveur : fichier JSON ou SQLite d'emblée.
