# Versions DragonSoul & verrou de contenu — cartographie

Objectif : trouver la version **la plus riche** qui **boote sans le verrou de
contenu additionnel** (la boucle de redémarrage qui nous bloque sur 2.22.0).

## Deux verrous distincts (rappel, voir CONTENT_GATE.md)
- **Gate #1** — `UIHelper.checkForWorldAdditional()` → `setShouldRestart()` :
  **boucle de redémarrage** (le blocage principal « creating splash screen »).
- **Gate #2** — `AssetUpdater` / `MISSING_ADDITIONAL` : dialogue « Content Update
  Failed » (présent dès 2.14).

## Détection (grep du bytecode `classes*.dex` de chaque APK)
Marqueur du Gate #1 = présence de `checkForWorldAdditional`.

| Version | Taille | Gate #1 (restart-loop) | Login ClientInfo1/BootData1 |
|---|---|---|---|
| 1.0.2 (build 2015) | 38 Mo | **NON** (ni MISSING_ADDITIONAL) | oui |
| 2.14.1 | 51 Mo | NON | oui |
| 2.15.0 / 2.15.1 / 2.15.2 | 51–79 Mo | NON | oui |
| 2.16.0 / 2.16.3 | 81 Mo | NON | oui |
| 2.17.2 | 53 Mo | NON | oui |
| 2.18.0 | 81 Mo | NON | oui |
| 2.19.0 | 53 Mo | NON | oui |
| 2.20.1 | 82 Mo | NON | oui |
| 2.21.3 | 85 Mo | NON | oui |
| **2.21.4** | **85 Mo** | **NON** ← dernière sans le gate | oui |
| 2.21.5 | 58 Mo | **OUI** ← introduction du gate #1 | oui |
| 2.21.9 / 2.22.0 | 92 Mo | OUI | oui |

## Conclusion
- Le **gate #1 (boucle de restart)** a été introduit exactement à **2.21.5**.
- **2.21.4 = la version la plus riche sans ce gate** (quasi le jeu final, ~déc. 2018).
  `checkForWorldAdditional=0`, même protocole de login → **tout notre travail
  (backend + serveur) s'applique**.
- **1.0.2** = filet de sécurité minimal (aucun système de contenu additionnel du
  tout), mais contenu 2015 le plus pauvre.

## Recommandation
1. **Cible principale : 2.21.4** — richesse quasi maximale, sans le verrou.
   Reste à vérifier si le **gate #2** (dialogue AssetUpdater) se déclenche encore
   sans le gate #1 (à tester au boot).
2. **Fallback : 1.0.2** si 2.21.4 pose souci — garanti sans verrou.

## APK téléchargés (dans /home/user, non committés car volumineux)
- `DragonSoul-1.0.2.apk` (38 Mo)
- `DragonSoul-2.21.4.apk` (85 Mo)  ← candidat principal
Re-téléchargeables via apk.dog (endpoint `ajax/box.php?type=dwn&file_id=&hash=`).

## Prochaine étape
Construire le port desktop contre **2.21.4** : dex2jar → vérifier si le remap ASM
et le backend existants (faits pour 2.22.0) s'appliquent tels quels (obfuscation
probablement quasi identique entre versions consécutives), puis booter.

---
## ⚠️ Obstacle majeur : obfuscation (vérifié en construisant 2.21.4)

En convertissant 2.21.4 stock (dex2jar) et en comparant à notre Fixed2 :

| | Fixed2 2.22.0 (notre base) | 2.21.4 stock |
|---|---|---|
| `com.perblue.rpg.*` | **lisible** (RPGMain, DeviceInfo, INative…) | **obfusqué** : 160/162 classes = lettres uniques, RPGMain renommé |
| libGDX | obfusqué (com.badlogic.gdx.b/c/f…) | obfusqué **différemment** (GL20 coïncide, Graphics non) |

**Conclusion** : notre APK **« Fixed2 » est un build dé-obfusqué** (noms perblue
restaurés — rare et précieux). C'est ce qui a rendu tout notre port faisable
(backend/launcher câblés sur `com.perblue.rpg.RPGMain`, `DeviceInfo`, `INative`…).
Les versions **stock antérieures (2.21.4, 1.0.2…) sont pleinement obfusquées** →
y porter = **re-dériver TOUTE la cartographie** (chaque classe par structure).
Effort équivalent à refaire tout le reverse.

### Reco révisée
- **Rester sur Fixed2 2.22.0** (dé-obfusqué, port qui rend/joue déjà) et **résoudre
  le gate contenu** par l'option A (repères minimaux valides + tolérance) — bien
  moins de travail que re-porter une version obfusquée.
- La piste « version antérieure » ne vaut le coup **que** si on trouve/produit un
  build **dé-obfusqué** d'une version ≤ 2.21.4 (ex. appliquer le mapping de Fixed2
  à 2.21.4, si on récupère ce mapping). Sinon, coût prohibitif.
