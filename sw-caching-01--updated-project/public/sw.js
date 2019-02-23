var CACHE_STATIC='static-v5';
var CACHE_DYNAMIC='dynamic-v2';

self.addEventListener('install', function(event) {
    //To prevent failed to execute 'fetch' on 'serviceworkerglobalscope'

  event.waitUntil(caches.open(CACHE_STATIC)
  .then(function(cacheitem){
    cacheitem.addAll([
      '/',
      '/index.html',
      'src/js/app.js',
      'src/js/feed.js',
      'src/js/promise.js',
      'src/js/fetch.js',
      'src/js/material.min.js',
      'src/css/app.css',
      'src/css/feed.css',
      'src/images/main-image.jpg',
      "https://fonts.googleapis.com/css?family=Roboto:400,700",
      "https://fonts.googleapis.com/icon?family=Material+Icons",
      "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css"
    ]);

    console.log("Items are precached")
  }));
 
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
    .then(function(keyList){
      return Promise.all(keyList.map(function(key){
        if(key !== CACHE_STATIC && key!==CACHE_DYNAMIC){
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  
  event.respondWith(
    caches.match(event.request)
          .then(function(response){
            if(response){
              return response;
            }
            else{
              return fetch(event.request)
              .then(function(res){
                return caches.open(CACHE_DYNAMIC)
                .then(function(cache){
                   cache.put(event.request.url,res.clone());
                   return res;
                })
             
              })
              .catch(function(err){
                  
              })
            }
          }));
});