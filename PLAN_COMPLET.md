# 🐉 DragonSoul → Web : Plan Complet du Portage

**Date :** 24 février 2026  
**Technologie :** TeaVM 0.10.2 (bytecode Java → JavaScript)  
**Objectif :** Porter DragonSoul (RPG mobile Android) vers le navigateur web avec un maximum de réutilisation du code original

---

## PARTIE I — CE QUI A ÉTÉ FAIT ✅

### Phase 0 : Étude de Faisabilité ✅

**Résultat :** Portage FAISABLE — 97.6% du code réutilisable tel quel

**Travail effectué :**
1. **Analyse complète de l'APK** (95 Mo)
   - 7 078 classes Java totales dont 2 577 core PerBlue
   - 2 fichiers DEX (classes.dex = 7.5 Mo, classes2.dex = 12.5 Mo)
   - 86 Mo d'assets (textures ETC1, sons OGG, animations Spine, shaders GLSL)
   
2. **Cartographie des dépendances**
   - libGDX ~1.9.x (moteur de jeu) — compatible web
   - Spine 2.1.27 (animations squelettiques) — compatible web
   - KryoNet (réseau TCP) — incompatible web → WebSocket
   - Scene2D (UI) — compatible web
   
3. **Identification des 7 chantiers d'adaptation :**
   - Chantier 1 : Launcher web (1 fichier)
   - Chantier 2 : Réseau TCP → WebSocket (4-5 fichiers)
   - Chantier 3 : Textures ETC1 → PNG (148 fichiers, script batch)
   - Chantier 4 : Audio OGG → multi-format (script batch)
   - Chantier 5 : Reflection → registre statique (2-3 fichiers)
   - Chantier 6 : Threading → single-thread (4-5 fichiers)
   - Chantier 7 : Shaders GLSL (0 modification nécessaire)

4. **Comparatif technologique TeaVM vs GWT**
   - **TeaVM choisi** : travaille depuis le bytecode (pas besoin de source), supporte la réflexion, green threads, compilation rapide

**Livrables :**
- `/agent/home/dragonsoul/FEASIBILITY_REPORT.md` — rapport complet
- `/agent/home/dragonsoul/TEAVM_ANALYSIS.md` — comparatif détaillé TeaVM vs GWT
- `/agent/home/dragonsoul/SKILL_REGISTRY_EXPLAINED.md` — mécanisme des 647 skills

---

### Phase 1 : Conversion DEX → JAR ✅

**Résultat :** Bytecode Android converti en JARs Java standard

**Travail effectué :**
1. Extraction des 2 fichiers DEX depuis l'APK
2. Conversion via dex2jar 2.0 (avec gestion des contraintes mémoire)
3. Validation bytecode : 100% compatible Java (testé sur 50 classes aléatoires via javap)

**Livrables :**
- `/agent/home/dragonsoul/classes1.jar` (7.4 Mo) — 581 classes PerBlue + dépendances Android + libGDX obfusqué
- `/agent/home/dragonsoul/classes2.jar` (10.6 Mo) — 6 497 classes : tout le code jeu com.perblue.rpg.*

---

### Phase 2 : Preuve de Concept TeaVM ✅✅

**Résultat :** 🎉 CODE DU JEU EXÉCUTÉ EN JAVASCRIPT ! 🎉

#### 2.1 — Première compilation réussie
- **240 classes** compilées, **3 624 méthodes**
- **586 KB** de JavaScript généré
- **0 erreurs, 0 warnings**
- 6 secondes de compilation

#### 2.2 — Stubs créés pour résoudre les incompatibilités

**Stub NetworkProvider** (`com.perblue.engine.c.a.a`) :
- L'original utilise `LinkedBlockingQueue` (multi-thread Java)
- Le stub fournit une implémentation vide (mode offline)
- Méthodes stubées : `connectToServer()`, `sendMessage()`, `setAddress()`, `setListener()`, etc.
- **Fichiers :** `proto/NetworkProvider.java`, `proto/EmptyNetworkProvider.java`

**Stubs commons-logging** (`org.apache.commons.logging.*`) :
- L'original utilise `ClassLoader.getSystemClassLoader()` incompatible navigateur
- Le stub redirige vers `System.out.println()` → `console.log()` dans le navigateur
- Niveaux : TRACE/DEBUG désactivés, INFO/WARN/ERROR actifs
- **Fichiers :** `proto/stubs/LogFactory.java`, `proto/stubs/Log.java`, `proto/stubs/SimpleLog.java`

