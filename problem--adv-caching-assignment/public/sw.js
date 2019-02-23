
var CACHE_STATIC_NAME = 'static-v8';
var CACHE_DYNAMIC_NAME = 'dynamic-v9';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        cache.addAll([
          '/',
          '/index.html',
          '/src/css/app.css',
          '/src/css/main.css',
          '/src/js/main.js',
          '/src/js/material.min.js',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME) {
            return caches.delete(key);
          }
        }));
      })
  );
});

//cache and network with dynamic caching
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function(res) {
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 });
//             })
//             .catch(function(err) {

//             });
//         }
//       })
//   );
// });


//Network only
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request)
//   )
//   console.log("Network only");
// });


// //Cache Only
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//   )
//   console.log("Cache only");
// });

// 4) Replace it with "Network, cache fallback" strategy =>  => Clear Storage (in Dev Tools), reload & try using your app offline
// self.addEventListener('fetch',function(event){
//   event.respondWith(
//    fetch(event.request)

//      .catch(function(err){
//          caches.match(event.request)
//          .then(function(data){
//            console.log("From cache");
//            return data;
//          })

//         })
//       )

//       })
// 5) Replace it with a "Cache, then network" strategy => Clear Storage (in Dev Tools), reload & try using your app offline
self.addEventListener('fetch',function(event){
  event.respondWith(
    caches.open(CACHE_DYNAMIC_NAME)
    .then(function(cache){
      return fetch(event.requst)
      .then(function(res){
        cache.put(event.request,res.clone());
        return res;
      })
    })
  )
})

// 6) Add "Routing"/ URL Parsing to pick the right strategies: Try to implement "Cache, then network", "Cache with network fallback" and "Cache only" (all of these, with appropriate URL selection)
self.addEventListener('fetch',function(event){
  event.respondWith(
    caches.open(CACHE_DYNAMIC_NAME)
    .then(function(cache){
      return fetch(event.requst)
      .then(function(res){
        cache.put(event.request,res.clone());
        return res;
      })
    })
  )
})