#!/bin/bash
# Launch the local server AND the desktop game together in ONE process tree, so a
# single background task keeps both alive (the harness reaps older background tasks
# when a new one starts, which was killing a separately-launched server).
#
# Env: DS_JAVA_OPTS (server -Dds.* flags), DS_FRAMES / DS_LIVE_FILE / DS_PROBE_*
# (game), forwarded as usual. Logs: $SRV_LOG and $GAME_LOG (default under build/run).
set -e
cd "$(dirname "$0")"
SRV_LOG="${SRV_LOG:-build/run/srv.log}"
GAME_LOG="${GAME_LOG:-build/run/game.log}"
mkdir -p build/run

# Clean any stragglers so the port and display are free.
for p in $(ps -eo pid,args | awk '/java/ && /(DsServer|DesktopLauncher)/ && !/awk/ {print $1}'); do kill -9 "$p" 2>/dev/null || true; done
for p in $(ps -eo pid,comm | awk '$2=="Xvfb"{print $1}'); do kill -9 "$p" 2>/dev/null || true; done
rm -f /tmp/.X*-lock 2>/dev/null || true
sleep 1

echo "[both] starting server ..."
bash run-server.sh 8080 > "$SRV_LOG" 2>&1 &
SRV_PID=$!

# Wait for the server to bind before launching the game (it connects on boot).
for i in $(seq 1 30); do
  grep -q 'listening on 8080' "$SRV_LOG" 2>/dev/null && break
  sleep 1
done
grep -q 'listening on 8080' "$SRV_LOG" 2>/dev/null || { echo "[both] server failed to bind"; tail -5 "$SRV_LOG"; kill -9 "$SRV_PID" 2>/dev/null; exit 1; }
echo "[both] server up (pid $SRV_PID); launching game ..."

# Game in the foreground: this script (the background task) stays alive as long as
# the game runs, keeping the server child alive too. Kill the task to stop both.
trap 'kill -9 "$SRV_PID" 2>/dev/null' EXIT
bash run-desktop.sh > "$GAME_LOG" 2>&1