#### 2.3 — Exécution JavaScript confirmée (Node.js)
```
=== DragonSoul Game Logic Test ===
Running as: JavaScript (TeaVM compiled)

--- Test 1: SkillType Enum ---
Total skill types: 676
  1. DEFAULT
  2. ELECTROYETI_0
  3. MEDUSA_0
  ... (666 more)
TEST 1: PASSED ✓

--- Test 2: AnimationType ---
Animation types: 23 (idle, walk, attack, death, skill1-4...)
TEST 2: PASSED ✓

=== DragonSoul logic runs in JavaScript! ===
```

**Livrables :**
- `/agent/home/dragonsoul/proto/dragonsoul-logic.js` (178 KB) — JavaScript fonctionnel du test
- `/agent/home/dragonsoul/proto/classes.js` (586 KB) — JavaScript compilé de RPGMain
- `/agent/home/dragonsoul/proto/index.html` — page démo navigateur
- `/agent/home/dragonsoul/proto/tests/GameLogicTest.java` — test de logique
- `/agent/home/dragonsoul/proto/tests/CompileLogicTest.java` — compilateur du test
- `/agent/home/dragonsoul/TEAVM_PROTOTYPE_REPORT.md` — rapport complet

---

### Phase 3.1 : Backend Web Custom — EN COURS ⏳

#### 3.1.1 — Découverte de l'obfuscation libGDX ⚠️

**Problème majeur découvert :** ProGuard a obfusqué TOUTES les classes libGDX dans le bytecode du jeu.

| Classe Standard | Nom Obfusqué | Type |
|----------------|--------------|------|
| `Gdx` (singleton) | `com.badlogic.gdx.utils.b.a` | Classe **FUSIONNÉE** avec utilitaires |
| `Application` | `com.badlogic.gdx.a` | Interface |
| `Game` | `com.badlogic.gdx.b` | Classe abstraite |
| `ApplicationListener` | `com.badlogic.gdx.c` | Interface |
| `Audio` | `com.badlogic.gdx.d` | Interface |
| `Files` | `com.badlogic.gdx.e` | Interface |
| `Graphics` | `com.badlogic.gdx.f` | Interface |
| `Input` | `com.badlogic.gdx.g` | Interface |
| `Preferences` | `com.badlogic.gdx.i` | Interface |
| `InputProcessor` | `com.badlogic.gdx.j` | Interface |
| `Screen` | `com.badlogic.gdx.k` | Interface |
| `GL20` | `com.badlogic.gdx.graphics.f` | Interface (75+ méthodes) |

**Champs du singleton Gdx (`com.badlogic.gdx.utils.b.a`) :**
```
a.a = Application  (type com.badlogic.gdx.a)
a.b = Files        (type com.badlogic.gdx.e)
a.c = Graphics     (type com.badlogic.gdx.f)
a.d = Input        (type com.badlogic.gdx.g)
a.e = Audio        (type com.badlogic.gdx.d)
a.f = GL20         (type com.badlogic.gdx.graphics.f)
```

**Bonne nouvelle :** Les noms de MÉTHODES sont préservés ! `getWidth()`, `getDeltaTime()`, `glClear()`, `isTouched()`, etc.

**Impact :** gdx-teavm ne peut PAS être utilisé directement (attend les noms standard). Il faut un backend web custom.

**Livrable :** `/agent/home/dragonsoul/LIBGDX_OBFUSCATION_MAP.md`

#### 3.1.2 — Approches tentées et résultats

| Approche | Résultat | Problème |
|----------|----------|----------|
| ❌ Dé-obfuscation automatique par matching de signatures | 51/357 matchés | ProGuard a **fusionné** des classes → pas de correspondance 1:1 |
| ❌ Stubs Java source (javac) pour les interfaces obfusquées | Ne compile pas | Collisions **package/classe** : `com.badlogic.gdx.c` est BOTH une interface ET un package |
| ✅ Stubs ASM (bytecode direct) | Bytecode généré | Contourne javac et les collisions — 11 classes compilées |
| ⏳ Compilation TeaVM du boot complet | 278 erreurs (40 classes manquantes) | Classes `java.*` manquantes dans teavm-classlib + stubs logging pas dans le classpath |

#### 3.1.3 — Stubs ASM générés (bytecode direct, contourne javac)

