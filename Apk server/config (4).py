"""
DragonSoul Server Emulator - Configuration
"""

# Server network settings
HOST = "0.0.0.0"
PORT = 9500

# Database
import os as _os
_BASE_DIR = _os.path.dirname(_os.path.abspath(__file__))
DB_PATH = _os.path.join(_BASE_DIR, "dragonsoul.db")

# Game version info
GAME_VERSION = 155
FULL_VERSION = 15500
SDK_VERSION = 1

# Server shard info
SHARD_ID = 1
SERVER_NAME = "DragonSoul Emulator"
MAX_TEAM_LEVEL = 130
NUM_CHAPTERS = 15

# Starting resources for new players
STARTING_GOLD = 0           # Real game starts with 0
STARTING_STAMINA = 60       # Real game starts with 60
STARTING_DIAMONDS = 0       # Real game starts with 0
STARTING_XP = 0
STARTING_TEAM_LEVEL = 1
MAX_STAMINA = 60            # Increases with team level

# XOR key (unsigned bytes)
XOR_KEY = [0x02, 0xA6, 0xEE, 0xD5, 0xD0, 0xBC, 0x6A, 0x98]

# Address the HTTP login server tells clients to connect to for the TCP game server
# Set to "auto" to auto-detect your LAN IP at startup
# Or manually set: "192.168.1.42:9500", "myserver.ddns.net:9500", etc.
GAME_SERVER_ADVERTISE = "auto"
HTTP_PORT = 8080

# ── Player Identity Mode ─────────────────────────────────────────────
# SINGLE_PLAYER_MODE = True  (default)
#   → All connections with empty device_id reuse the same player.
#     Ideal for local testing with one player. Progress always persists.
#
# SINGLE_PLAYER_MODE = False
#   → Each connection with empty device_id gets a unique identity.
#     Required for multiplayer. Clients must send back their assigned
#     userID on reconnect to recover their account.
SINGLE_PLAYER_MODE = True

# Logging
LOG_LEVEL = "INFO"
LOG_MESSAGES = True  # Log all incoming/outgoing message types

# Compression chunk size
ZLIB_CHUNK_SIZE = 512
