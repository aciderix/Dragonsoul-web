/* sw.js – DragonSoul asset cache
 * Cache-first for binary assets (png, atlas, skel, fnt, tab)
 * Network-first for JS/HTML (always fresh after each deploy)
 */

const CACHE_NAME = 'ds-assets-v3';

self.addEventListener('install', e => { self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (!url.startsWith(self.location.origin)) return;

  // JS and HTML: network-first — must be fresh after each deploy
  if (/\.(js|html)(\?.*)?$/.test(url)) {
    e.respondWith(networkFirst(e.request));
    return;
  }

  // Binary assets (png, atlas, skel, fnt, tab…): cache-first
  e.respondWith(cacheFirst(e.request));
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const resp = await fetch(request);
    if (resp.ok && request.method === 'GET') cache.put(request, resp.clone());
    return resp;
  } catch (_) {
    const cached = await cache.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const resp = await fetch(request);
    if (resp.ok && request.method === 'GET') cache.put(request, resp.clone());
    return resp;
  } catch (_) {
    return new Response('Offline', { status: 503 });
  }
}

