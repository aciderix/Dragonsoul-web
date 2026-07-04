# DragonSoul — Transpilation / debug local : ARET vs bytecode JVM

Analyse de la question : « peut-on transpiler DragonSoul pour le débugger localement
avec ARET, vu que le jeu est abandonné ? »

Sources examinées :
- APK : `DragonSoul-Fixed2.apk` (com.perblue.dragonsoul, libGDX)
- ARET : `Automatic-reverse-engineering-toolkit@claude/zen-hamilton-6pi1k4`
- Extraction : `Dragonsoulgame-rpg-server-@claude/ccr-e72f1478-aWJSI`

## TL;DR

**ARET n'est pas le bon outil pour la logique du jeu**, et la piste de debug la plus
efficace *existe déjà* dans le repo d'extraction : `dragonsoul-headless.jar` fait
tourner le bytecode métier de DragonSoul sur une JVM desktop, sans Android.

## Pourquoi ARET ne peut pas transpiler *le jeu*

ARET est un pipeline de reverse **binaire natif** : il charge PE/ELF/Mach-O,
désassemble du **x86/x64**, reconstruit les fonctions/CFG et émet du pseudo-C ;
son mode `--transpile` recompile un PE Windows en ELF Linux natif via une couche HLE.

Or la logique de DragonSoul n'est pas du code natif :

| Composant du jeu | Format réel | ARET peut le traiter ? |
|---|---|---|
| `com.perblue.rpg.*` (combat, héros, réseau, UI…) | **DEX** (bytecode Dalvik/Java) dans `classes.dex`, `classes2.dex` | ❌ Non — ARET ne lit pas le bytecode JVM/Dalvik |
| `lib/x86/libgdx.so` (247 Ko) | ELF 32-bit x86 | ✅ Oui — mais ce n'est *pas* le jeu |
| `lib/armeabi*/libgdx.so` | ELF ARM | ❌ (ARET = x86/x64 uniquement) |

Le seul binaire qu'ARET peut mordre dans l'APK est `libgdx.so` — et c'est le
**moteur libGDX standard, open-source** (`github.com/libgdx/libgdx`), pas la
propriété intellectuelle du jeu. Décompiler ce `.so` n'apporte rien : ni combat,
ni héros, ni protocole réseau ne s'y trouvent.

### Démonstration ARET (faite, pour être honnête sur ce qu'il produit)

Sur `lib/x86/libgdx.so` extrait de l'APK :

```
aret libgdx.so --mode info      → Format: Elf, 32-bit, 13 sections, 164 imports
                                   (glActiveTexture, __android_log_print… = moteur GL)
aret libgdx.so --no-prologue-scan → 602 fonctions récupérées
aret libgdx.so                   → pseudo-C par fonction (sub_xxxx, blocs, indirects)
```

Le pseudo-C est correct mais anonyme (`sub_980a`, registres bruts) et ne concerne
que la plomberie OpenGL du moteur. Conclusion : techniquement ARET marche, mais il
vise le mauvais artefact pour ce projet.

## La vraie piste : le bytecode JVM (déjà opérationnel)

La chaîne `DEX → dex2jar → bytecode JVM` a déjà été faite dans le repo d'extraction.
Résultat : `game-bytecode.jar` (18,6 Mo, 15 444 classes) + une couche de stubs
Android, packagés en `dragonsoul-headless.jar`.

**Testé et vérifié ici** — `java -jar dragonsoul-headless.jar --pipe --seed 42` :

```
=== BOOT COMPLETE ===
  UnitType: 145 units      CommandType: 121 commands
  Rarity: 27 levels        SkillType: 676 values
  ItemType: 1232 items     ResourceType: 24 types
```

La logique métier originale s'exécute, déterministe (`--seed`), pilotable en
stdin/stdout (modes `--pipe` / `--batch` / `--autoboot`). C'est exactement
« transpiler le jeu pour le débugger chez soi », mais via la JVM plutôt que du natif.

### Deux niveaux de debug disponibles dans le repo d'extraction

1. **Offline / introspection** — `dragonsoul-headless.jar` (CLI headless).
   Reflection sur n'importe quelle classe, appel de méthodes statiques, dump des
   enums/tabs. Idéal pour explorer les règles de combat, les stats, les skills.

2. **Online / protocole complet** — `Dragonsoul-server v2/` (serveur Python :
   `server.py`, `handlers.py`, `protocol.py` avec XOR+Deflate, `messages.py`)
   + `client jar/RealGameClient.java` (client de test). Rejoue la séquence
   `ClientInfo1 → BootData1`, permet de débugger le protocole binaire custom
   client↔serveur sans serveur officiel (le jeu étant abandonné).

## Recommandation

| Objectif | Outil | Statut |
|---|---|---|
| Débugger la logique de jeu (combat, héros, items, skills) | `dragonsoul-headless.jar` (JVM) | ✅ Marche déjà |
| Débugger le réseau / protocole | `Dragonsoul-server v2` + `RealGameClient` | ✅ Présent |
| Rejouer le rendu graphique 1:1 | build **desktop libGDX** (LWJGL) à partir du bytecode | ▶️ Piste naturelle suivante |
| Reverse du moteur natif `libgdx.so` | **ARET** | ⚠️ Possible mais inutile (moteur OSS, pas le jeu) |

**Ne pas** investir dans ARET pour ce projet : il transpile du binaire natif, or
le jeu est du bytecode JVM déjà ré-exécutable. Le chemin « run local pour debug »
est la JVM desktop. Pour aller au-delà du headless et retrouver l'affichage,
l'étape suivante est un launcher **libGDX desktop (lwjgl3)** branché sur
`game-bytecode.jar` — bien plus rentable que le port web TeaVM ou qu'ARET.
