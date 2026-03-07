"""
DragonSoul Server Emulator - Protocol Layer
XOR cipher, zlib compression, message framing, and field serialization.

FIXED: TAG_SKIP=0x20, TAG_END=0x21, pack_submsg helper, V2 split map format.
"""

import struct
import zlib
import io
import logging

from config import XOR_KEY, ZLIB_CHUNK_SIZE

logger = logging.getLogger("protocol")


# ─── XOR Cipher ─────────────────────────────────────────────────────────────

class XORCipher:
    """
    Stateful XOR cipher matching the DragonSoul client's XORConnectionWrapper.
    
    Algorithm per byte:
      1. key[pos] = key[pos] XOR key[(pos+1) % len]
      2. key[pos] = rotateLeft(key[pos], 1)  (byte-level rotate)
      3. pos = (pos - 1 + len) % len
      4. result = key[pos] XOR inputByte
    
    The key is mutated with every byte, making it stateful.
    Server and client each use two separate instances (one for read, one for write).
    """
    
    def __init__(self, key=None):
        self.key = list(key or XOR_KEY)
        self.pos = 0
    
    def reset(self, key=None):
        """Reset cipher state."""
        self.key = list(key or XOR_KEY)
        self.pos = 0
    
    @staticmethod
    def _rotate_left_byte(b, n):
        """Rotate a byte left by n bits."""
        b &= 0xFF
        return ((b << n) | (b >> (8 - n))) & 0xFF
    
    def process_byte(self, input_byte):
        """Process a single byte through the XOR cipher."""
        klen = len(self.key)
        # Step 1: key[pos] ^= key[(pos+1) % len]
        self.key[self.pos] = (self.key[self.pos] ^ self.key[(self.pos + 1) % klen]) & 0xFF
        # Step 2: key[pos] = rotateLeft(key[pos], 1)
        self.key[self.pos] = self._rotate_left_byte(self.key[self.pos], 1)
        # Step 3: pos = (pos - 1 + len) % len
        self.pos = (self.pos - 1 + klen) % klen
        # Step 4: result = key[pos] ^ inputByte
        return (self.key[self.pos] ^ input_byte) & 0xFF
    
    def process(self, data):
        """Process a bytes-like object through the cipher."""
        result = bytearray(len(data))
        for i, b in enumerate(data):
            result[i] = self.process_byte(b)
        return bytes(result)


# ─── Pack/Unpack Functions (Little Endian) ───────────────────────────────────

def pack_int(value):
    """Pack a 32-bit signed integer (LE)."""
    return struct.pack("<i", value)

def unpack_int(data, offset=0):
    """Unpack a 32-bit signed integer (LE). Returns (value, new_offset)."""
    return struct.unpack_from("<i", data, offset)[0], offset + 4

def pack_uint(value):
    """Pack a 32-bit unsigned integer (LE)."""
    return struct.pack("<I", value)

def unpack_uint(data, offset=0):
    """Unpack a 32-bit unsigned integer (LE). Returns (value, new_offset)."""
    return struct.unpack_from("<I", data, offset)[0], offset + 4

def pack_long(value):
    """Pack a 64-bit signed long (LE)."""
    return struct.pack("<q", value)

def unpack_long(data, offset=0):
    """Unpack a 64-bit signed long (LE). Returns (value, new_offset)."""
    return struct.unpack_from("<q", data, offset)[0], offset + 8

def pack_float(value):
    """Pack a 32-bit float (LE)."""
    return struct.pack("<f", value)

def unpack_float(data, offset=0):
    """Unpack a 32-bit float (LE). Returns (value, new_offset)."""
    return struct.unpack_from("<f", data, offset)[0], offset + 4

def pack_bool(value):
    """Pack a boolean as 1 byte."""
    return bytes([1 if value else 0])

def unpack_bool(data, offset=0):
    """Unpack a boolean. Returns (value, new_offset)."""
    return bool(data[offset]), offset + 1

def pack_size(size):
    """
    Pack a size value as a fixed 4-byte LE unsigned integer.
    The Java client uses readInt() (4 bytes) for all size values
    (string lengths, list/map counts, etc.), NOT variable-length encoding.
    """
    return struct.pack("<I", size)

def unpack_size(data, offset=0):
    """Unpack a size as a fixed 4-byte LE unsigned integer. Returns (size, new_offset)."""
    val = struct.unpack_from("<I", data, offset)[0]
    return val, offset + 4

def pack_string(s):
    """Pack a string: packSize(len) + UTF-8 bytes."""
    if s is None:
        s = ""
    encoded = s.encode("utf-8")
    return pack_size(len(encoded)) + encoded

