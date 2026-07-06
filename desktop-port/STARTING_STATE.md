# État de départ d'un vrai joueur — vérité de gameplay & bug de notre seed

> **Source de vérité** : observation d'une **vidéo des 30 premières minutes** du vrai jeu
> (2026‑07‑06). À croiser/confirmer avec le bytecode (voir §« Étude bytecode »). Nos valeurs
> (PRINCIPLES.md) : le JEU est la source de vérité, **jamais** de valeurs inventées.

## 1. Ce que fait un VRAI joueur (vidéo)

### Roster de départ
- Le joueur commence avec **Dragon Lady** et **Unstable Understudy** *avant* de débloquer
  le **Centaure** (« Centaur of Attention »), obtenu via le coffre du tuto.
- **Electroyeti** se débloque **en avançant dans le chapitre 1** (comme le Centaure vient
  de sa scène). ⇒ l'équipe se **construit au fil du chapitre 1**, elle n'est pas figée.

### Ressources de départ (≠ ce qu'on seed !)
| Ressource | Vrai jeu | Notre seed (FAUX) |
|---|---|---|
| Or | **0** | 100000 |
| Diamants | **0** | 500 |
| Énergie (stamina) | **60 / 60** | 120 / 60 |
- La **limite** de stamina **augmente** avec « x truc à étudier » (progression — au moins le
  **niveau de compte** : on a observé max 60→62 à la montée niv. 1→2 ; à confirmer si un
  bâtiment/recherche l'augmente aussi).

### Déroulé du tuto
- Le joueur **avance le tuto sans problème** et **termine TOUS les combats du chapitre 1**.
- Ensuite la **flèche jaune** l'oriente vers le **chapitre 2**.
- ⇒ Avec la **bonne équipe** (Dragon Lady + Unstable Understudy + Centaure, puis Electroyeti),
  le **1‑4 (boss dragon) est battable**. Notre défaite en 1‑4 vient d'une **équipe
  incomplète** (Centaure seul), **pas** d'un mur de difficulté légitime.

### Amélioration des héros
- Au fur et à mesure qu'il **loot de l'équipement**, le joueur **améliore ses héros** :
  flèche en **haut à droite** (tiroir de nav) → bouton **Héros**.

### Affordance UI
- Un **petit point rouge** sur un bouton = **une action est disponible** là (héros à
  équiper/évoluer, récompense à réclamer, etc.). Utile pour piloter « proprement » sans
  deviner : suivre les points rouges = suivre ce que le jeu propose.

## 2. Notre BUG — le seed `ds.tutStep=41` est une rustine qui hallucine l'état

Pour gagner du temps en dev on saute au coffre via `-Dds.tutStep=41` **et** on seed des
ressources dans `DsUserState` (`newPlayer` : 100000 or / 500 diamants / 120 stamina, +
`grantHeroes`). Conséquences, **contraires à nos valeurs** :

1. **Héros de départ perdus** : sauter l'intro du tuto shunte l'octroi de **Dragon Lady** et
   **Unstable Understudy** → équipe incomplète dès le départ → **faux mur en 1‑4**.
2. **Ressources inventées** : 100000/500/120 ne viennent **pas du jeu** — pure hallucination.
   Le vrai départ est **0 / 0 / 60**.
3. Donc toute notre « save » de dev repose sur un état **non canonique**.

## 3. Résolution propre (direction — respecter PRINCIPLES)

Le client est **autoritatif‑local** : pour un **vrai nouveau joueur**, le jeu initialise
lui‑même ressources + héros + tuto. La voie propre :

- **Ne PAS seed** un état post‑tuto ni des ressources. Pour `firstBoot`, envoyer un
  `BootData` **minimal/neuf** et **laisser la logique du jeu jouer le tuto depuis le début
  (step 0)** → le jeu accorde Dragon Lady + Unstable Understudy, met 0/0/60, puis le Centaure
  au coffre, Electroyeti en avançant, etc. — **zéro valeur inventée**.
- Garder un **raccourci dev optionnel** SÉPARÉ et honnête (ex. rejouer depuis une save réelle
  déjà avancée par le jeu), mais **jamais** en injectant des valeurs à la main.
- La persistance snapshot (déjà en place) capture ensuite l'état **réel** produit par le jeu.

## 4. Étude bytecode (à remplir — vérité du code)

- [ ] Où le jeu initialise les ressources d'un **nouveau joueur** (0 or / 0 diamants /
      60 stamina, cap 60) ?
- [ ] Où/quand le tuto **accorde** Dragon Lady & Unstable Understudy (UnitType + étape) ?
- [ ] Comment se déroulent les **premières étapes** du tuto (step 0 → coffre) : combat
      initial scripté avec l'équipe de départ ?
- [ ] Mécanique d'**augmentation du cap de stamina** (niveau de compte ? bâtiment ?).
- [ ] Confirmer que **rien** ne bloquait le tuto depuis step 0 (raison initiale du saut à 41).

## 5. TODO — automatisation du pilotage en DEV (économiser contexte / captures)

> **DEV uniquement**, jamais en prod (le vrai joueur pilote lui‑même). But : réduire le
> nombre de captures d'écran et de tours pour piloter le jeu pendant nos tests.

- [ ] **Auto‑clic sur `>>` (passer à la vague suivante)** : sur le modèle de l'auto‑cast des
      skills (`autotap` sur le portrait), ajouter un auto‑clic sur le bouton **« Tap to
      Continue » / `>>`** entre les vagues de combat, pour enchaîner sans intervention.
- [ ] **Détection robuste de l'action attendue (flèche jaune)** pour l'automatiser aussi :
      repérer de façon fiable la cible que le tuto met en avant (flèche jaune / **point
      rouge** sur les boutons) et cliquer dessus — **tant que ça ne casse rien** (doit
      permettre d'aller **équiper / améliorer les héros**, pas seulement enchaîner les
      combats). Idéalement lire l'état du jeu (objet UI / tuto en mémoire) plutôt que le
      pixel, pour la robustesse.
- Bénéfice : piloter des séquences longues (finir un chapitre, refaire le tuto proprement)
  avec très peu de captures et de tours.
