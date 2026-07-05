#!/bin/bash
# Compile + run the DragonSoul local server against the GAME's own classes, so the
# network serialization (ServerXORConnectionWrapper, MessageFactory, BootData…) is
# byte-identical to the client. Single port 8080: HTTP content + /login, and the
# game TCP protocol (decoded via the game's codec). See PROTOCOL.md / SERVER_DESIGN.md.
set -e
cd "$(dirname "$0")"
PORT="${1:-8080}"
BUILD="build"
RESD="$BUILD/apk-resources"

# Same runtime classpath the client uses (game-remapped.jar + deps) + APK resources
# (message classes may read .tab data via the classpath).
RUNTIME_CP=$(gradle --no-daemon -q printRuntimeClasspath 2>/dev/null | grep -v 'Picked up' | tail -1)
GAME_CP="$RESD:$RUNTIME_CP"

echo "[server] compiling ..."
mkdir -p "$BUILD/server"
javac -cp "$GAME_CP" -d "$BUILD/server" server/*.java 2>&1 | grep -v 'Picked up' || true

echo "[server] launching on $PORT ..."
# DS_JAVA_OPTS lets callers pass -Dds.* flags (e.g. -Dds.tutStep=41 to jump the
# tutorial for testing, -Dds.grantHeroes=true for a post-tutorial roster).
exec java $DS_JAVA_OPTS -cp "$BUILD/server:$GAME_CP" DsServer "$PORT" server