def unpack_string(data, offset=0):
    """Unpack a string. Returns (string, new_offset)."""
    length, offset = unpack_size(data, offset)
    s = data[offset:offset + length].decode("utf-8", errors="replace")
    return s, offset + length

def pack_enum(value):
    """Pack an enum as its ordinal integer value."""
    return pack_int(value)

def unpack_enum(data, offset=0):
    """Unpack an enum ordinal. Returns (value, new_offset)."""
    return unpack_int(data, offset)


# ─── Field Tag Constants ─────────────────────────────────────────────────────

TAG_FIELD = 0x10   # Field present
TAG_SKIP = 0x20    # Skip / absent field (FIXED: was 0x00, APK uses 0x20)
TAG_END = 0x21     # End of sub-message marker

# Version markers
VERSION_V2 = 0x2B
VERSION_V1 = 0x2A


# ─── Sub-message Framing ────────────────────────────────────────────────────

def pack_submsg(body_bytes):
    """
    Pack a sub-message frame body: [4-byte LE size][body_bytes].
    The caller is responsible for writing TAG_FIELD (0x10) before this.
    
    Usage for sub-message field:
        buf += bytes([TAG_FIELD]) + pack_submsg(body)
    
    Usage for empty sub-message:
        buf += bytes([TAG_FIELD]) + pack_submsg(b"")
    """
    return struct.pack("<I", len(body_bytes)) + body_bytes


# ─── Message Header ─────────────────────────────────────────────────────────

def pack_message_header(msg_type_name, msg_number, response_msg_number=0, version=VERSION_V2):
    """
    Pack a message header using string-based message name.
    
    Wire format (matches Java client):
      [4-byte LE name_length][name string (UTF-8)][4-byte LE msg_number]
      [4-byte LE response_msg_number][1-byte version]
    """
    name_bytes = msg_type_name.encode("utf-8") if isinstance(msg_type_name, str) else msg_type_name
    buf = bytearray()
    buf.extend(struct.pack("<I", len(name_bytes)))
    buf.extend(name_bytes)
    buf.extend(pack_int(msg_number))
    buf.extend(pack_int(response_msg_number))
    buf.append(version)
    return bytes(buf)

def unpack_message_header(data, offset=0):
    """
    Unpack a message header with string-based message name.
    
    Wire format:
      [4-byte LE name_length][name string][4-byte LE msg_number]
      [4-byte LE response_msg_number][1-byte version]
    
    Returns (msg_type_name, msg_number, response_msg_number, version, new_offset)
    """
    name_len = struct.unpack_from("<I", data, offset)[0]
    offset += 4
    msg_type_name = data[offset:offset + name_len].decode("utf-8", errors="replace")
    offset += name_len
    msg_number, offset = unpack_int(data, offset)
    response_msg_number, offset = unpack_int(data, offset)
    version = data[offset]
    offset += 1
    return msg_type_name, msg_number, response_msg_number, version, offset


# ─── Field Helpers ───────────────────────────────────────────────────────────

def write_field_tag(present=True):
    """Write a field meta tag."""
    return bytes([TAG_FIELD if present else TAG_SKIP])

def read_field_tag(data, offset=0):
    if offset >= len(data):
        return None, offset

    tag = data[offset]
    offset += 1

    if tag == TAG_FIELD:
        return True, offset

    if tag == TAG_SKIP:
        return False, offset

    if tag == TAG_END:
        return "END", offset

    return None, offset


def pack_field_int(value):
    """Pack a tagged integer field."""
    return write_field_tag(True) + pack_int(value)

def pack_field_long(value):
    """Pack a tagged long field."""
    return write_field_tag(True) + pack_long(value)

def pack_field_string(value):
    """Pack a tagged string field."""
    return write_field_tag(True) + pack_string(value)

def pack_field_bool(value):
    """Pack a tagged boolean field."""
    return write_field_tag(True) + pack_bool(value)

def pack_field_enum(value):
    """Pack a tagged enum field."""
    return write_field_tag(True) + pack_enum(value)

def pack_field_float(value):
    """Pack a tagged float field."""
    return write_field_tag(True) + pack_float(value)

def pack_skip():
    """Pack a skip/absent field tag."""
    return write_field_tag(False)

def pack_field_list(items, pack_item_func):
    """Pack a tagged list field."""
    buf = write_field_tag(True)
    buf += pack_size(len(items))
    for item in items:
        buf += pack_item_func(item)
    return buf

def pack_field_map(mapping, pack_key_func, pack_val_func):
    """
    Pack a tagged map field in V2 SIMPLE split format.
    Wire: [TAG_FIELD][4B count][key1][key2]...[val1][val2]...
    Use for maps where Java does NOT call aVar.a() after key loop.
    """
    buf = write_field_tag(True)
    buf += pack_size(len(mapping))
    # Keys first
    for k in mapping.keys():
        buf += pack_key_func(k)
    # Then values (no size prefix)
    for v in mapping.values():
        buf += pack_val_func(v)
    return buf