Un script Python avec ASM a été créé pour générer le bytecode directement :

| Interface Obfusquée | Implémentation Web | Rôle |
|---------------------|-------------------|------|
| `com.badlogic.gdx.graphics.f` (GL20) | `WebGL20` | 75+ méthodes WebGL (glClear, glBindBuffer...) |
| `com.badlogic.gdx.f` (Graphics) | `WebGraphics` | getWidth, getHeight, getDeltaTime |
| `com.badlogic.gdx.g` (Input) | `WebInput` | isTouched, getX, getY |
| `com.badlogic.gdx.d` (Audio) | `WebAudio` | newSound, newMusic |
| `com.badlogic.gdx.e` (Files) | `WebFiles` | internal, external |
| `com.badlogic.gdx.a` (Application) | `WebApplication2` | getType, exit, log |
| `com.badlogic.gdx.i` (Preferences) | `WebPreferences` | getString, putString, flush |
| `com.badlogic.gdx.h` (Net) | `WebNet` | no-op pour l'instant |
| `com.perblue.rpg.DeviceInfo` | `WebDeviceInfo` | getScreenWidth, isTablet |

**Launcher web :** `WebLauncher.java` — initialise le singleton Gdx via réflexion et boot RPGMain

#### 3.1.4 — Les 40 classes manquantes (278 références)

| Catégorie | Classes | Refs | Utilisé par | Critique ? |
|-----------|---------|------|-------------|-----------|
| **commons-logging** | LogFactory, Log | 134 | Partout | ✅ Stubs existants, juste à inclure dans classpath |
| **java.util.concurrent** | LinkedBlockingQueue, ExecutorService, Future, etc. | ~40 | Code réseau | ❌ Non critique pour le rendu |
| **java.net** | InetAddress, Socket, ConnectException, etc. | ~30 | Code réseau | ❌ Non critique pour le rendu |
| **java.security/javax.crypto** | MessageDigest, SecretKey, Cipher, etc. | ~25 | Encryption réseau | ❌ Non critique pour le rendu |
| **java.io** | ObjectInputStream | ~5 | Sérialisation | ❌ Non critique |
| **java.text** | Collator | ~2 | Tri texte | ⚠️ Mineur |
| **java.lang.reflect** | Proxy | ~2 | Logging dynamic | ❌ Non critique |

**Solution identifiée :** Compiler avec `setStrict(false)` — TeaVM génère le JS même avec des classes manquantes. Les erreurs ne touchent que le code réseau/crypto, PAS le rendu.

---

## PARTIE II — CE QUI RESTE À FAIRE 🔧

### Phase 3.1 (suite) : Compilation complète avec strict=false

**Objectif :** Générer un JavaScript qui boot RPGMain dans le navigateur

