"""  
DragonSoul Server Emulator – FULL DEBUG STABLE VERSION  
Uses real handlers + DB + full BootData  
Logs EVERYTHING for protocol debugging.  
"""  
  
import asyncio  
import struct  
import argparse  
import signal  
import socket  
import sys
import os  
import logging  
import traceback  
import uuid  
  
from aiohttp import web  
  
import config  
from protocol import XORCipher, ProtocolReader, ProtocolWriter  
from messages import parse_incoming_message, unpack_message_header  
from handlers import dispatch  
from database import init_db  
  
logger = logging.getLogger("server")  
  
  
# ─────────────────────────────────────────────  
# DEBUG UTILITIES  
# ─────────────────────────────────────────────  
  
def ascii_dump(data, limit=300):
    """ASCII-only dump of binary data. Replaces non-printable bytes with dots."""
    if not data:
        return "(empty)"
    ascii_part = "".join(chr(b) if 32 <= b < 127 else "." for b in data[:limit])
    truncated = f" ... (+{len(data)-limit} bytes truncated)" if len(data) > limit else ""
    return f"  [{len(data)} bytes] {ascii_part}{truncated}"  
  
  
def ascii_dump_full(data):
    """Full ASCII dump, one line per 64 bytes."""
    if not data:
        return "(empty)"
    lines_out = []
    for i in range(0, len(data), 64):
        chunk = data[i:i+64]
        a = "".join(chr(b) if 32 <= b < 127 else "." for b in chunk)
        lines_out.append(f"  {i:04x}: {a}")
    return "\n" + "\n".join(lines_out)  
  
  
def detect_lan_ip():  
    try:  
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)  
        s.connect(("8.8.8.8", 80))  
        ip = s.getsockname()[0]  
        s.close()  
        return ip  
    except Exception:  
        return "127.0.0.1"  
  
  
def resolve_advertise_address(port):  
    if config.GAME_SERVER_ADVERTISE.lower() == "auto":  
        return f"{detect_lan_ip()}:{port}"  
    return config.GAME_SERVER_ADVERTISE  
  
  
# ─────────────────────────────────────────────  
# CLIENT HANDLER  
# ─────────────────────────────────────────────  
  
async def handle_client(reader, writer, db_conn):  
  
    addr = writer.get_extra_info("peername")  
    addr_str = f"{addr[0]}:{addr[1]}"  
    logger.info(f"[{addr_str}] CONNECTED")  
  
    read_cipher = XORCipher()  
    write_cipher = XORCipher()  
    protocol_reader = ProtocolReader(read_cipher)  
    protocol_writer = ProtocolWriter(write_cipher)  
  
    client_state = {  
        "user_id": None,  
        "player_id": None,  
        "device_id": None,  
        "player": None,  
        "msg_counter": 0,  
        "db_conn": db_conn,  
    }  
  
    try:  
        while True:  
  
            logger.debug(f"[{addr_str}] Waiting frame header...")  
  
            len_data = await reader.readexactly(4)  
            frame_len = struct.unpack("<I", len_data)[0]  
  
            logger.debug(f"[{addr_str}] FRAME LENGTH: {frame_len}")  
  
            encrypted = await reader.readexactly(frame_len)  
            logger.debug(f"[{addr_str}] ENCRYPTED RECEIVED: {len(encrypted)} bytes")  
  
            raw_msg = protocol_reader.unwrap_frame(encrypted)  
  
            if raw_msg is None:  
                logger.error(f"[{addr_str}] unwrap_frame returned None")  
                continue  
  
            logger.debug(f"[{addr_str}] DECRYPTED SIZE: {len(raw_msg)}")  
            logger.debug(ascii_dump(raw_msg))  
  
            # ─────────────────────────────  
            # PARSE MESSAGE  
            # ─────────────────────────────  
  
            try:  
                msg_name, msg_type_id, msg_number, fields = parse_incoming_message(raw_msg)  
                logger.info(  
                    f"[{addr_str}] PARSED → {msg_name} "  
                    f"(type={msg_type_id}) "  
                    f"msg_number={msg_number} "  
                    f"fields={len(fields)}"  
                )  
            except Exception:  
                logger.error(f"[{addr_str}] MESSAGE PARSE FAILED")  
                traceback.print_exc()  
                continue  
  
            # Dump fields  
            for k, v in fields.items():  
                # Suppress very long field values (statVersions has 300+ entries)
                val_str = repr(v)
                if len(val_str) > 150:
                    val_str = f"<{type(v).__name__} with {len(v)} entries>"
                logger.info(f"[{addr_str}]   FIELD {k} = {val_str}")  
  
            # ─────────────────────────────  
            # DISPATCH  
            # ─────────────────────────────  
  
            try:  
                responses = dispatch(client_state, msg_name, msg_number, fields)  
                logger.info(  
                    f"[{addr_str}] DISPATCH DONE → responses={len(responses)}"  
                )  
            except Exception:  
                logger.error(f"[{addr_str}] DISPATCH CRASH")  
                traceback.print_exc()  
                responses = []  
  
            # ─────────────────────────────  
            # SEND RESPONSES  
            # ─────────────────────────────  
  
            for resp_raw in responses:  
  
                try:  
                    resp_name, resp_num, resp_to, resp_ver, _ = unpack_message_header(resp_raw)  
                    logger.info(  
                        f"[{addr_str}] SENDING {resp_name} "  
                        f"#{resp_num} (reply_to={resp_to}, ver={resp_ver}) "  
                        f"size={len(resp_raw)}"  
                    )  
                    logger.info(ascii_dump_full(resp_raw))  
                except Exception:  
                    logger.warning(f"[{addr_str}] Failed parsing outgoing header")  
  
                encrypted_resp = protocol_writer.wrap(resp_raw)  
                writer.write(struct.pack("<I", len(encrypted_resp)))  
                writer.write(encrypted_resp)  
  
                logger.info(  
                    f"[{addr_str}] SENT FRAME: "  
                    f"{len(encrypted_resp)+4} bytes "  
                    f"(4 header + {len(encrypted_resp)} encrypted)"  
                )  
  
            await writer.drain()  
  
    except asyncio.IncompleteReadError:  
        logger.warning(f"[{addr_str}] Client closed connection (EOF)")  
    except Exception:  
        logger.error(f"[{addr_str}] SERVER EXCEPTION")  
        traceback.print_exc()  
    finally:  
        # Save ALL player + hero state on disconnect (even if no Logout1 was sent)
        player = client_state.get("player")
        if player and db_conn:
            try:
                import json as _json
                from database import update_player, update_hero
                update_player(
                    player["id"], conn=db_conn,
                    stamina=player.get("stamina", 120),
                    gold=player.get("gold", 0),
                    diamonds=player.get("diamonds", 500),
                    xp=player.get("xp", 0),
                    team_level=player.get("team_level", 1),
                    items=player.get("items", {}),
                    campaign_progress=player.get("campaign_progress", {}),
                )
                # Also save ALL hero data
                heroes = player.get("heroes", {})
                heroes_saved = 0
                for hnum, hdata in heroes.items():
                    if "id" in hdata:
                        equip = hdata.get("equipment", {})
                        update_hero(
                            hdata["id"], conn=db_conn,
                            level=hdata.get("level", 1),
                            xp=hdata.get("xp", 0),
                            stars=hdata.get("stars", 1),
                            rarity=hdata.get("rarity", 0),
                            equipment=_json.dumps(equip) if isinstance(equip, dict) else equip,
                        )
                        heroes_saved += 1
                logger.info(f"[{addr_str}] Saved player + {heroes_saved} heroes on disconnect")
            except Exception as e:
                logger.error(f"[{addr_str}] Failed to save on disconnect: {e}")
        logger.info(f"[{addr_str}] DISCONNECTED")  
        writer.close()  
        await writer.wait_closed()  
  
  