def pack_field_map_keys_first(mapping, pack_key_func, pack_val_func):
    """
    Pack a tagged map field in V2 KEYS-FIRST format.
    Wire: [TAG_FIELD][4B count][key1][key2]...[4B values_size][val1][val2]...
    Use for maps where Java calls aVar.a() after the key reading loop,
    which reads a bounded-size context for the values block.
    Empty maps: [TAG_FIELD][count=0][bounded_size=0] (9 bytes total).
    """
    buf = write_field_tag(True)
    buf += pack_size(len(mapping))
    # Keys first
    for k in mapping.keys():
        buf += pack_key_func(k)
    # Values block preceded by its size (bounded context)
    vals_buf = b""
    for v in mapping.values():
        vals_buf += pack_val_func(v)
    buf += pack_size(len(vals_buf))
    buf += vals_buf
    return buf

def pack_field_message(msg_data):
    """Pack a tagged sub-message field (raw bytes already serialized)."""
    return write_field_tag(True) + msg_data


# ─── Unpack Field Helpers ────────────────────────────────────────────────────

def unpack_field_int(data, offset):
    tag, offset = read_field_tag(data, offset)

    if tag == "END":
        return None, offset

    if tag is False:
        return None, offset

    if tag is True:
        return unpack_int(data, offset)

    return None, offset

def unpack_field_long(data, offset):
    tag, offset = read_field_tag(data, offset)

    if tag == "END":
        return None, offset

    if tag is False:
        return None, offset

    if tag is True:
        return unpack_long(data, offset)

    return None, offset

def unpack_field_string(data, offset):
    tag, offset = read_field_tag(data, offset)

    if tag == "END":
        return None, offset

    if tag is False:
        return None, offset

    if tag is True:
        return unpack_string(data, offset)

    return None, offset

def unpack_field_bool(data, offset):
    tag, offset = read_field_tag(data, offset)

    if tag == "END":
        return None, offset

    if tag is False:
        return None, offset

    if tag is True:
        return unpack_bool(data, offset)

    return None, offset

def unpack_field_enum(data, offset):
    tag, offset = read_field_tag(data, offset)

    if tag == "END":
        return None, offset

    if tag is False:
        return None, offset

    if tag is True:
        return unpack_enum(data, offset)

    return None, offset

def unpack_field_float(data, offset):
    tag, offset = read_field_tag(data, offset)

    if tag == "END":
        return None, offset

    if tag is False:
        return None, offset

    if tag is True:
        return unpack_float(data, offset)

    return None, offset

def skip_field(data, offset):
    """Skip over a field we don't understand."""
    if offset >= len(data):
        return offset
    return offset  # Best effort - caller handles


# ─── Framing: wrapOut (Server → Client) ─────────────────────────────────────

def frame_message(raw_msg, xor_cipher):
    """
    Frame a raw message for sending to the client.
    1. zlib deflate the raw message in chunks
    2. For each chunk: 4-byte LE length prefix + chunk data
    3. XOR-encrypt the entire output
    """
    # Step 1: zlib compress into chunks
    compressor = zlib.compressobj(zlib.Z_DEFAULT_COMPRESSION, zlib.DEFLATED, 15)
    
    compressed_chunks = []
    for i in range(0, len(raw_msg), ZLIB_CHUNK_SIZE):
        chunk = raw_msg[i:i + ZLIB_CHUNK_SIZE]
        compressed = compressor.compress(chunk)
        if compressed:
            compressed_chunks.append(compressed)
    
    # Flush remaining
    remaining = compressor.flush()
    if remaining:
        compressed_chunks.append(remaining)
    
    # Step 2: Build framed output with length prefixes
    framed = bytearray()
    for chunk in compressed_chunks:
        framed.extend(struct.pack("<I", len(chunk)))
        framed.extend(chunk)
    
    # Step 3: XOR-encrypt
    encrypted = xor_cipher.process(framed)
    return encrypted


def unframe_message(data, xor_cipher):
    """
    Unframe a message received from the client.
    1. XOR-decrypt each byte
    2. Parse length-prefixed chunks
    3. zlib inflate all chunks concatenated
    Returns (raw_message_bytes, bytes_consumed) or (None, 0) if incomplete.
    """
    decrypted = xor_cipher.process(data)
    
    # Parse chunks
    offset = 0
    compressed_data = bytearray()
    
    while offset + 4 <= len(decrypted):
        chunk_len = struct.unpack_from("<I", decrypted, offset)[0]
        offset += 4
        
        if chunk_len == 0:
            # End marker or empty chunk
            break
        
        if chunk_len > 1000000:  # Sanity check - 1MB max chunk
            logger.warning(f"Unreasonable chunk length: {chunk_len}")
            break
        
        if offset + chunk_len > len(decrypted):
            # Incomplete data
            break
        
        compressed_data.extend(decrypted[offset:offset + chunk_len])
        offset += chunk_len
    
    if not compressed_data:
        return None, len(data)
    
    # zlib inflate
    try:
        raw_msg = zlib.decompress(bytes(compressed_data))
        return raw_msg, len(data)
    except zlib.error as e:
        logger.error(f"zlib decompression error: {e}")
        return None, len(data)


