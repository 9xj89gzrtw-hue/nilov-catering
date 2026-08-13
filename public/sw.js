const CACHE = "nilov-v2";
const SHELL = ["/", "/menu", "/offline"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => caches.open(CACHE).then((c) => c.addAll(SHELL)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Never intercept: API, RSC payloads, _next/static (has its own cache headers)
  if (url.pathname.startsWith("/api/")) return;
  if (url.pathname.startsWith("/_next/")) return;
  if (e.request.method !== "GET") return;

  // Navigation requests (HTML pages) — NETWORK-FIRST to avoid stale content
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then((r) => {
          const cl = r.clone();
          caches.open(CACHE).then((ca) => ca.put(e.request, cl));
          return r;
        })
        .catch(() => caches.match(e.request).then((c) => c || caches.match("/offline")))
    );
    return;
  }

  // Static assets — cache-first (they have hashed filenames)
  e.respondWith(
    caches.match(e.request).then(
      (c) =>
        c ||
        fetch(e.request)
          .then((r) => {
            if (r.ok) {
              const cl = r.clone();
              caches.open(CACHE).then((ca) => ca.put(e.request, cl));
            }
            return r;
          })
          .catch(() => caches.match("/offline"))
    )
  );
});
