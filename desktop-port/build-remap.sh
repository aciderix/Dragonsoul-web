#!/bin/bash
# Regenerate libs/game-remapped.jar from the committed obfuscated game jars
# (../classes1.jar, ../classes2.jar) via the ASM RemapTool. The remapped jar is a
# build artifact (libs/ is gitignored), so run this once on a fresh checkout before
# run-desktop.sh / run-server.sh. RemapTool:
#   - renames class/package collisions (b_/c_/utils.b_) so the backend can name them
#   - strips InnerClasses attributes on com/perblue/* (except IPurchasing/
#     ISocialNetwork) to defuse dex2jar's IncompatibleClassChangeError
set -e
cd "$(dirname "$0")"
JAR1="../classes1.jar"
JAR2="../classes2.jar"
OUT="libs/game-remapped.jar"

ASMCP=$(gradle --no-daemon -q printRemapCp 2>/dev/null | grep -v 'Picked up' | tail -1)
if [ -z "$ASMCP" ]; then
  echo "[remap] could not resolve ASM classpath (gradle printRemapCp)"; exit 1
fi

echo "[remap] compiling RemapTool ..."
mkdir -p build/tools libs
javac -cp "$ASMCP" -d build/tools tools/RemapTool.java 2>&1 | grep -v 'Picked up' || true

echo "[remap] remapping $JAR1 + $JAR2 -> $OUT ..."
java -cp "build/tools:$ASMCP" RemapTool "$OUT" "$JAR1" "$JAR2" 2>&1 | grep -v 'Picked up'
echo "[remap] done: $(ls -la "$OUT" | awk '{print $5}') bytes"
