#!/usr/bin/env python3
"""
Extract and convert all assets from DragonSoul-Fixed2.apk to proto/output/web/assets/
- ETC1 textures → PNG (pure Python decoder, no PIL needed)
- Atlas files → fix .etc1 → .png references
- Fonts, Spine files, shaders → copy as-is
"""

import zipfile, gzip, struct, zlib, os, sys, time

APK = '/home/user/Dragonsoul-web/DragonSoul-Fixed2.apk'
OUT = '/home/user/Dragonsoul-web/proto/output/web/assets'

# ── ETC1 modifier tables ───────────────────────────────────────────────────────
MODIFIERS = [
    [2,   8,  -2,  -8],
    [5,  17,  -5, -17],
    [9,  29,  -9, -29],
    [13, 42, -13, -42],
    [18, 60, -18, -60],
    [24, 80, -24, -80],
    [33,106, -33,-106],
    [47,183, -47,-183],
]

def clamp(v): return 0 if v < 0 else (255 if v > 255 else v)

def decode_etc1(data, orig_w, orig_h, enc_w, enc_h):
    """Decode raw ETC1 block data → bytearray of RGBA pixels (orig_w × orig_h × 4)."""
    pixels = bytearray(orig_w * orig_h * 4)
    blocks_x = enc_w  // 4
    blocks_y = enc_h  // 4
    offset = 0

    for by in range(blocks_y):
        for bx in range(blocks_x):
            b0,b1,b2,b3,b4,b5,b6,b7 = data[offset:offset+8]
            offset += 8

            diff = (b3 >> 1) & 1
            flip = b3 & 1
            cw0  = (b3 >> 5) & 7
            cw1  = (b3 >> 2) & 7

            if diff:
                # Differential mode: 5-bit base + 3-bit signed delta
                r0 = (b0 >> 3) & 0x1F
                g0 = (b1 >> 3) & 0x1F
                b_0 = (b2 >> 3) & 0x1F
                dr = b0 & 7; dr = dr - 8 if dr >= 4 else dr
                dg = b1 & 7; dg = dg - 8 if dg >= 4 else dg
                db = b2 & 7; db = db - 8 if db >= 4 else db
                r1 = r0 + dr; g1 = g0 + dg; b1_ = b_0 + db
                # 5-bit → 8-bit
                R0 = (r0  << 3) | (r0  >> 2)
                G0 = (g0  << 3) | (g0  >> 2)
                B0 = (b_0 << 3) | (b_0 >> 2)
                R1 = (r1  << 3) | (r1  >> 2)
                G1 = (g1  << 3) | (g1  >> 2)
                B1 = (b1_ << 3) | (b1_ >> 2)
            else:
                # Individual mode: 4-bit each
                r0 = (b0 >> 4) & 0xF; r1 = b0 & 0xF
                g0 = (b1 >> 4) & 0xF; g1 = b1 & 0xF
                b_0 = (b2 >> 4) & 0xF; b1_ = b2 & 0xF
                # 4-bit → 8-bit
                R0 = (r0  << 4) | r0
                G0 = (g0  << 4) | g0
                B0 = (b_0 << 4) | b_0
                R1 = (r1  << 4) | r1
                G1 = (g1  << 4) | g1
                B1 = (b1_ << 4) | b1_

            # Pixel indices: MSB in bytes 4-5 (big-endian 16-bit), LSB in bytes 6-7
            msb = (b4 << 8) | b5
            lsb = (b6 << 8) | b7

            for px in range(4):        # column within block (x)
                for py in range(4):    # row within block (y)
                    # Column-major bit ordering
                    bit_pos = 15 - (px * 4 + py)
                    idx = (((msb >> bit_pos) & 1) << 1) | ((lsb >> bit_pos) & 1)

                    # Subblock selection
                    if flip == 0:
                        use_sub0 = (px < 2)   # vertical split
                    else:
                        use_sub0 = (py < 2)   # horizontal split

                    if use_sub0:
                        r_base, g_base, b_base, cw = R0, G0, B0, cw0
                    else:
                        r_base, g_base, b_base, cw = R1, G1, B1, cw1

                    mod = MODIFIERS[cw][idx]
                    r = clamp(r_base + mod)
                    g = clamp(g_base + mod)
                    b = clamp(b_base + mod)

                    dst_x = bx * 4 + px
                    dst_y = by * 4 + py
                    if dst_x < orig_w and dst_y < orig_h:
                        pos = (dst_y * orig_w + dst_x) * 4
                        pixels[pos]   = r
                        pixels[pos+1] = g
                        pixels[pos+2] = b
                        pixels[pos+3] = 255  # fully opaque (ETC1 has no alpha)

    return pixels


