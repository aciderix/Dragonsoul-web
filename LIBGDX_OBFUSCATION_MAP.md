# Mapping d'Obfuscation libGDX dans DragonSoul

## Classes Racine com.badlogic.gdx.*

| Standard | Obfusqué | Type | Notes |
|----------|----------|------|-------|
| `Application` | `com.badlogic.gdx.a` | Interface | Contient ApplicationType enum |
| `Game` | `com.badlogic.gdx.b` | Classe abstraite | RPGMain extends b |
| `ApplicationListener` | `com.badlogic.gdx.c` | Interface | create/render/resize/pause/resume/dispose |
| `Audio` | `com.badlogic.gdx.d` | Interface | newSound/newMusic |
| `Files` | `com.badlogic.gdx.e` | Interface | internal/external/absolute |
| `Graphics` | `com.badlogic.gdx.f` | Interface | getWidth/getHeight/getDeltaTime |
| `Input` | `com.badlogic.gdx.g` | Interface | getX/getY/isTouched/isKeyPressed |
| `InputProcessor` | `com.badlogic.gdx.j` | Interface | keyDown/keyUp/touchDown/touchUp |
| `Screen` | `com.badlogic.gdx.k` | Interface | show/render/resize/pause/resume/hide/dispose |
| `Preferences` | `com.badlogic.gdx.i` | Interface | putString/getString/flush |

## Singleton Gdx (FUSIONNÉ)

| Standard | Obfusqué | Notes |
|----------|----------|-------|
| `Gdx` (singleton) | `com.badlogic.gdx.utils.b.a` | FUSIONNÉ avec d'autres classes utilitaires |
| Champs: `Gdx.app` | `a.a` (type `com.badlogic.gdx.a`) | |
| `Gdx.graphics` | `a.c` (type `com.badlogic.gdx.f`) | |
| `Gdx.input` | `a.d` (type `com.badlogic.gdx.g`) | |
| `Gdx.audio` | `a.e` (type `com.badlogic.gdx.d`) | |
| `Gdx.files` | `a.b` (type `com.badlogic.gdx.e`) | |
| `Gdx.gl` / `Gdx.gl20` | `a.f` (type GL20 obfusqué) | |

## GL20

| Standard | Obfusqué | Notes |
|----------|----------|-------|
| `GL20` | `com.badlogic.gdx.graphics.f` | Interface, 75+ méthodes, noms préservés |

## Graphiques

| Standard | Obfusqué | Notes |
|----------|----------|-------|
| `SpriteBatch` | À déterminer | Chercher draw(Texture...) |
| `Texture` | À déterminer | Chercher dans graphics/ |
| `TextureRegion` | À déterminer | |
| `OrthographicCamera` | À déterminer | |

## Collections / Utils

| Standard | Obfusqué | Notes |
|----------|----------|-------|
| `Array` | `com.badlogic.gdx.utils.b.b` probable | libGDX Array<T> |
| `ObjectMap` | À déterminer | |

## Méthodes - Noms Préservés ✅

Les noms de méthodes des interfaces publiques sont **NON obfusqués** :
- `getWidth()`, `getHeight()`, `getDeltaTime()` sur Graphics
- `getX()`, `getY()`, `isTouched()` sur Input
- `glClear()`, `glBindBuffer()`, etc. sur GL20
- `create()`, `render()`, `resize()`, `dispose()` sur ApplicationListener
- `draw()`, `begin()`, `end()` sur SpriteBatch

C'est une excellente nouvelle : le backend web custom n'a qu'à implémenter les interfaces avec les bons noms de méthodes.

## Stratégie Backend Web Custom

Au lieu de dé-obfusquer les ~357 classes libGDX, on implémente directement les interfaces obfusquées :

1. `com.badlogic.gdx.f` (Graphics) → WebGL canvas
2. `com.badlogic.gdx.g` (Input) → DOM events  
3. `com.badlogic.gdx.d` (Audio) → Web Audio API
4. `com.badlogic.gdx.e` (Files) → Fetch API / IndexedDB
5. `com.badlogic.gdx.graphics.f` (GL20) → WebGL2 context
6. `com.badlogic.gdx.utils.b.a` (Gdx singleton) → initialiser les champs statiques
