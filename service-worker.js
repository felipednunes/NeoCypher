const cacheName = "neo-cypher-v1";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/scripts.js",
  "/generate.wav",
  "/copy.wav",
  "/musica.mp3",
  "/icon.ico",
  "/sound-on.svg",
  "/sound-off.svg",
  "/manifest.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