def encode_png(width, height, rgba):
    """Encode RGBA bytearray as PNG bytes (pure Python, no PIL)."""
    def crc32(b): return zlib.crc32(b) & 0xFFFFFFFF
    def chunk(tag, data):
        payload = tag + data
        return struct.pack('>I', len(data)) + payload + struct.pack('>I', crc32(payload))

    # Build raw scanlines with filter byte 0 (None)
    row_size = width * 4
    raw = bytearray(height * (row_size + 1))
    for y in range(height):
        raw[y * (row_size + 1)] = 0                      # filter byte
        raw[y*(row_size+1)+1 : (y+1)*(row_size+1)] = rgba[y*row_size:(y+1)*row_size]

    compressed = zlib.compress(bytes(raw), 1)             # level 1 = fast

    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)  # RGBA
    return (b'\x89PNG\r\n\x1a\n'
            + chunk(b'IHDR', ihdr)
            + chunk(b'IDAT', compressed)
            + chunk(b'IEND', b''))


def parse_pkm(data):
    """Parse LibGDX ETC1 file. Returns (orig_w, orig_h, enc_w, enc_h, etc1_bytes)."""
    # data[0:4]  = LibGDX magic 0x00040010
    # data[4:20] = PKM header: "PKM " + "10" + type(2) + enc_w(2) + enc_h(2) + orig_w(2) + orig_h(2)
    enc_w  = struct.unpack('>H', data[12:14])[0]
    enc_h  = struct.unpack('>H', data[14:16])[0]
    orig_w = struct.unpack('>H', data[16:18])[0]
    orig_h = struct.unpack('>H', data[18:20])[0]
    return orig_w, orig_h, enc_w, enc_h, data[20:]


def convert_etc1_to_png(raw_gz):
    """Read gzip+PKM+ETC1 bytes, return PNG bytes."""
    data = gzip.decompress(raw_gz)
    orig_w, orig_h, enc_w, enc_h, etc1 = parse_pkm(data)
    rgba = decode_etc1(etc1, orig_w, orig_h, enc_w, enc_h)
    return encode_png(orig_w, orig_h, rgba)


def fix_atlas(text):
    """Replace .etc1 references with .png in atlas file text."""
    import re
    # First line is the texture file name, e.g. "base.etc1"
    lines = text.split('\n')
    result = []
    for line in lines:
        # Replace .etc1 at start of line (texture page filename)
        if line.endswith('.etc1'):
            line = line[:-5] + '.png'
        result.append(line)
    return '\n'.join(result)


def main():
    t0 = time.time()
    os.makedirs(OUT, exist_ok=True)

    with zipfile.ZipFile(APK) as z:
        names = [n for n in z.namelist() if n.startswith('assets/')]
        total = len(names)
        print(f'Found {total} asset files in APK')

        etc1_count = png_count = text_count = skip_count = 0

        for i, name in enumerate(names):
            # Relative path from assets/
            rel = name[len('assets/'):]
            out_path = os.path.join(OUT, rel)

            # Skip directories
            if name.endswith('/'):
                continue

            ext = name.rsplit('.', 1)[-1].lower() if '.' in name else ''

            # Progress every 10 files
            if i % 10 == 0:
                elapsed = time.time() - t0
                print(f'  [{i}/{total}] {rel[:60]:<60s} {elapsed:.1f}s', end='\r', flush=True)

            raw = z.read(name)

            if ext == 'etc1':
                # Decode ETC1 → PNG, save as .png
                out_png = out_path[:-5] + '.png'
                if os.path.exists(out_png):
                    etc1_count += 1
                    continue
                os.makedirs(os.path.dirname(out_png), exist_ok=True)
                try:
                    png = convert_etc1_to_png(raw)
                    with open(out_png, 'wb') as f:
                        f.write(png)
                    etc1_count += 1
                except Exception as e:
                    print(f'\n  ERROR converting {rel}: {e}')

            elif ext == 'atlas':
                # Fix .etc1 → .png references
                if os.path.exists(out_path):
                    text_count += 1
                    continue
                os.makedirs(os.path.dirname(out_path), exist_ok=True)
                text = raw.decode('utf-8', errors='replace')
                fixed = fix_atlas(text)
                with open(out_path, 'w', encoding='utf-8') as f:
                    f.write(fixed)
                text_count += 1

            elif ext in ('png', 'fnt', 'skel', 'p', 'glsl', 'css', 'txt',
                         'ogg', 'pb', 'properties'):
                # Copy as-is
                if os.path.exists(out_path):
                    skip_count += 1
                    continue
                os.makedirs(os.path.dirname(out_path), exist_ok=True)
                with open(out_path, 'wb') as f:
                    f.write(raw)
                png_count += 1

            else:
                skip_count += 1

    elapsed = time.time() - t0
    print(f'\nDone in {elapsed:.1f}s:')
    print(f'  ETC1→PNG: {etc1_count}')
    print(f'  Copied/fixed: {png_count + text_count}')
    print(f'  Skipped: {skip_count}')
    print(f'  Output: {OUT}')

    # Count output files and total size
    total_size = 0
    total_files = 0
    for root, dirs, files in os.walk(OUT):
        for f in files:
            p = os.path.join(root, f)
            total_size += os.path.getsize(p)
            total_files += 1
    print(f'  Output: {total_files} files, {total_size//1024//1024}MB total')


if __name__ == '__main__':
    main()
