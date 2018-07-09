var staticCachName = 'restaurant'
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCachName).then(function (cache) {
      return cache.addAll(
        [
         '/',
         'index.html',
         'js/main.js',
         'css/styles.css',
         'restaurant.html',
         'img/1.jpg',
         'img/2.jpg',
         'img/3.jpg',
         'img/4.jpg',
         'img/5.jpg',
         'img/6.jpg',
         'img/7.jpg',
         'img/8.jpg',
         'img/9.jpg',
         'img/10.jpg',
         'data/restaurants.json'
       ]
     );
    })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cachName) {
          return cachName.startsWith('restaurant') && cachName !== staticCachName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
})
