const CACHE_NAME = "climora-v2";
const ASSETS = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "https://unpkg.com/leaflet/dist/leaflet.css",
  "https://unpkg.com/leaflet/dist/leaflet.js"
];

// Install Event: Save files to cache
self.addEventListener("install", (event) => {
  console.log("Climora Service Worker: Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Climora Service Worker: Caching App Shell");
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch Event: Serve from cache if offline
self.addEventListener("fetch", (event) => {
  // Only intercept GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return the cached file if it exists, otherwise fetch from the internet
      return cachedResponse || fetch(event.request);
    }).catch(() => {
      console.log("Network request failed and no cache found.");
    })
  );
});

// Activate Event: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Climora Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});