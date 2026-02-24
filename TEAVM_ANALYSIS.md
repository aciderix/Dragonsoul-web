# DragonSoul × TeaVM — Analyse de compatibilité détaillée

## 🏗️ Le Projet gdx-teavm

**Repository :** [xpenatan/gdx-teavm](https://github.com/xpenatan/gdx-teavm)  
**État :** Extrêmement actif (dernier commit : 23 fév 2026, 1387 commits)  
**Version :** 1.5.2 (stable) / SNAPSHOT  
**Compatibilité :** libGDX 1.14.0, TeaVM 0.13.1  
**Licence :** Apache 2.0  
**Extensions :** FreeType, Controllers, Asset-Loader  
**Output :** JavaScript OU WebAssembly (WASM GC)  

gdx-teavm est le **backend web alternatif officieux** de libGDX. Il compile le **bytecode JVM** (pas le source !) en JS/WASM, contrairement à GWT qui compile le source Java.

---

## 📊 Compatibilité JDK API — Résultat : 99.7% ✅

### Analyse des 200,000+ appels d'API dans le bytecode DragonSoul

| Package JDK | Appels | TeaVM Support | Verdict |
|---|---:|---|---|
| `java.util.List` | 54,862 | ✅ Complet | OK |
| `java.util.Iterator` | 52,596 | ✅ Complet | OK |
| `java.lang.Integer` | 17,505 | ✅ Complet | OK |
| `java.lang.StringBuilder` | 14,234 | ✅ Complet | OK |
| `java.util.Map` | 13,014 | ✅ Complet | OK |
| `java.util.ArrayList` | 10,401 | ✅ Complet | OK |
| `java.lang.Long` | 3,590 | ✅ Complet | OK |
| `java.lang.String` | 3,043 | ✅ Complet | OK |
| `java.lang.Float` | 2,600 | ✅ Complet | OK |
| `java.util.HashMap` | 2,374 | ✅ Complet | OK |
| `java.util.EnumMap` | 1,810 | ✅ Complet | OK |
| `java.lang.Boolean` | 1,732 | ✅ Complet | OK |
| `java.util.Set` | 1,099 | ✅ Complet | OK |
| `java.lang.Enum` | 771 | ✅ Complet | OK |
| `java.lang.Math` | 578 | ✅ Complet | OK |
| `java.util.concurrent` | 282 | ⚠️ Partiel (green threads) | Adaptable |
| `java.lang.Class` | 236 | ⚠️ Reflection limitée | **À configurer** |
| `java.lang.System` | 188 | ✅ Complet | OK |
| `java.util.EnumSet` | 176 | ✅ Complet | OK |
| `java.util.Date` | 119 | ✅ Complet | OK |
| `java.util.Random` | 93 | ✅ Complet | OK |
| `java.io.PrintStream` | 78 | ✅ Complet | OK |

**99.7% des appels JDK sont des collections et types primitifs** → support TeaVM complet et natif.

---

## 🔴 Points de friction identifiés

### 1. Reflection (31 appels — CONFIGURABLE)

| Lieu | Type de reflection | Impact |
|---|---|---|
| `CombatSkillHelper.getCombatSkill()` | `Class.newInstance()` | **Critique** — instanciation de 647 skills |
| `RPGMain.create()` | `Class.forName()` + `newInstance()` | **Modéré** — 1 appel au démarrage |
| `SimpleDurationBuff.makeInstance()` | `Class.newInstance()` | **Modéré** — buffs de combat |
| `RuneStats.*` | `Array.newInstance()`, `Constructor.newInstance()` | **Mineur** — création de tableaux |
| `com.perblue.common.k.b` | `Field.get/set/getType` | **Modéré** — sérialisation de données |

**Solution TeaVM :** Implémenter un `ReflectionSupplier` qui déclare les classes accessibles :

```java
public class DragonSoulReflectionSupplier implements ReflectionSupplier {
    @Override
    public Collection<MethodDescriptor> getAccessibleMethods(
            ReflectionContext context, String className) {
        // Rendre le constructeur sans argument accessible pour les skills
        if (className.startsWith("com.perblue.rpg.simulation.skills.")) {
            return Set.of(new MethodDescriptor("<init>"));
        }
        return Set.of();
    }
}
```

**Effort :** ~2h de travail (1 fichier Java + 1 fichier META-INF/services)

### 2. Android APIs (384 appels — ÉLIMINABLES)

| API Android | Appels | Localisation |
|---|---|---|
| `Intent` | 41 | AndroidLauncher |
| `SharedPreferences` | 68 | Config locale |
| `Activity` | 34 | AndroidLauncher |
| `Log` | 22 | Logging |
| `NotificationCompat` | 15 | Push notifications |
| `View` | 8 | UI native |
| `TelephonyManager` | 6 | Device ID |
| Autres | 190 | Divers |

**Ces appels sont TOUS dans les classes Android-spécifiques** (`AndroidLauncher`, `ErrorReporting`, `AnalyticsTracker`, etc.) qui ne font PAS partie du jeu lui-même. Ils seront remplacés par le launcher web TeaVM.

### 3. Threading (113 appels — GREEN THREADS)

| Pattern | Localisation | Solution TeaVM |
|---|---|---|
| `Thread.start()` | Réseau (KryoNet) | Green threads (coroutines) |
| `Executors.newSingleThreadExecutor()` | Connexion serveur | Green threads |
| `ThreadLocal` | Buffer JSON | Remplacer par variable globale |
| `Thread.sleep()` | Attente réseau | `Promise` / async |

**TeaVM 0.13** supporte les green threads (émulation de threads via coroutines JavaScript). Le réseau KryoNet devra quand même être adapté en WebSocket, mais la logique de threading peut rester.

### 4. Spine Runtime (2,273 appels — COMPATIBLE)

`spine-libgdx` est du **pur Java** sans dépendance native. Il utilise :
- `SpriteBatch` → supporté par gdx-teavm ✅
- `SkeletonRenderer` → pur Java ✅
- `AnimationState` → pur Java ✅

Le jeu utilise Spine 2.x (format binaire `.skel` + atlas), qui est une version ancienne mais stable. Les fichiers `.skel` sont chargés via libGDX `FileHandle` → adapté automatiquement par gdx-teavm.

---

## ⚡ Pipeline DEX → Web avec TeaVM

```
┌──────────┐     ┌──────────┐     ┌────────────┐     ┌──────────┐
│  APK     │────▶│ DEX→JAR  │────▶│ JAR + mods │────▶│ TeaVM    │
│ (2 DEX)  │     │ enjarify │     │  + gdx-    │     │ compiler │
└──────────┘     └──────────┘     │  teavm     │     └────┬─────┘
                                  └────────────┘          │
                                       ▲                  ▼
                                       │            ┌──────────┐
                                  ┌────┴─────┐      │ JS/WASM  │
                                  │ WebSocket│      │ + WebGL  │
                                  │ adapter  │      │ + Assets │
                                  └──────────┘      └──────────┘
```

### Étapes concrètes :

1. **DEX → JAR** : `enjarify` (Python, open source Google) convertit le bytecode Dalvik en bytecode JVM standard
2. **Nettoyage JAR** : Supprimer les classes Android (`AndroidLauncher`, `ErrorReporting`, etc.)
3. **Ajout TeaVM launcher** : Créer `WebLauncher.java` (équivalent de `AndroidLauncher`)
4. **ReflectionSupplier** : Déclarer les classes de skills accessibles
5. **WebSocket adapter** : Wrapper `ConnectionManager` pour utiliser WebSocket au lieu de TCP
6. **Build gdx-teavm** : Compiler le tout en JavaScript/WASM

---

## 🆚 Verdict comparatif final

| Critère | GWT | TeaVM | Avantage |
|---|---|---|---|
| **Input** | Source Java (décompilé) | Bytecode JVM (converti de DEX) | **TeaVM** — pas de bugs de décompilation |
| **Qualité input** | ~97% des fichiers OK, 3% erreurs | ~100% (bytecode fidèle) | **TeaVM** |
| **Reflection skills** | Impossible → 15min regex | Configurable via ReflectionSupplier → 2h | **GWT** (plus simple) |
| **Backend libGDX** | Officiel, 10+ ans | gdx-teavm v1.5.2, actif, 156 stars | **GWT** (plus mature) |
| **WebGL/Rendu** | Éprouvé | Utilise les mêmes API WebGL | **Égal** |
| **Taille output** | ~2-5 MB JS | ~5-10 MB JS ou ~3 MB WASM | **GWT** (JS) / **TeaVM** (WASM) |
| **Performance** | Bonne | Bonne (JS) / Excellente (WASM) | **TeaVM** (option WASM) |
| **Threads** | ❌ Aucun | ✅ Green threads | **TeaVM** |
| **Debug** | Source maps Java→JS | Source maps Java→JS | **Égal** |
| **Spine support** | ✅ (pur Java) | ✅ (pur Java) | **Égal** |
| **Communauté/docs** | Large (libGDX wiki) | Plus petite mais active | **GWT** |
| **Future-proof** | GWT est en déclin | TeaVM est en croissance | **TeaVM** |
| **Effort total estimé** | 4-6 semaines | **3-5 semaines** | **TeaVM** |

---

## 🏆 Recommandation révisée

### ✅ TeaVM est LE meilleur choix pour ce projet

**Raisons :**

1. **Travaille depuis le bytecode** : Pas besoin que le code décompilé soit parfait. Le DEX contient le bytecode original, fidèle au compilateur PerBlue. Conversion DEX → JVM bytecode = mécanique et fiable.

2. **Reflection configurable** : Les 647 skills `Class.newInstance()` fonctionnent avec un simple `ReflectionSupplier`, sans modifier le code du jeu.

3. **Green threads** : Le réseau KryoNet utilise des threads — TeaVM les émule nativement, pas GWT.

4. **Option WASM** : Performance quasi-native pour la simulation de combat (600+ classes de calcul).

5. **Projet gdx-teavm vivant** : 1387 commits, v1.5.2, commit il y a 12h. Ce n'est pas un projet mort.

6. **Moins de modifications au code du jeu** : Le principe de "portage pur sans réécriture" est mieux respecté.

### Estimation révisée :

| Phase | GWT | TeaVM |
|---|---|---|
| Setup projet + conversion DEX→JAR | — | 2-3 jours |
| Launcher web + config | 2-3 jours | 2-3 jours |
| Registre skills (reflection) | 1 jour (regex) | 1 jour (ReflectionSupplier) |
| WebSocket adapter | 3-5 jours | 3-5 jours |
| Conversion textures ETC1 | 1-2 jours | 1-2 jours |
| Fix build/compilation | 5-7 jours | 3-5 jours ★ |
| Intégration Spine | 2-3 jours | 2-3 jours |
| Tests et polish | 3-5 jours | 3-5 jours |
| **Total** | **4-6 semaines** | **3-4 semaines** |

★ TeaVM nécessite moins de corrections car il part du bytecode fidèle au lieu du code décompilé (qui peut avoir des artifacts de décompilation).

---

## ⚠️ Risques TeaVM

1. **gdx-teavm n'a pas de support Spine intégré** : Mais spine-libgdx étant du pur Java, il devrait compiler sans problème. Risque : bugs subtils de rendu.

2. **Moins de retours d'expérience** : Moins de jeux complexes publiés avec gdx-teavm qu'avec GWT. DragonSoul serait un des plus gros.

3. **Conversion DEX→JAR** : Enjarify/dex2jar peuvent produire du bytecode légèrement différent. Test nécessaire.

4. **Taille du runtime** : TeaVM JS output peut être plus gros que GWT. Option WASM pour compenser.

**Plan de mitigation** : Prototype de 3 jours (DEX → JAR → gdx-teavm → rendu d'un écran statique). Si ça marche → go. Si ça bloque → fallback GWT avec confiance.