# ─── Stream Reader ───────────────────────────────────────────────────────────

class ProtocolReader:
    """
    Reads messages from a TCP stream with XOR decryption and zlib decompression.
    Handles buffering and incremental parsing.
    """
    
    def __init__(self, xor_cipher):
        self.cipher = xor_cipher
        self.buffer = bytearray()
        self.decompressor = None
        self._reset_frame()
    
    def _reset_frame(self):
        """Reset frame parsing state."""
        self.compressed_buf = bytearray()
        self.current_chunk_len = None
        self.current_chunk_read = 0
        self.reading_len = True
        self.len_buf = bytearray()
        self.frame_complete = False
    
    def feed(self, data):
        """
        Feed raw bytes from the socket.
        Returns a list of complete raw (decompressed) messages.
        NOTE: This is the LEGACY method. For the real Java client protocol,
        use unwrap_frame() with pre-framed data instead.
        """
        messages = []
        
        for b in data:
            # Decrypt byte
            decrypted_byte = self.cipher.process_byte(b)
            
            if self.reading_len:
                self.len_buf.append(decrypted_byte)
                if len(self.len_buf) == 4:
                    chunk_len = struct.unpack("<I", bytes(self.len_buf))[0]
                    self.len_buf.clear()
                    
                    if chunk_len == 0:
                        # End of frame - try to decompress
                        if self.compressed_buf:
                            try:
                                raw = zlib.decompress(bytes(self.compressed_buf))
                                messages.append(raw)
                            except zlib.error as e:
                                logger.error(f"Decompression error: {e}")
                        self._reset_frame()
                    else:
                        self.current_chunk_len = chunk_len
                        self.current_chunk_read = 0
                        self.reading_len = False
            else:
                self.compressed_buf.append(decrypted_byte)
                self.current_chunk_read += 1
                
                if self.current_chunk_read >= self.current_chunk_len:
                    # Chunk complete, read next length
                    self.reading_len = True
                    self.current_chunk_len = None
                    self.current_chunk_read = 0
        
        return messages

    def unwrap_frame(self, encrypted_data):
        """
        Unwrap a complete frame received from the Java client.
        The frame has already had its 4-byte plaintext length prefix stripped.
        This method XOR-decrypts, reads internal chunks, and decompresses.
        Returns the raw decompressed message bytes, or None on error.
        """
        # Step 1: XOR decrypt the entire frame
        decrypted = bytearray()
        for b in encrypted_data:
            decrypted.append(self.cipher.process_byte(b))

        # Step 2: Read [4-byte LE chunk_len][chunk_data] pairs
        # and concatenate all compressed chunk data
        compressed = bytearray()
        pos = 0
        while pos + 4 <= len(decrypted):
            chunk_len = struct.unpack("<I", decrypted[pos:pos+4])[0]
            pos += 4
            if chunk_len == 0:
                # Zero-length terminator (backward compat)
                continue
            if pos + chunk_len > len(decrypted):
                logger.error(f"Frame underflow: need {chunk_len} bytes at pos {pos}, have {len(decrypted) - pos}")
                return None
            compressed.extend(decrypted[pos:pos+chunk_len])
            pos += chunk_len

        # Step 3: Decompress
        if not compressed:
            return None
        try:
            return zlib.decompress(bytes(compressed))
        except zlib.error as e:
            logger.error(f"Decompression error: {e}")
            return None


class ProtocolWriter:
    """
    Writes messages to a TCP stream with zlib compression and XOR encryption.
    """
    
    def __init__(self, xor_cipher):
        self.cipher = xor_cipher
    
    def wrap(self, raw_msg):
        """
        Wrap a raw message for sending.
        Returns encrypted bytes ready to send over TCP.
        """
        # 1️⃣ zlib compress
        compressed = zlib.compress(raw_msg)

        # 2️⃣ Build framed output: single length-prefixed chunk
        framed = bytearray()
        framed.extend(struct.pack("<I", len(compressed)))
        framed.extend(compressed)

        # ❌ PAS de zero-length terminator

        # 3️⃣ XOR encrypt
        return self.cipher.process(framed)