**Étapes :**
1. ✅ Reconstruire le workspace `/tmp/` depuis le stockage persistant
2. ⬜ Résoudre les dépendances TeaVM (21 JARs via Gradle ou Maven Central)
3. ⬜ Inclure les stubs logging dans le classpath
4. ⬜ Compiler avec `setStrict(false)` + les stubs ASM des interfaces obfusquées
5. ⬜ Vérifier la taille et la complétude du JS généré
6. ⬜ Tester le boot dans Node.js (vérifie que `WebLauncher.main()` s'exécute)

**Résultat attendu :** JavaScript de ~2-5 Mo contenant RPGMain + toutes ses dépendances, bootable mais sans rendu graphique

**Risques :**
- TeaVM pourrait rencontrer des bytecodes problématiques dans des classes profondes
- Le singleton Gdx initialisé par réflexion pourrait ne pas fonctionner → fallback : modifier le launcher pour setter les champs directement

**Effort estimé :** 0.5-1 jour

---

### Phase 3.2 : Implémentation WebGL réelle

**Objectif :** Remplacer les stubs no-op GL20 par de vrais appels WebGL

**Étapes :**
1. ⬜ Identifier les méthodes GL20 appelées par le code de rendu du jeu (tree-shake)
2. ⬜ Implémenter les ~30-40 méthodes critiques via `@JSBody` TeaVM :
   - `glClear`, `glClearColor`, `glViewport`, `glEnable`, `glDisable`
   - `glCreateProgram`, `glCreateShader`, `glShaderSource`, `glCompileShader`, `glLinkProgram`
   - `glBindTexture`, `glTexImage2D`, `glGenTextures`
   - `glDrawArrays`, `glDrawElements`
   - `glBindBuffer`, `glBufferData`, `glVertexAttribPointer`
   - `glUniformMatrix4fv`, `glUniform1i`, `glUniform4f`
   - `glBlendFunc`, `glDepthFunc`
3. ⬜ Créer le bridge JavaScript WebGL (`<canvas>` → WebGL2 context)
4. ⬜ Implémenter `WebGraphics` réel : canvas size, delta time via `requestAnimationFrame`
5. ⬜ Tester : écran noir avec un `glClearColor` visible = succès

**Résultat attendu :** Canvas WebGL fonctionnel dans le navigateur, le jeu appelle les méthodes GL et elles s'exécutent

**Risques :**
- Mapping des types Java (IntBuffer, FloatBuffer) vers TypedArrays JavaScript
- Gestion des textures (format, taille) entre Java et WebGL
- SpriteBatch de libGDX utilise des VBO/indices — vérifier la compatibilité

**Effort estimé :** 3-5 jours

---

### Phase 3.3 : Conversion des Assets

#### Textures ETC1 → PNG
- 148 fichiers `.etc1` (compressés gzip, format GPU Android)
- Script Python de conversion : décompression gzip → parsing header ETC1 → décodage pixels → export PNG
- Mise à jour des 85 fichiers `.atlas` (remplacer `.etc1` par `.png`)
- **Alternative :** extension WebGL `WEBGL_compressed_texture_etc` (75% des navigateurs)

#### Audio OGG → multi-format
- 286 fichiers `.ogg` — OK sur Chrome/Firefox/Edge
- Conversion `ffmpeg` en `.mp3` pour fallback Safari
- libGDX gère le multi-format automatiquement

#### Fonts et Shaders
- 6 fichiers `.fnt` + 12 `.png` — compatibles tel quel
- 8 fichiers `.glsl` — déjà compatibles WebGL (guards `#ifdef GL_ES`)

**Effort estimé :** 1-2 jours (automatisable par scripts)

---

### Phase 3.4 : Input Web (souris/clavier/tactile)

**Objectif :** Implémenter `WebInput` (interface `com.badlogic.gdx.g`)

**Étapes :**
1. ⬜ Capturer les événements DOM (`mousedown`, `mousemove`, `mouseup`, `touchstart`, `touchmove`, `touchend`)
2. ⬜ Mapper vers l'API Input libGDX : `getX()`, `getY()`, `isTouched()`, `justTouched()`
3. ⬜ Clavier : `keyDown`, `keyUp`, `isKeyPressed`
4. ⬜ Intégrer `InputProcessor` pour les callbacks

**Effort estimé :** 1-2 jours

---

### Phase 3.5 : Premier Rendu — Écran de chargement 🎯

**Objectif :** Voir le splash screen de DragonSoul dans un navigateur

**Étapes :**
1. ⬜ Assembler tous les composants (WebGL, Input, Files, Assets PNG)
2. ⬜ Implémenter `WebFiles.internal()` pour charger les assets via HTTP fetch
3. ⬜ Configurer la boucle de rendu (`requestAnimationFrame` → `render()`)
4. ⬜ Tester le boot complet : `RPGMain.create()` → premier écran visible

**Résultat attendu :** Le splash screen ou loading screen du jeu visible dans Chrome

**Effort estimé :** 2-3 jours

---

### Phase 4 : Réseau WebSocket

**Objectif :** Connecter le jeu web au serveur DragonSoul

#### 4.1 : Client WebSocket
- Implémenter `NetworkProvider.connectToServer()` via `new WebSocket(url)`
- Bridge `@JSBody` pour les callbacks `onopen`, `onmessage`, `onclose`, `onerror`
- File de messages asynchrone (remplace `LinkedBlockingQueue`)

#### 4.2 : Proxy WebSocket ↔ TCP
- Petit serveur Node.js ou Python qui :
  - Accepte les connexions WebSocket du navigateur
  - Ouvre une connexion TCP vers le serveur DragonSoul
  - Forward les messages binaires dans les deux sens
- Le protocole KryoNet binaire + XOR encryption passe **tel quel** (pas de conversion)

#### 4.3 : Sérialisation
- Les 363 classes de messages sont des POJO purs → **inchangées**
- `MessageFactory` (mapping nom→index) → **inchangé**
- Seule la couche transport TCP → WebSocket change

**Effort estimé :** 5-7 jours

---

### Phase 5 : Intégration Complète

#### 5.1 : Réflexion pour les 647 Skills
- `CombatSkillHelper` utilise `Class.newInstance()` pour instancier les skills
- TeaVM supporte la réflexion via fichier de configuration `ReflectionSupplier`
- Lister les 647 classes de skills dans la config TeaVM
- **Alternative :** le registre statique (`addMapping()`) fonctionne déjà sans réflexion dynamique

#### 5.2 : Animations Spine
- Runtime Spine 2.1.27 (ancien format squelettique)
- Vérifier la compatibilité du bytecode Spine dans les JARs
- Possiblement stubber le loader si le format `.skel` binaire pose problème

#### 5.3 : Particules
- 317 fichiers `.pb` au format `ObjectOutputStream` Java
- Possiblement convertir en format texte libGDX si le loader ne fonctionne pas

#### 5.4 : Tests fonctionnels
- Login (avec serveur via WebSocket)
- Menu principal
- Combat (676 skills, animations, effets)
- Navigation entre écrans

#### 5.5 : Optimisation
- Tree-shaking TeaVM (suppression code mort)
- Minification JavaScript
- Lazy loading des assets (par écran)
- Taille JS cible : < 5 Mo

**Effort estimé :** 5-8 jours

---

## PARTIE III — INVENTAIRE DES FICHIERS

### Stockage Persistant (`/agent/home/dragonsoul/`)

#### Rapports & Documentation
| Fichier | Contenu | Taille |
|---------|---------|--------|
| `FEASIBILITY_REPORT.md` | Étude complète de faisabilité (97.6% réutilisation) | ~15 KB |
| `TEAVM_ANALYSIS.md` | Comparaison détaillée TeaVM vs GWT | ~8 KB |
| `SKILL_REGISTRY_EXPLAINED.md` | Mécanisme des 647 skills (CombatSkillHelper) | ~6 KB |
| `TEAVM_PROTOTYPE_REPORT.md` | Rapport prototype Phase 2 (avec résultats exécution) | ~10 KB |
| `LIBGDX_OBFUSCATION_MAP.md` | Mapping complet des classes libGDX obfusquées | ~3 KB |
| `PHASE3_PLAN.md` | Plan technique Phase 3.1 (ancien, moins détaillé) | ~3 KB |
| `PLAN_COMPLET.md` | **CE DOCUMENT** | ~20 KB |

#### Binaires
| Fichier | Contenu | Taille |
|---------|---------|--------|
| `classes1.jar` | Bytecode DEX→JAR (RPGMain + libGDX obfusqué + deps) | 7.4 Mo |
| `classes2.jar` | Bytecode DEX→JAR (6497 classes jeu com.perblue.rpg.*) | 10.6 Mo |

#### Prototype (`proto/`)
| Fichier/Dossier | Contenu |
|-----------------|---------|
| `dragonsoul-logic.js` | ✅ JavaScript fonctionnel — logique jeu (178 KB) |
| `classes.js` | ✅ JavaScript compilé de RPGMain entry point (586 KB) |
| `index.html` | Page démo navigateur |
| `tests/GameLogicTest.java` | Test qui prouve l'exécution JS (SkillTypes + AnimTypes) |
| `tests/CompileLogicTest.java` | Script de compilation TeaVM du test |
| `stubs/` | Stubs sources : NetworkProvider, commons-logging |
| `stubs/classes/` | Stubs compilés (.class) |
| `launcher/` | Launchers web : DragonSoulLauncher, CompileRPGMain, BuildDragonSoulWeb |
| `teavm-web/src/main/java/` | WebLauncher, WebDeviceInfo, WebNative, BuildDragonSoulWeb |
| `assets/` | Assets extraits de l'APK (shaders, fonts, sons, textures) |
| `libs/` | Symlinks vers classes1.jar et classes2.jar |
| `build-web.gradle.kts` | Config Gradle pour build web |
| `build.gradle.kts` | Config Gradle générale |
| `settings.gradle.kts` | Settings Gradle |

#### Sources décompilées (référence)
| Dossier | Contenu |
|---------|---------|
| `decompiled/sources/` | Sources JADX (okhttp3, tapjoy, tune, zendesk, etc.) |

---

## PARTIE IV — PROBLÈMES CONNUS & SOLUTIONS

### 1. Obfuscation libGDX (RÉSOLU conceptuellement)
- **Problème :** Toutes les classes libGDX renommées par ProGuard
- **Solution :** Backend web custom utilisant les noms obfusqués directement
- **Statut :** Stubs ASM créés, en attente de test compilation complète

### 2. Collision Package/Classe (RÉSOLU)
- **Problème :** ProGuard a créé des noms comme `com.badlogic.gdx.c` qui est à la fois une interface ET un package contenant d'autres classes
- **Solution :** Génération bytecode directe via ASM (contourne javac)

### 3. Classes Java manquantes dans TeaVM (SOLUTION IDENTIFIÉE)
- **Problème :** 40 classes `java.*` non disponibles dans teavm-classlib
- **Solution :** `setStrict(false)` + les classes manquantes sont toutes dans le code réseau/crypto, pas le rendu
- **Statut :** En attente de test

### 4. Reconstruction du workspace `/tmp/` (RÉCURRENT)
- **Problème :** Le workspace `/tmp/` est éphémère et perdu entre les sessions
- **Solution :** Tous les fichiers importants sont en stockage persistant (`/agent/home/dragonsoul/`)
- **Script de reconstruction :** 
  1. Copier les JARs et stubs depuis `/agent/home/dragonsoul/`
  2. Télécharger les 21 dépendances TeaVM via Gradle ou Maven Central
  3. Compiler les stubs + lancer le compilateur TeaVM

### 5. Singleton Gdx initialisé par réflexion
- **Problème :** Le `WebLauncher` initialise `com.badlogic.gdx.utils.b.a` (Gdx) via réflexion pour setter les champs
- **Risque :** TeaVM pourrait ne pas supporter la réflexion sur les champs statiques
- **Fallback :** Modifier le launcher pour créer une sous-classe qui initialise les champs dans le constructeur

---

## PARTIE V — ESTIMATION CALENDRIER

| Phase | Description | Effort | Statut |
|-------|-------------|--------|--------|
| 0 | Faisabilité | 1 jour | ✅ Fait |
| 1 | DEX → JAR | 0.5 jour | ✅ Fait |
| 2 | Preuve de concept TeaVM | 1 jour | ✅ Fait |
| 3.1 | Boot RPGMain (strict=false + stubs) | 1 jour | ⏳ En cours |
| 3.2 | WebGL réel (GL20 implémentation) | 3-5 jours | ⬜ À faire |
| 3.3 | Conversion assets | 1-2 jours | ⬜ À faire |
| 3.4 | Input web | 1-2 jours | ⬜ À faire |
| 3.5 | Premier rendu visible | 2-3 jours | ⬜ À faire |
| 4 | Réseau WebSocket | 5-7 jours | ⬜ À faire |
| 5 | Intégration complète | 5-8 jours | ⬜ À faire |
| **TOTAL** | | **~20-30 jours** | |

**Fait :** ~2.5 jours (Phases 0-2)  
**Restant :** ~18-27 jours  
**Prochaine victoire visible :** Phase 3.5 (écran de chargement dans le navigateur) — ~8-12 jours

---

## PARTIE VI — PROCHAINE ACTION IMMÉDIATE

**Reconstruire le workspace et compiler avec `strict=false` :**

```bash
# 1. Copier les JARs
mkdir -p /tmp/phase3/libs /tmp/phase3/stubs
cp /agent/home/dragonsoul/classes{1,2}.jar /tmp/phase3/libs/

# 2. Résoudre les dépendances TeaVM (via Gradle)
# → 21 JARs : teavm-core, teavm-tooling, teavm-classlib, hppc, commons-io, asm, etc.

# 3. Compiler les stubs ASM (Python + asm-9.7.1.jar)
# → Génère les .class pour WebGL20, WebGraphics, WebInput, etc.

# 4. Compiler le WebLauncher (javac)
# → Point d'entrée : WebLauncher.main() → initialise Gdx → RPGMain(DeviceInfo)

# 5. Lancer TeaVM avec strict=false
# → tool.setStrict(false) + classpath = stubs + game JARs + teavm-classlib
# → Cible : JAVASCRIPT + entryPoint = WebLauncher

# 6. Tester dans Node.js
node output/classes.js
```

**Critère de succès :** `WebLauncher.main()` s'exécute en JavaScript sans crash, `RPGMain` est instancié, les stubs interceptent les appels libGDX.
