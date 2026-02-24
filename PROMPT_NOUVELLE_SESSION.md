# 🐉 DragonSoul Web Port — Briefing Complet pour Nouvelle Session

## LANGUE
L'utilisateur parle français. Réponds toujours en français.

---

## OBJECTIF DU PROJET
Porter le jeu mobile **DragonSoul** (APK Android, libGDX/Java) vers le **web** (navigateur) avec **zéro modification du code du jeu original**. On compile le bytecode Java directement en JavaScript avec **TeaVM**. Seuls les "backends" (graphique, réseau, input) sont remplacés par des implémentations web.

## PRINCIPE FONDAMENTAL
**Ne JAMAIS modifier le code du jeu.** On travaille uniquement sur :
- Des stubs (implémentations vides/web des interfaces)
- Le backend web (GL20 → WebGL, Input → DOM events, Réseau → WebSocket)
- Le launcher web (point d'entrée HTML)

---

## FICHIERS UPLOADÉS
L'utilisateur va te fournir ces fichiers :

| Fichier | Description |
|---------|------------|
| `classes1.jar` (7.4 MB) | DEX→JAR — 581 classes PerBlue + dépendances Android |
| `classes2.jar` (10.6 MB) | DEX→JAR — 6497 classes PerBlue = tout le code du jeu |
| `dragonsoul-logic.js` (178 KB) | Preuve de concept : game logic compilée en JS (FONCTIONNE !) |
| `DragonSoul-Fixed2 (2).apk` (95 MB) | APK original (optionnel, pour extraire les assets) |

**Ces JARs contiennent TOUT le bytecode du jeu** — c'est la source de vérité. Sauvegarde-les dans `/agent/home/dragonsoul/`.

## RESSOURCES EXTERNES
- **GitHub (code décompilé)** : https://github.com/aciderix/Dragonsoulgame-rpg-server-/tree/claude/ccr-e72f1478-aWJSI
- **TeaVM** : https://teavm.org — version **0.10.2**
- **gdx-teavm** : https://github.com/nickreboot/gdx-teavm (référence, inutilisable directement à cause de l'obfuscation)

---

## CE QUI A ÉTÉ ACCOMPLI

### Phase 1 : Analyse de faisabilité ✅
- **7078 classes Java** dans l'APK (2577 cœur du jeu dans `com.perblue.rpg`)
- **97.6% réutilisable** sans modification
- Le code du jeu n'est PAS obfusqué (noms lisibles : `CombatSkillHelper`, `AnimationType`, `RPGShader`)
- MAIS **libGDX EST obfusqué** par ProGuard (problème majeur détaillé plus bas)

### Phase 2 : Preuve de concept — Game Logic en JS ✅
**SUCCÈS MAJEUR :** Le code du jeu tourne en JavaScript dans le navigateur !
- 676 SkillTypes chargés (ELECTROYETI, MEDUSA, DRAGZILLA, SHADOW_ASSASSIN, etc.)
- 23 AnimationTypes fonctionnels (idle, walk, attack, death, skill1-4...)
- 178 KB de JavaScript, 0 erreurs, 0 warnings
- Fonctionne dans Node.js ET dans Chrome
- **0 modifications au code original**

### Phase 3 : Backend web custom (EN COURS ⏳)
Objectif : faire booter `RPGMain.create()` complet en JavaScript (avec rendu graphique).

---

## ARCHITECTURE DU JEU

### Classes principales
- `com.perblue.rpg.RPGMain extends Game` — classe principale, constructeur prend `DeviceInfo`
- `com.perblue.rpg.util.DeviceInfo` — interface pour infos appareil
- `com.perblue.rpg.network.NetworkProvider` — réseau (KryoNet TCP → à remplacer par WebSocket)
- `com.perblue.rpg.simulation.skills.generic.CombatSkillHelper` — registre de 647 skills
- `com.perblue.rpg.network.messages.SkillType` — enum de 676 types de skills

### Mécanisme de chargement des 647 skills
Le constructeur de `CombatSkillHelper` contient **647 appels explicites** `addMapping(SkillType, Class)`.
Les skills sont instanciés via `Class.newInstance()` depuis ce registre.
TeaVM supporte cela avec un fichier de configuration `ReflectionSupplier`.

---

## PROBLÈME TECHNIQUE MAJEUR : Obfuscation libGDX

ProGuard a obfusqué TOUTES les classes libGDX avec des **collisions package/classe** :
- `com.badlogic.gdx.c` est SIMULTANÉMENT un package ET une interface (`ApplicationListener`)
- Le compilateur Java (javac) refuse de compiler du code avec cette ambiguïté

### Mapping découvert

| Classe libGDX originale | Nom obfusqué |
|--------------------------|--------------|
| `Gdx` (singleton) | `com.badlogic.gdx.utils.b.a` |
| `Graphics` (interface) | `com.badlogic.gdx.f` |
| `Input` (interface) | `com.badlogic.gdx.g` |
| `GL20` (interface, 75+ méthodes) | `com.badlogic.gdx.h` |
| `ApplicationListener` (interface) | `com.badlogic.gdx.c` |
| `Game` (classe abstraite) | `com.badlogic.gdx.b` |
| `SpriteBatch` | `com.badlogic.gdx.d.n` |
| `TextureAtlas` | `com.badlogic.gdx.d.c` |
| `BitmapFont` | `com.badlogic.gdx.d.a` |
| `Texture` | `com.badlogic.gdx.d.o` |
| `ShaderProgram` | `com.badlogic.gdx.d.k` |
| `OrthographicCamera` | `com.badlogic.gdx.d.p` |
| `InputAdapter` | `com.badlogic.gdx.g` (dans l'interface) |
| `Array<T>` | `com.badlogic.gdx.utils.a` |
| `ObjectMap` | `com.badlogic.gdx.utils.n` |

### Pourquoi gdx-teavm ne marche pas directement
gdx-teavm attend des noms standards (`com.badlogic.gdx.Gdx`, `com.badlogic.gdx.graphics.GL20`...), mais le jeu utilise les noms obfusqués partout dans son bytecode. Dé-obfusquer est impraticable car ProGuard a fusionné/réorganisé les classes.

### Solution adoptée : Backend web custom sur noms obfusqués
Créer des implémentations web qui correspondent directement aux interfaces obfusquées. Le code du jeu ne change pas — nos stubs parlent le même "langage obfusqué".

---

## APPROCHES TENTÉES (Phase 3)

| # | Approche | Résultat |
|---|----------|----------|
| 1 | Stubs Java source (.java) | ✗ javac crash sur collisions package/classe |
| 2 | **Bytecode ASM** (génération .class) | ✅ Contourne javac ! 11 stubs créés |
| 3 | Compilation TeaVM des stubs ASM | ✗ 278 erreurs "class not found" (Java stdlib) |
| 4 | Injection dans teavm-classlib | ✗ Trop complexe (@Rename, @Substitute) |
| 5 | **`strict=false`** | ⏳ PROCHAINE ÉTAPE — TeaVM ignore les erreurs |

### Les 278 erreurs de l'approche 3
Toutes viennent de dépendances **réseau/crypto** que le rendu n'utilise PAS :
- ~134 refs à commons-logging (stubs existent mais classpath incomplet)
- `LinkedBlockingQueue`, `SSLSocket`, `CipherInputStream` (crypto)
- KryoNet, OkHttp (réseau)
- **Solution : `tool.setStrict(false)`** → TeaVM génère le JS en ignorant ces classes manquantes

---

## CODE SOURCE DES FICHIERS DE TRAVAIL

### WebLauncher.java (point d'entrée web)
```java
import com.github.xpenatan.gdx.teavm.backends.web.WebApplication;
import com.github.xpenatan.gdx.teavm.backends.web.WebApplicationConfiguration;
import com.perblue.rpg.RPGMain;

public class WebLauncher {
    public static void main(String[] args) {
        WebApplicationConfiguration config = new WebApplicationConfiguration();
        config.width = 960;
        config.height = 540;
        config.showDownloadLogs = true;
        WebDeviceInfo deviceInfo = new WebDeviceInfo();
        RPGMain game = new RPGMain(deviceInfo);
        new WebApplication(game, config);
    }
}
```

### WebDeviceInfo.java (implémentation web de DeviceInfo)
```java
import com.perblue.rpg.util.DeviceInfo;
import com.perblue.rpg.network.messages.Platform;

public class WebDeviceInfo implements DeviceInfo {
    public String getAdvertisingIdentifier() { return "web-player"; }
    public String getBuildTime() { return "2024-01-01"; }
    public String getCarrierName() { return "web"; }
    public String getDeviceID() { return "web-" + System.currentTimeMillis(); }
    public String getDisplayVersion() { return "1.0.0-web"; }
    public String getEmail() { return ""; }
    public int getFullVersion() { return 100; }
    public String getImei() { return ""; }
    public String getNetworkType() { return "wifi"; }
    public String getPackageName() { return "com.perblue.dragonsoul.web"; }
    public String getPhoneModel() { return "Web Browser"; }
    public String getPhoneName() { return "Browser"; }
    public Platform getPlatform() { return Platform.ANDROID; }
    public String getReferalData() { return ""; }
    public String getReferralCode() { return ""; }
    public String getRegistrationID() { return ""; }
    public int getScreenSize() { return 960; }
    public String getSignature() { return ""; }
    public String getSystemDescription() { return "Web/TeaVM"; }
    public long getSystemTime() { return System.currentTimeMillis(); }
    public String getSystemVersion() { return "1.0"; }
    public int getSystemVolume() { return 100; }
    public String getUniqueIdentifier() { return "web-unique-id"; }
    public String getaPMacAddress() { return ""; }
    public String getaPSSID() { return ""; }
    public int getsDKVersion() { return 21; }
    public boolean isConnectedToCell() { return false; }
    public boolean isConnectedToWiFi() { return true; }
    public boolean isInitialized() { return true; }
    public boolean limitAdTracking() { return true; }
    public void setInitialized(boolean b) { }
}
```

### DragonSoulLauncher.java (launcher simple pour test)
```java
import com.perblue.rpg.RPGMain;

public class DragonSoulLauncher {
    public static void main(String[] args) {
        System.out.println("DragonSoul Web Prototype");
        RPGMain game = new RPGMain(null);
    }
}
```

### EmptyNetworkProvider.java (stub réseau)
```java
package com.perblue.rpg.network;

public class EmptyNetworkProvider extends NetworkProvider {
    private static final Runnable emptyRunnable = new Runnable() { public void run() {} };
    
    public EmptyNetworkProvider() {
        super(emptyRunnable, emptyRunnable);
    }
    
    public void connectToServer(Runnable s, Runnable f) {}
    public void onReconnect() {}
    public void onStop(boolean d, long l) {}
    public void sendMessage(com.perblue.a.a.i m) {}
    public void sendMessage(com.perblue.a.a.i m, boolean r) {}
}
```

### NetworkProvider.java (stub réseau complet)
```java
package com.perblue.rpg.network;

import java.util.*;

public class NetworkProvider {
    private volatile boolean disconnected;
    private volatile boolean paused;
    
    public NetworkProvider(Runnable reconnectRunnable, Runnable sendFailRunnable) {}
    
    public void connectToServer(Runnable success, Runnable failure) {
        System.out.println("[Web] NetworkProvider.connectToServer - stub");
    }
    
    public void sendMessage(com.perblue.a.a.i message) {
        System.out.println("[Web] NetworkProvider.sendMessage - stub");
    }
    
    public void sendMessage(com.perblue.a.a.i message, boolean retry) {
        System.out.println("[Web] NetworkProvider.sendMessage - stub");
    }
    
    public void setAddress(String host, int port) {}
    
    public <M extends com.perblue.a.a.i> void setListener(
            Class<M> type, com.perblue.a.a.h<M> listener) throws com.perblue.a.a.g {}
    
    public void onReconnect() {}
    public void onStop(boolean disconnect, long delay) {}
    public void setDisconnected() { disconnected = true; }
    public void setPaused(boolean p) { paused = p; }
    public boolean isReconnecting() { return false; }
    public Exception getError() { return null; }
    public String getHost() { return "localhost"; }
}
```

### LogFactory.java (stub commons-logging)
```java
package org.apache.commons.logging;

public class LogFactory {
    public static Log getLog(Class<?> clazz) {
        return new SimpleLog(clazz.getName());
    }
    public static Log getLog(String name) {
        return new SimpleLog(name);
    }
}
```

### CompileRPGMain.java (compilateur TeaVM — le plus important !)
```java
import org.teavm.tooling.*;
import org.teavm.diagnostics.Problem;
import java.io.File;
import java.util.*;

public class CompileRPGMain {
    public static void main(String[] args) throws Exception {
        long start = System.currentTimeMillis();
        
        TeaVMTool tool = new TeaVMTool();
        tool.setTargetType(TeaVMTargetType.JAVASCRIPT);
        tool.setMainClass("DragonSoulLauncher");
        tool.setTargetDirectory(new File("/tmp/teavm_rpgmain_out"));
        tool.setLog(new ConsoleTeaVMToolLog(true));
        tool.setObfuscated(false);
        
        List<File> cp = new ArrayList<>();
        cp.add(new File("/tmp/teavm_test/classes"));       // Launcher
        cp.add(new File("/tmp/web_stubs/classes"));         // Stubs réseau
        cp.add(new File("/tmp/lbq_classes"));               // Logging stubs
        cp.add(new File("/tmp/game_classes1.jar"));         // Game JAR 1
        cp.add(new File("/tmp/game_classes2.jar"));         // Game JAR 2
        for (File f : new File("/tmp/teavm_libs").listFiles()) {
            if (f.getName().endsWith(".jar")) cp.add(f);
        }
        tool.setClassPath(cp);
        
        try { tool.generate(); } catch (Exception e) { 
            System.out.println("Exception: " + e.getMessage()); 
        }
        
        long elapsed = (System.currentTimeMillis() - start) / 1000;
        System.out.println("\n========================================");
        System.out.println("=== TEAVM COMPILATION RESULTS ===");
        System.out.println("========================================");
        System.out.println("Time: " + elapsed + "s");
        System.out.println("Classes compiled: " + tool.getClasses().size());
        
        int severe = 0, warn = 0;
        Map<String, Integer> errorTypes = new TreeMap<>();
        
        for (Problem p : tool.getProblemProvider().getSevereProblems()) {
            severe++;
            String key = p.getText();
            if (p.getParams() != null && p.getParams().length > 0) {
                key += " [" + p.getParams()[0] + "]";
            }
            errorTypes.merge(key, 1, Integer::sum);
            
            if (severe <= 20) {
                StringBuilder sb = new StringBuilder("  SEVERE: " + p.getText());
                if (p.getParams() != null) {
                    sb.append(" [");
                    for (Object o : p.getParams()) sb.append(o).append(" ");
                    sb.append("]");
                }
                if (p.getLocation() != null) sb.append("\n    @ " + p.getLocation().getMethod());
                System.out.println(sb);
            }
        }
        
        for (Problem p : tool.getProblemProvider().getProblems()) {
            if (!tool.getProblemProvider().getSevereProblems().contains(p)) warn++;
        }
        
        if (severe > 20) System.out.println("  ... and " + (severe - 20) + " more severe errors");
        System.out.println("\nTotal: " + severe + " severe, " + warn + " warnings");
        
        if (!errorTypes.isEmpty()) {
            System.out.println("\nError categories:");
            for (Map.Entry<String, Integer> e : errorTypes.entrySet()) {
                System.out.println("  " + e.getValue() + "x " + e.getKey());
            }
        }
        
        File out = new File("/tmp/teavm_rpgmain_out/classes.js");
        if (out.exists() && out.length() > 0) {
            long kb = out.length() / 1024;
            System.out.println("\n🎉🎉🎉 OUTPUT: " + kb + " KB of JavaScript! 🎉🎉🎉");
        } else {
            System.out.println("\n❌ No JavaScript generated (severe errors block output)");
        }
    }
}
```

### CompileLogicTest.java (compilateur de la preuve de concept)
```java
import org.teavm.tooling.TeaVMTool;
import org.teavm.tooling.TeaVMTargetType;
import org.teavm.vm.TeaVMOptimizationLevel;
import java.io.File;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.List;

public class CompileLogicTest {
    public static void main(String[] args) throws Exception {
        TeaVMTool tool = new TeaVMTool();
        tool.setTargetType(TeaVMTargetType.JAVASCRIPT);
        tool.setMainClass("GameLogicTest");
        tool.setTargetDirectory(new File("output_logic"));
        tool.setTargetFileName("dragonsoul-logic.js");
        tool.setObfuscated(false);
        tool.setOptimizationLevel(TeaVMOptimizationLevel.SIMPLE);
        
        List<URL> urls = new ArrayList<>();
        urls.add(new File("classes").toURI().toURL());
        urls.add(new File("libs/classes1.jar").toURI().toURL());
        urls.add(new File("libs/classes2.jar").toURI().toURL());
        urls.add(new File("libs/stubs.jar").toURI().toURL());
        for (File f : new File(".").listFiles()) {
            if (f.getName().startsWith("teavm-") && f.getName().endsWith(".jar")) {
                urls.add(f.toURI().toURL());
            }
        }
        tool.setClassLoader(new URLClassLoader(urls.toArray(new URL[0])));
        
        tool.generate();
        
        int severe = tool.getProblemProvider().getSevereProblems().size();
        int total = tool.getProblemProvider().getProblems().size();
        System.out.println("Severe errors: " + severe);
        System.out.println("Total problems: " + total);
        
        if (severe == 0) {
            File out = new File("output_logic/dragonsoul-logic.js");
            System.out.println("JS size: " + (out.length() / 1024) + " KB");
            System.out.println("SUCCESS!");
        }
    }
}
```

### GameLogicTest.java (test de la game logic)
```java
import com.perblue.rpg.simulation.skills.generic.CombatSkillHelper;
import com.perblue.rpg.network.messages.SkillType;
import com.perblue.rpg.simulation.AnimationType;

public class GameLogicTest {
    public static void main(String[] args) {
        System.out.println("=== DragonSoul Game Logic Test ===");
        System.out.println("Running as: JavaScript (TeaVM compiled)");
        System.out.println("");
        
        System.out.println("--- Test 1: SkillType Enum ---");
        try {
            SkillType[] types = SkillType.values();
            System.out.println("Total skill types: " + types.length);
            for (int i = 0; i < Math.min(10, types.length); i++) {
                System.out.println("  " + (i+1) + ". " + types[i].name());
            }
            if (types.length > 10) {
                System.out.println("  ... (" + (types.length - 10) + " more)");
            }
            System.out.println("TEST 1: PASSED ✓");
        } catch (Exception e) {
            System.out.println("TEST 1: FAILED - " + e.getMessage());
        }
        
        System.out.println("");
        System.out.println("--- Test 2: AnimationType ---");
        try {
            AnimationType[] anims = AnimationType.values();
            System.out.println("Animation types: " + anims.length);
            for (AnimationType a : anims) {
                System.out.println("  " + a.name());
            }
            System.out.println("TEST 2: PASSED ✓");
        } catch (Exception e) {
            System.out.println("TEST 2: FAILED - " + e.getMessage());
        }
        
        System.out.println("");
        System.out.println("=== DragonSoul logic runs in JavaScript! ===");
    }
}
```

---

## CODE ASM MANQUANT — STUBS LIBGDX OBFUSQUÉS

⚠️ **Le code Java ASM qui génère les 11 stubs bytecode a été perdu.** Il faudra le re-créer.

### Contexte
Java source (.java) ne compile PAS car `com.badlogic.gdx.c` est à la fois un package et une interface.
Solution : générer les .class directement avec la librairie ASM (`org.objectweb.asm`), ce qui contourne javac.

### Les 11 stubs à régénérer avec ASM

```
# Interfaces obfusquées libGDX — NOMS VÉRIFIÉS depuis LIBGDX_OBFUSCATION_MAP.md
com.badlogic.gdx.a         → Application (interface : getType(), exit(), log(), etc.)
com.badlogic.gdx.b         → Game (classe abstraite implémentant com.badlogic.gdx.c) — RPGMain extends b
com.badlogic.gdx.c         → ApplicationListener (interface : create(), render(), resize(), pause(), resume(), dispose())
com.badlogic.gdx.d         → Audio (interface : newSound(), newMusic())
com.badlogic.gdx.e         → Files (interface : internal(), external(), absolute())
com.badlogic.gdx.f         → Graphics (interface : getWidth(), getHeight(), getDeltaTime(), getFramesPerSecond())
com.badlogic.gdx.g         → Input (interface : getX(), getY(), isTouched(), isKeyPressed(), etc.)
com.badlogic.gdx.i         → Preferences (interface : putString(), getString(), flush())
com.badlogic.gdx.j         → InputProcessor (interface : keyDown(), keyUp(), touchDown(), touchUp())
com.badlogic.gdx.k         → Screen (interface : show(), render(), resize(), pause(), resume(), hide(), dispose())
com.badlogic.gdx.graphics.f → GL20 (interface : ~75 méthodes glClear, glViewport, glEnable, etc.)
com.badlogic.gdx.utils.b.a → Gdx singleton — champs statiques :
                              a.a = app (type com.badlogic.gdx.a)
                              a.b = files (type com.badlogic.gdx.e)
                              a.c = graphics (type com.badlogic.gdx.f)
                              a.d = input (type com.badlogic.gdx.g)
                              a.e = audio (type com.badlogic.gdx.d)
                              a.f = gl/gl20 (type com.badlogic.gdx.graphics.f)

# Implémentation web (classe custom, pas dans le JAR original)
WebApplication              → Implémente com.badlogic.gdx.a, initialise le Gdx singleton, lance la game loop
```

### Pattern ASM pour créer une interface
```java
import org.objectweb.asm.*;
import java.io.*;

// Exemple : créer com.badlogic.gdx.c (ApplicationListener interface)
ClassWriter cw = new ClassWriter(0);
cw.visit(Opcodes.V1_8, 
    Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE,
    "com/badlogic/gdx/c",  // internal name
    null, 
    "java/lang/Object", 
    null);

// Ajouter les méthodes abstraites
cw.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT, "create", "()V", null, null).visitEnd();
cw.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT, "render", "()V", null, null).visitEnd();
cw.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT, "resize", "(II)V", null, null).visitEnd();
cw.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT, "pause", "()V", null, null).visitEnd();
cw.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT, "resume", "()V", null, null).visitEnd();
cw.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT, "dispose", "()V", null, null).visitEnd();
cw.visitEnd();

// Écrire le .class
byte[] bytes = cw.toByteArray();
File outDir = new File("/tmp/asm_stubs/com/badlogic/gdx");
outDir.mkdirs();
try (FileOutputStream fos = new FileOutputStream(new File(outDir, "c.class"))) {
    fos.write(bytes);
}
```

### IMPORTANT
- Les **signatures exactes des méthodes** doivent correspondre à ce que le bytecode du jeu appelle
- Utiliser `javap -p -s -c com.badlogic.gdx.c` sur les JARs originaux pour extraire les signatures
- La librairie ASM se télécharge : `org.ow2.asm:asm:9.7` depuis Maven Central
- Avec `strict=false`, les stubs peuvent être **incomplets** — TeaVM ignorera les méthodes manquantes

---

## PROCHAINE ÉTAPE IMMÉDIATE

### Étape 2 : Boot RPGMain avec `strict=false`

**Modification critique dans CompileRPGMain.java :**
```java
tool.setStrict(false);  // AJOUTER CETTE LIGNE — ignore les classes manquantes
```

Cela devrait permettre à TeaVM de générer le JavaScript même si KryoNet/OkHttp/crypto sont absents.

**Procédure complète :**
1. Sauvegarder les JARs uploadés dans `/agent/home/dragonsoul/`
2. Installer Java 17+ dans la sandbox (`apk add openjdk17`)
3. Télécharger TeaVM 0.10.2 JARs depuis Maven Central (teavm-core, teavm-tooling, teavm-jso, teavm-jso-apis, teavm-classlib, teavm-interop, teavm-metaprogramming-api, teavm-platform)
4. Compiler les stubs + launcher
5. Exécuter CompileRPGMain avec `strict=false`
6. Si le JS est généré → tester dans un HTML basique

### Étapes suivantes
3. **WebGL backend** (3-5 jours) — implémenter ~40 méthodes GL20 via WebGL2
4. **Assets web** (1-2 jours) — ETC1→PNG + audio fallback
5. **Input web** (1-2 jours) — souris/clavier/tactile
6. **Premier rendu visible** 🎯 (2-3 jours) — splash screen dans Chrome !
7. **Réseau WebSocket** (5-7 jours) — proxy WS↔TCP
8. **Intégration complète** (5-8 jours) — Spine, skills visuels, optimisation

---

## RÈGLES IMPORTANTES
1. **Langue : FRANÇAIS toujours**
2. **Ne jamais modifier le code du jeu** — uniquement stubs/backends/launcher
3. **Sauvegarder le travail dans `/agent/home/dragonsoul/`** (persistant)
4. **Approche bytecode (ASM)** pour contourner les collisions package/classe de javac
5. **`strict=false`** est la clé pour passer les erreurs de classes manquantes
6. Les JARs `classes1.jar` et `classes2.jar` contiennent TOUT le bytecode du jeu
7. Le prototype `dragonsoul-logic.js` FONCTIONNE — preuve que l'approche marche
