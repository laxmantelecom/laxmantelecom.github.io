// Minimal service worker for Laxman Telecom - caches the core pages so the
// site opens instantly and works even with a weak/offline connection.
// Firebase-dependent pages (login, dashboard, admin, vendor) still need a
// live connection to actually load data - this only speeds up/caches the
// static shell (HTML, CSS, images).

const CACHE_NAME = 'laxman-telecom-cache-v2';
const PRECACHE_URLS = [
  '/index.html',
  '/style.css',
  '/script.js',
  '/laxman-telecom-icon-round.png',
  '/laxman-telecom-logo-full.png',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network-first for navigation requests (so users always get the latest
  // page when online), falling back to cache when offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request).then((r) => r || caches.match('/index.html')))
    );
    return;
  }

  // Cache-first for static assets already precached.
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
