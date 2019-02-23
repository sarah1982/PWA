
var CACHE_STATIC_NAME = 'static-v12';
var CACHE_DYNAMIC_NAME = 'dynamic-v8';

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          '/',
          '/index.html',
          '/offline.html',
          '/src/js/app.js',
          '/src/js/feed.js',
          '/src/js/promise.js',
          '/src/js/fetch.js',
          '/src/js/material.min.js',
          '/src/css/app.css',
          '/src/css/feed.css',
          '/src/images/main-image.jpg',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
      })
  )
});
self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

/* cache with network fallback */

/*self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                   cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err) {
              return caches.open(CACHE_STATIC_NAME)
              .then(function(cache){
                return cache.match('/offline.html')
              })

            });
        }
      })
  );
});*/

/*cahe only*/
/*self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request))
  })*/

  /*network only*/
/*self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request))
  })*/


  /*network with cache fallback*/
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
    .then(function(res){
      console.log("The response from network" , res);
      return res;
    }).then(function(res){
      caches.open(CACHE_DYNAMIC_NAME)
      .then(function(cache){
        cache.put(event.request.url,res.clone());
        return res;
      })
    })
    .catch(function(err){
      return caches.match(event.request);
    })
  );
});

/* cache then network */
/*self.addEventListener('fetch',function(event){
  event.respondWith(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache){
        cache.match(event.request)
        .then(function(res){
          return res;
        }).catch(function(err){
          return fetch(event.request);
        })
      })
  )
})*/