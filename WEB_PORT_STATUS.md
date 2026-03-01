# DragonSoul Web Port - Current Status

## Phase 3.16 - Atlas Parsing Fixed

### What Works
- **WebGL2 bridge**: All WebGL2 API calls properly mapped and functioning
- **Game render loop**: Running at ~60fps with frame counter
- **PolygonSpriteBatch**: Properly initialized with WebGL2 context
- **AssetManager**: Update loop running, processes loading queue
- **Missing asset skipping**: Sound files (.ogg) and missing assets are skipped gracefully
- **Atlas parsing**: `boot.atlas` successfully parsed (29 lines, 3 regions: boot_progress, logo, tip)
- **FileHandle.child()**: Re-added tree-shaken method for atlas page resolution
- **GAME_ASSETS**: Preloaded shaders, atlas text, PKM stub, splash PNG placeholder

### Current Errors

1. **PKM texture loading fails**: `Couldn't load pkm file 'ETC/XHDPI/ui/boot.etc1'`
   - The PKM (ETC1 compressed texture) stub in game-assets.js is a minimal 4x4 file
   - The ETC1 decoder likely fails because the PKM data is too small or malformed
   - Need a proper PKM file or bypass the ETC1 decoder entirely with an RGBA texture

2. **Splash PNG null reference**: `TypeError: Cannot read properties of null (reading '$a160')`
   - The splash screen PNG (16x16 white placeholder) loads but crashes during processing
   - `$a160` is likely a Pixmap or Texture property accessed on null
   - The texture loader creates the task but fails at the "exists" → "load" transition

3. **Font files missing**: Klepto.fnt/.png, Swanse.fnt/.png, Chinese/Korean/Japanese/Russian
   - These are queued but not in GAME_ASSETS, causing loading to stall
   - LoadingScreen stuck at loadState=0 (FONTS state) with ~0.67% progress

4. **No draw calls**: `drawCalls=0` because no textures are successfully loaded yet
   - The Stage has 2 children but batch vertex count is 0

### Architecture

#### Key Files
- `proto/output/web/classes.js` (~84MB) - TeaVM-compiled Java→JS game code
- `proto/output/web/game-assets.js` - Preloaded game assets (shaders, atlas, textures)
- `proto/output/web/index.html` - Entry point with WebGL2 canvas

#### Key Code Sections in classes.js
- **TextureAtlasData constructor** (`cbggg_n$c__init_0`, ~line 367407): Web bypass reads atlas directly from GAME_ASSETS
- **FileHandle** (`cbgc_a`, ~line 703684): Web overrides for read/readString/exists/length/reader
- **AssetManager** (`cbga_e`, ~line 789370): Update loop with task processing
- **AssetLoadingTask** (`cbga_d_a0`, ~line 903896): Missing asset skip logic
- **WebFiles** (~line 1185): `_webLookup` function and web file methods
- **FileHandle.child** (~line 1699568): Post-metadata prototype addition

#### TeaVM Cooperative Threading
TeaVM compiles Java to JavaScript using cooperative threading with `$rt_suspending()`/`$rt_resuming()` checks. Synchronous Java I/O (like `BufferedReader.readLine()`) becomes asynchronous with suspension points. Our atlas bypass creates a fake synchronous reader to avoid these suspension points.

### Next Steps
1. Fix PKM/ETC1 texture loading (or bypass with RGBA texture)
2. Fix splash PNG `$a160` null reference
3. Add font assets or skip font loading to progress past loadState=0
4. Get first draw calls rendering
