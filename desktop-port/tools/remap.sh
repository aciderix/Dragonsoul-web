#!/bin/bash
# Regenerate libs/game-remapped.jar from ../classes1.jar + ../classes2.jar,
# renaming class/package colliding classes so the game is nameable in Java source.
set -e
cd "$(dirname "$0")/.."
ASMCP=$(gradle --no-daemon -q printRemapCp 2>/dev/null | grep -v 'Picked up' | tail -1)
mkdir -p libs tools/build
javac -cp "$ASMCP" -d tools/build tools/RemapTool.java
java -cp "tools/build:$ASMCP" RemapTool libs/game-remapped.jar ../classes1.jar ../classes2.jar
