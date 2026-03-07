/* sw.js – DragonSoul asset optimizer
 * Intercepts .png requests → serves pre-converted .png.webp (lossless WebP)
 * Also caches assets so subsequent loads are instant.
 */

const CACHE_NAME = 'ds-assets-v3';

// On install: skip waiting so SW activates immediately
self.addEventListener('install', e => {
  self.skipWaiting();
});

// On activate: delete old caches then claim clients
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Intercept fetch
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Only handle same-origin requests to our assets
  if (!url.startsWith(self.location.origin)) return;

  const isPng = url.match(/\.png(\?.*)?$/);

  if (isPng) {
    e.respondWith(serveWebP(e.request, url));
  } else {
    // For everything else: cache-first, then network
    e.respondWith(cacheFirst(e.request));
  }
});

async function serveWebP(request, url) {
  const webpUrl = url.replace(/\.png(\?.*)?$/, '.png.webp');
  const cache = await caches.open(CACHE_NAME);

  // Check cache for webp first
  const cached = await cache.match(webpUrl);
  if (cached) return cached;

  // Try fetching the .webp version
  try {
    const resp = await fetch(webpUrl);
    if (resp.ok) {
      // Clone and store with correct Content-Type
      const headers = new Headers(resp.headers);
      headers.set('Content-Type', 'image/webp');
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      const body = await resp.arrayBuffer();
      const webpResp = new Response(body, { status: 200, headers });
      cache.put(webpUrl, webpResp.clone());
      return webpResp;
    }
  } catch (_) {}

  // Fallback: original PNG (still cache it)
  return cacheFirst(request);
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const resp = await fetch(request);
    if (resp.ok && request.method === 'GET') {
      cache.put(request, resp.clone());
    }
    return resp;
  } catch (e) {
    return new Response('Offline', { status: 503 });
  }
}
