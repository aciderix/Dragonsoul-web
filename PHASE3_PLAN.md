# Phase 3.1 : Backend Web Custom — Plan d'exécution

## Problème résolu
- libGDX dans le jeu est **obfusqué par ProGuard** (357 classes renommées, certaines fusionnées)
- gdx-teavm attend les noms standard → **incompatible directement**
- Solution : backend web custom avec les noms obfusqués

## Découvertes clés

### Mapping du singleton Gdx (`com.badlogic.gdx.utils.b.a`)
```
a = Application (com.badlogic.gdx.a)
b = Graphics (com.badlogic.gdx.e - getWidth, getHeight, getDeltaTime)
c = Audio (com.badlogic.gdx.d)
d = Input (com.badlogic.gdx.f - isTouched, getX, getY, keyDown)
e = Files (com.badlogic.gdx.g)
f = Net (com.badlogic.gdx.h)
g = GL20 (com.badlogic.gdx.e.a - 75+ methods)
h = GL20 (copy)
i = GL30
```

### RPGMain (dans classes1.jar)
- `com.perblue.rpg.RPGMain extends com.badlogic.gdx.b` (Game class)
- Constructeur : `RPGMain(DeviceInfo)` — DeviceInfo est dans classes2.jar
- `create()` initialise toute l'application (UI, screens, networking, assets)

### Stratégie : strict=false
TeaVM avec `setStrict(false)` devrait **générer le JS même avec des classes manquantes**.
Les classes manquantes (java.net.*, javax.crypto.*, java.util.concurrent.*) ne sont utilisées
que par le code réseau/crypto — pas pour le rendu.

## Plan d'exécution

### Étape 1 : Compilation strict=false avec stubs minimaux
1. Recréer le workspace /tmp/ depuis le stockage persistant
2. Compiler les stubs existants (NetworkProvider, commons-logging) en .class
3. Créer le compilateur TeaVM avec `setStrict(false)`
4. Lancer la compilation du WebLauncher qui boot RPGMain
5. Vérifier la taille du JS généré et les warnings

### Étape 2 : Stubs ASM pour les interfaces GL20/Graphics/Input
- Utiliser ASM pour générer le bytecode directement (contourne les collisions package/classe)
- Implémenter les interfaces obfusquées :
  - `com.badlogic.gdx.e.a` (GL20) → WebGL bridge
  - `com.badlogic.gdx.e` (Graphics) → Canvas size
  - `com.badlogic.gdx.f` (Input) → Mouse/Touch/Keyboard
  - `com.badlogic.gdx.d` (Audio) → Web Audio API
  - `com.badlogic.gdx.g` (Files) → Virtual filesystem
  - `com.badlogic.gdx.a` (Application) → Lifecycle

### Étape 3 : Test de boot minimal
- WebLauncher initialise le singleton Gdx avec nos stubs
- Crée RPGMain avec un WebDeviceInfo
- Appelle create()
- Vérifie dans la console JS que le jeu démarre

### Étape 4 : WebGL rendering
- Implémenter les méthodes GL20 critiques avec WebGL
- Tester l'affichage du splash screen

## Classes manquantes dans teavm-classlib (40 uniques, 278 refs)
- **commons-logging** (134 refs) — nos stubs existent, à inclure dans classpath
- **java.util.concurrent** — LinkedBlockingQueue, ExecutorService, etc.
- **java.net** — InetAddress, ConnectException, etc.
- **java.security/javax.crypto** — MessageDigest, SecretKey, etc.
- **java.io** — ObjectInputStream
- **java.text** — Collator

Toutes ces classes sont dans le code réseau/crypto → non nécessaires pour le rendu.
Avec strict=false, TeaVM les ignore et génère le JS quand même.

## Fichiers nécessaires dans /tmp/ pour la compilation
- `/agent/home/dragonsoul/classes1.jar` — RPGMain + obfuscated libGDX
- `/agent/home/dragonsoul/classes2.jar` — Game code (PerBlue)
- Stubs .class depuis `/agent/home/dragonsoul/proto/stubs/classes/`
- Stubs ASM .class depuis le générateur Python/ASM
- JARs TeaVM depuis Maven Central
