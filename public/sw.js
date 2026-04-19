const CACHE = 'maths-quests-v2';
const SHELL = ['/', '/index.html', '/manifest.json', '/icon.png',
  '/mascot.png', '/mascot-happy.png', '/mascot-ok.png', '/mascot-sad.png'];

/* Install: pre-cache shell assets */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

/* Activate: purge old caches */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Fetch strategy:
   - Same-origin JS/CSS/fonts (hashed bundles): cache-first
   - HTML navigation: network-first (always get fresh shell)
   - Supabase/PostHog API calls: network-only (never cache)
   - Everything else: stale-while-revalidate
*/
self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  /* Skip non-GET and cross-origin API calls */
  if (request.method !== 'GET') return;
  if (url.hostname !== self.location.hostname &&
      !url.pathname.startsWith('/assets/')) return;

  /* Network-only for Supabase and analytics */
  if (url.hostname.includes('supabase.co') ||
      url.hostname.includes('posthog.com') ||
      url.hostname.includes('sentry.io')) return;

  /* Navigation: network-first, fall back to cached /index.html */
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then(res => { caches.open(CACHE).then(c => c.put(request, res.clone())); return res; })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  /* Hashed JS/CSS/font assets: cache-first (immutable) */
  if (url.pathname.startsWith('/assets/')) {
    e.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(res => {
          caches.open(CACHE).then(c => c.put(request, res.clone()));
          return res;
        });
      })
    );
    return;
  }

  /* Everything else: stale-while-revalidate */
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(request).then(cached => {
        const network = fetch(request).then(res => {
          if (res && res.status === 200) cache.put(request, res.clone());
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    )
  );
});
