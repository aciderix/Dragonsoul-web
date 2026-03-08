#!/usr/bin/env python3
"""
DragonSoul local dev HTTP server
- Serves .png.webp when .png is requested (50% smaller, lossless)
- Gzip on-the-fly for classes.js (80MB → 13MB)
- Cache-Control headers for fast subsequent loads
- CORS headers for XHR from localhost

Usage:
    python3 server/http_server.py [--port 3000] [--dir proto/output/web]
"""

import argparse
import gzip
import io
import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'application/javascript',
    '.json': 'application/json',
    '.css':  'text/css',
    '.png':  'image/png',
    '.webp': 'image/webp',
    '.ogg':  'audio/ogg',
    '.mp3':  'audio/mpeg',
    '.atlas': 'text/plain',
    '.txt':  'text/plain',
    '.gz':   'application/gzip',
}

# Files to serve gzip-compressed (if browser accepts)
GZIP_EXTS = {'.js', '.json', '.html', '.css', '.atlas', '.txt'}

# Cache durations
CACHE_IMMUTABLE = 'public, max-age=31536000, immutable'  # 1 year - static assets
CACHE_SHORT     = 'public, max-age=3600'                  # 1 hour - html/sw


class OptimizedHandler(SimpleHTTPRequestHandler):

    def do_GET(self):
        self._serve()

    def do_HEAD(self):
        self._serve(head_only=True)

    def do_OPTIONS(self):
        self.send_response(204)
        self._add_cors()
        self.end_headers()

    def _serve(self, head_only=False):
        # Strip query string
        path = self.path.split('?')[0]
        file_path = Path(self.directory) / path.lstrip('/')

        # PNG → WebP substitution
        if path.endswith('.png'):
            webp_path = Path(str(file_path) + '.webp')
            if webp_path.exists():
                file_path = webp_path
                path = path + '.webp'

        if not file_path.exists() or not file_path.is_file():
            # Directory index
            if file_path.is_dir():
                file_path = file_path / 'index.html'
            if not file_path.exists():
                self.send_error(404)
                return

        ext = file_path.suffix.lower()
        content_type = MIME.get(ext, 'application/octet-stream')

        # Fix content-type when we're serving a .webp as response to .png request
        if self.path.rstrip('/').split('?')[0].endswith('.png') and ext == '.webp':
            content_type = 'image/webp'

        # Read file
        data = file_path.read_bytes()

        # Gzip if applicable and client accepts
        accept_enc = self.headers.get('Accept-Encoding', '')
        use_gzip = ('gzip' in accept_enc) and (ext in GZIP_EXTS)

        if use_gzip:
            buf = io.BytesIO()
            with gzip.GzipFile(fileobj=buf, mode='wb', compresslevel=6) as gz:
                gz.write(data)
            data = buf.getvalue()

        # Cache-Control
        if ext in ('.html', '.js') and 'classes' not in str(file_path):
            cache = CACHE_SHORT
        elif ext == '.html':
            cache = CACHE_SHORT
        else:
            cache = CACHE_IMMUTABLE

        # Send response
        self.send_response(200)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Cache-Control', cache)
        if use_gzip:
            self.send_header('Content-Encoding', 'gzip')
        self._add_cors()
        self.end_headers()

        if not head_only:
            self.wfile.write(data)

    def _add_cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Range')

    def log_message(self, fmt, *args):
        # Suppress per-request noise for assets, show only errors and first load
        code = args[1] if len(args) > 1 else '?'
        if code not in ('200', '304'):
            super().log_message(fmt, *args)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=3000)
    parser.add_argument('--dir', default='proto/output/web')
    args = parser.parse_args()

    web_dir = os.path.abspath(args.dir)
    if not os.path.isdir(web_dir):
        print(f"ERROR: directory not found: {web_dir}", file=sys.stderr)
        sys.exit(1)

    handler = lambda *a, **kw: OptimizedHandler(*a, directory=web_dir, **kw)
    server = HTTPServer(('0.0.0.0', args.port), handler)
    print(f"DragonSoul dev server: http://localhost:{args.port}/")
    print(f"Serving: {web_dir}")
    print(f"WebP substitution: ON  |  Gzip: ON  |  Cache: ON")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == '__main__':
    main()
