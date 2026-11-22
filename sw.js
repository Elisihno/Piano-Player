const CACHE = 'piano-v5';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-192-v3.png', 'icon-512-v3.png', 'apple-touch-icon-v3.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request, { cache: 'no-store' }).then(r => { const c = r.clone(); caches.open(CACHE).then(ch => ch.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});
