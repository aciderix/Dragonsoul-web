# 🐉 DragonSoul Web Port — Prompt de Passation

## LANGUE
L'utilisateur parle français. Réponds toujours en français.

## OBJECTIF DU PROJET
Porter le jeu mobile **DragonSoul** (APK Android, libGDX/Java) vers le **web** (navigateur) avec **zéro modification du code du jeu**. On compile le bytecode Java original directement en JavaScript avec **TeaVM**. Seuls les "backends" (graphique, réseau, input) sont remplacés par des implémentations web.

## PRINCIPE FONDAMENTAL
**Ne JAMAIS modifier le code du jeu.** On travaille uniquement sur :
- Des stubs (implémentations vides/web des interfaces)
- Le backend web (GL20 → WebGL, Input → DOM events, Réseau → WebSocket)
- Le launcher web (point d'entrée HTML)

---

## CE QUI A ÉTÉ ACCOMPLI

### Phase 1 : Analyse de faisabilité ✅
- **7078 classes Java** dans l'APK (2577 cœur du jeu dans `com.perblue.rpg`)
- **97.6% réutilisable** sans modification
- Le code du jeu n'est PAS obfusqué (noms lisibles)
- MAIS libGDX EST obfusqué par ProGuard (problème majeur)
- Rapport : `/agent/home/dragonsoul/FEASIBILITY_REPORT.md`

### Phase 2 : Preuve de concept — Game Logic en JS ✅ 
**SUCCÈS MAJEUR : Le code du jeu tourne en JavaScript dans le navigateur**
- 676 SkillTypes chargés (ELECTROYETI, MEDUSA, DRAGZILLA, etc.)
- 23 AnimationTypes fonctionnels
- 178 KB de JavaScript généré, 0 erreurs
- Fonctionne dans Node.js ET dans Chrome
- **0 modifications au code original**
- Fichiers clés :
  - `/agent/home/dragonsoul/proto/dragonsoul-logic.js` — le JS compilé
  - `/agent/home/dragonsoul/proto/index.html` — page de démo
  - `/agent/home/dragonsoul/proto/tests/GameLogicTest.java` — test Java
  - `/agent/home/dragonsoul/proto/tests/CompileLogicTest.java` — compilateur

### Phase 3 : Backend web custom (EN COURS ⏳)
Objectif : faire booter `RPGMain.create()` (la classe principale du jeu) en JavaScript.

#### Problème d'obfuscation libGDX
ProGuard a obfusqué TOUTES les classes libGDX avec des **collisions package/classe** :
- `com.badlogic.gdx.c` est SIMULTANÉMENT un package ET une interface (ApplicationListener)
- Java compiler (javac) refuse de compiler du code avec cette ambiguïté
- **Mapping découvert** (voir `/agent/home/dragonsoul/LIBGDX_OBFUSCATION_MAP.md`) :
  - `Gdx` → `com.badlogic.gdx.utils.b.a` (singleton)
  - `Graphics` → `com.badlogic.gdx.f` (interface)
  - `Input` → `com.badlogic.gdx.g` (interface)
  - `GL20` → `com.badlogic.gdx.h` (interface, 75+ méthodes)
  - `ApplicationListener` → `com.badlogic.gdx.c` (interface)
  - `Game` → `com.badlogic.gdx.b` (classe abstraite)

#### Approches tentées
1. ✗ **Stubs Java source** → javac crash sur collisions package/classe
2. ✅ **Bytecode ASM** → Génération directe de .class files, contourne javac ! 11 classes créées
3. ✗ **Compilation TeaVM des stubs** → 278 erreurs "class not found" (classes Java standard non supportées par TeaVM)
4. ✗ **Injection dans teavm-classlib** → Trop complexe (annotations @Rename, @Substitute)
5. ⏳ **PROCHAINE ÉTAPE : Compiler avec `strict=false`** → TeaVM génère le JS même avec des classes manquantes

#### Les 278 erreurs
Toutes viennent de dépendances **réseau/crypto** que le jeu n'utilise PAS pour le rendu :
- ~134 références à commons-logging (stubs existent mais classpath incomplet)
- LinkedBlockingQueue, SSLSocket, CipherInputStream (crypto)
- KryoNet, OkHttp (réseau)
- **Solution : `strict=false` dans TeaVM** → ignore ces erreurs, génère le JS quand même

---

## FICHIERS EN STOCKAGE PERSISTANT

### Documentation
| Fichier | Contenu |
|---------|---------|
| `FEASIBILITY_REPORT.md` | Étude de faisabilité complète |
| `SKILL_REGISTRY_EXPLAINED.md` | Explication du mécanisme 647 skills |
| `TEAVM_ANALYSIS.md` | Comparaison TeaVM vs GWT |
| `TEAVM_PROTOTYPE_REPORT.md` | Rapport du prototype Phase 2 |
| `LIBGDX_OBFUSCATION_MAP.md` | Mapping complet classes obfusquées |
| `PHASE3_PLAN.md` | Plan technique Phase 3 |
| `PLAN_COMPLET.md` | Historique + plan détaillé complet |

### Binaires critiques
| Fichier | Contenu |
|---------|---------|
| `classes1.jar` (7.4 MB) | Converti de classes.dex — 581 classes PerBlue + dépendances Android |
| `classes2.jar` (10.6 MB) | Converti de classes2.dex — 6497 classes PerBlue (code complet du jeu) |

### Prototype (proto/)
| Fichier/Dossier | Contenu |
|-----------------|---------|
| `dragonsoul-logic.js` | 178 KB — game logic compilée en JS (FONCTIONNEL) |
| `classes.js` | 586 KB — version étendue |
| `index.html` | Page de démo browser |
| `build-web.gradle.kts` | Config Gradle pour build web |
| `stubs/` | EmptyNetworkProvider, commons-logging stubs |
| `launcher/` | DragonSoulWebLauncher, BuildDragonSoulWeb, CompileRPGMain |
| `teavm-web/` | WebLauncher.java, WebDeviceInfo.java, WebNative.java, BuildDragonSoulWeb.java |
| `tests/` | GameLogicTest.java, CompileLogicTest.java |
| `assets/` | Assets extraits de l'APK (textures ETC1, shaders GLSL, fonts) |

### Code décompilé (decompiled/sources/)
Code source décompilé depuis l'APK pour référence. **Ne pas modifier.**
Contient : tapjoy, tune, zendesk, okhttp3, et classes obfusquées (b/, d/, e/, f/)

---

## ÉTAPES SUIVANTES (PLAN D'ACTION)

### Étape 1 : ZIP + Backup (5 min)
Créer un ZIP de tout `/agent/home/dragonsoul/` pour l'utilisateur.

### Étape 2 : Boot RPGMain avec strict=false (1 jour)
```
# Reconstruire le workspace dans /tmp/phase3/
# 1. Télécharger TeaVM 0.10.2 JARs depuis Maven Central
# 2. Copier classes1.jar + classes2.jar + stubs
# 3. Générer stubs ASM (bytecode) pour les interfaces obfusquées
# 4. Compiler avec TeaVM strict=false
# 5. Vérifier que le JS démarre RPGMain.create() sans crash
```

Commande TeaVM critique :
```java
tool.setStrict(false);  // IGNORE les classes manquantes (réseau/crypto)
tool.setClassesToPreserve(Collections.singletonList("com.perblue.rpg.RPGMain"));
```

### Étape 3 : Implémenter WebGL backend (3-5 jours)
- Implémenter les ~40 méthodes critiques de GL20 (`h` interface obfusquée)
- Mapper vers WebGL2 via TeaVM JSO
- Méthodes prioritaires : glViewport, glClear, glEnable, glBlendFunc, glDrawArrays, shaders

### Étape 4 : Assets web (1-2 jours)
- Convertir textures ETC1 → PNG
- Adapter le file loading pour HTTP fetch
- Audio : Howler.js ou Web Audio API

### Étape 5 : Input web (1-2 jours)
- Implémenter l'interface `g` (Input) obfusquée
- Mouse/keyboard/touch → méthodes libGDX

### Étape 6 : Premier rendu visible 🎯 (2-3 jours)
- Splash screen DragonSoul dans Chrome !
- Milestone critique du projet

### Étape 7 : Réseau WebSocket (5-7 jours)
- Proxy WebSocket ↔ TCP pour le serveur KryoNet
- Adapter NetworkProvider

### Étape 8 : Intégration complète (5-8 jours)
- Spine runtime, skills visuels, UI complète
- Tests, optimisation, polish

---

## RESSOURCES EXTERNES

- **APK original** : `DragonSoul-Fixed2 (2).apk` (95 MB) — peut être uploadé à nouveau si besoin
- **GitHub** : https://github.com/aciderix/Dragonsoulgame-rpg-server-/tree/claude/ccr-e72f1478-aWJSI (code décompilé)
- **TeaVM** : https://teavm.org — version 0.10.2
- **gdx-teavm** : https://github.com/nickreboot/gdx-teavm (référence mais inutilisable directement à cause de l'obfuscation)

## RÈGLES IMPORTANTES
1. **Langue : FRANÇAIS toujours**
2. **Ne jamais modifier le code du jeu** — uniquement stubs/backends/launcher
3. **Travailler dans `/agent/home/dragonsoul/`** pour la persistance
4. **Ne pas copier les sources décompilées** — les lire depuis le GitHub ou l'APK si besoin
5. **Approche bytecode (ASM)** pour contourner les collisions package/classe de javac
6. **`strict=false`** est la clé pour passer les erreurs de classes manquantes
7. Les JARs `classes1.jar` et `classes2.jar` contiennent TOUT le bytecode du jeu — c'est la source de vérité
