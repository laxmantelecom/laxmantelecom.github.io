/* Laxman Telecom - Service Worker (v4)
   Pehle ye JS/CSS files ko "cache-first" deta tha, isliye app purani file chalata rehta tha.
   Ab: website ki apni files hamesha pehle network se (taaza), net na ho tabhi cache se. */

const CACHE_NAME = 'laxman-telecom-cache-v4';

const PRECACHE = [
  '/index.html',
  '/style.css',
  '/script.js',
  '/laxman-telecom-icon-round.png',
  '/laxman-telecom-logo-full.png',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all(
        PRECACHE.map((url) => cache.add(url).catch(() => {}))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Sirf apni site ki GET requests. Firebase / Google ki requests ko haath nahi lagate.
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((cached) => {
          if (cached) return cached;
          if (req.mode === 'navigate') return caches.match('/index.html');
          return Response.error();
        })
      )
  );
});
