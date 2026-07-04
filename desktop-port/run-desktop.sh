#!/bin/bash
# Build + launch the native desktop DragonSoul under a virtual display (Xvfb)
# with software OpenGL (Mesa llvmpipe). Extracts game assets from the committed
# APK and the libGDX desktop native on first run.
set -e
cd "$(dirname "$0")"
APK="../DragonSoul-Fixed2.apk"
BUILD="build"
ASSETS="$BUILD/apk/assets"
NATDIR="$BUILD/native"

echo "[run] compiling ..."
gradle --no-daemon -q compileJava 2>/dev/null | grep -v 'Picked up' || true

# assets
if [ ! -d "$ASSETS" ]; then
  echo "[run] extracting assets from APK ..."
  mkdir -p "$BUILD/apk"
  unzip -oq "$APK" 'assets/*' -d "$BUILD/apk"
fi

# classpath resources (real game data): the APK's .tab/.properties/.glsl live at
# classpath root (com/perblue/...), loaded via ClassLoader.getResourceAsStream.
# dex2jar dropped them, so extract everything that isn't assets/res/lib/dex.
RESD="$BUILD/apk-resources"
if [ ! -d "$RESD" ]; then
  echo "[run] extracting classpath resources from APK ..."
  mkdir -p "$RESD"
  unzip -oq "$APK" -x 'assets/*' 'res/*' 'lib/*' 'META-INF/*' '*.dex' \
     'AndroidManifest.xml' 'resources.arsc' -d "$RESD"
fi

RUNTIME_CP=$(gradle --no-daemon -q printRuntimeClasspath 2>/dev/null | grep -v 'Picked up' | tail -1)

# libgdx64.so from the EXACT resolved gdx-platform natives jar (version matters:
# the game needs the 1.9.3 JNI ABI — see build.gradle gdxVersion).
if [ ! -f "$NATDIR/libgdx64.so" ]; then
  echo "[run] extracting libgdx64.so ..."
  mkdir -p "$NATDIR"
  GDXJAR=$(echo "$RUNTIME_CP" | tr ':' '\n' | grep 'gdx-platform.*natives-desktop.jar' | head -1)
  echo "[run] native jar: $GDXJAR"
  unzip -oq "$GDXJAR" 'libgdx64.so' -d "$NATDIR"
fi

CP="$BUILD/classes/java/main:$RESD:$RUNTIME_CP"

echo "[run] launching under Xvfb (software GL) ..."
EXTRA=""
[ -n "$DS_SCRIPT" ] && EXTRA="$EXTRA -DDS_SCRIPT=$DS_SCRIPT"
[ -n "$DS_FORCE_WORLD_ADDITIONAL" ] && EXTRA="$EXTRA -DDS_FORCE_WORLD_ADDITIONAL=$DS_FORCE_WORLD_ADDITIONAL"
[ -n "$DS_SCREENSHOT" ] && EXTRA="$EXTRA -DDS_SCREENSHOT=$DS_SCREENSHOT"

ALSOFT_DRIVERS="${ALSOFT_DRIVERS:-null}" LIBGL_ALWAYS_SOFTWARE=1 GALLIUM_DRIVER=llvmpipe \
  xvfb-run -a -s "-screen 0 1280x720x24" \
  java -Xverify:none \
       -DDS_ASSETS="$ASSETS" \
       -DDS_RUNDIR="$BUILD/run" \
       -DDS_GDX_NATIVE="$NATDIR/libgdx64.so" \
       -DDS_FRAMES="${DS_FRAMES:-120}" \
       $EXTRA \
       -cp "$CP" desktop.DesktopLauncher
