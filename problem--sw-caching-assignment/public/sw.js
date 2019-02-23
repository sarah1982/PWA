STATIC_CACHE_NAME="static-v3";
DYNAMIC_CACHE_NAME="dynamic-v3";
self.addEventListener('install',function(event){
    console.log("serviceworker installed");
    event.waitUntil(caches.open(STATIC_CACHE_NAME)
    .then(function(cache){
        cache.addAll([
            '/',
            '/index.html',
            '/src/js/main.js',
            '/src/js/material.min.js',
            '/src/css/app.css',
            '/src/css/dynamic.css',
            '/src/css/main.css',
            'https://fonts.googleapis.com/css?family=Roboto:400,700',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
    }))
})

self.addEventListener('activate',function(event){
    console.log("serviceworker activatted");
    event.waitUntil(caches.keys()
    .then(function(keyList){
        return Promise.all(keyList.map(function(key){
            if(key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME){
                return caches.delete(key);
            }
        }))
    }))
    return self.clients.claim();
})

self.addEventListener('fetch',function(event){
    console.log("serviceworker fetch");
    event.respondWith(
        caches.match(event.request)
        .then(function(res){
            if(res){
                return res;
            }else{
                return fetch(event.request)
                .then(function(res){
                    return caches.open(DYNAMIC_CACHE_NAME)
                    .then(function(cache){
                        cache.put(event.request.url,res.clone());
                        return res;
                    })
                })
                
            }
        }));
})