# ─────────────────────────────────────────────  
# HTTP SERVER  
# ─────────────────────────────────────────────  
  
async def handle_login(request):  
    params = dict(request.query)  
    logger.info(f"[HTTP] LOGIN REQUEST: {params}")  
  
    response = {  
        "status": "good",  
        "data": resolve_advertise_address(config.PORT),  
        "requestID": str(uuid.uuid4())  
    }  
  
    logger.info(f"[HTTP] LOGIN RESPONSE: {response}")  
    return web.json_response(response)  
  
  
async def handle_index(request):  
    logger.info("[HTTP] index.txt requested")  
    content = "Category\tURL\tSize\tVersion\tEnvironment\tDensity\tCompression\n"  
    return web.Response(text=content, content_type="text/plain")  
  
  
async def start_http_server(host, port):  
    app = web.Application()  
    app.router.add_get("/login", handle_login)  
    app.router.add_post("/login", handle_login)  
    app.router.add_get("/live/index.txt", handle_index)  
  
    runner = web.AppRunner(app)  
    await runner.setup()  
    site = web.TCPSite(runner, host, port)  
    await site.start()  
  
    logger.info(f"[HTTP] Running on {host}:{port}")  
    return runner  
  
  
# ─────────────────────────────────────────────  
# MAIN SERVER  
# ─────────────────────────────────────────────  
  
async def start_server(host, tcp_port, http_port, db_conn):  
  
    await start_http_server(host, http_port)  
  
    server = await asyncio.start_server(  
        lambda r, w: handle_client(r, w, db_conn),  
        host,  
        tcp_port  
    )  
  
    logger.info(f"[TCP] Running on {host}:{tcp_port}")  
  
    async with server:  
        await server.serve_forever()  
  
  
def main():  
  
    parser = argparse.ArgumentParser()  
    parser.add_argument("--port", type=int, default=config.PORT)  
    parser.add_argument("--http-port", type=int, default=config.HTTP_PORT)  
    parser.add_argument("--debug", action="store_true")  
    args = parser.parse_args()  
  
    # Log to both console and file
    log_file = os.path.join(os.path.dirname(__file__) or ".", "log.txt")
    file_handler = logging.FileHandler(log_file, mode="a", encoding="utf-8")
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(logging.Formatter(
        "%(asctime)s [%(levelname)s] %(message)s", datefmt="%H:%M:%S"
    ))

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG if args.debug else logging.INFO)
    console_handler.setFormatter(logging.Formatter(
        "%(asctime)s [%(levelname)s] %(message)s", datefmt="%H:%M:%S"
    ))

    logging.basicConfig(
        level=logging.DEBUG,
        handlers=[console_handler, file_handler],
    )
    logger.info(f"Logging to file: {log_file}")  
  
    logger.info("══════════════════════════════════════")  
    logger.info("  DragonSoul FULL DEBUG SERVER")  
    logger.info("══════════════════════════════════════")  
  
    db_conn = init_db()  
  
    try:  
        asyncio.run(start_server(config.HOST, args.port, args.http_port, db_conn))  
    except KeyboardInterrupt:  
        logger.info("Interrupted.")  
    finally:  
        db_conn.close()  
  
  
if __name__ == "__main__":  
    main()