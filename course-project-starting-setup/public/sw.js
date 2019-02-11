self.addEventListener('install',function(event){
    console.log('service worker installing...',event);
})

self.addEventListener('activate',function(event){
    console.log('service worker activated...',event);
    return self.clients.claim();
});
self.addEventListener('fetch',function(event){
    console.log('service worker fetched...',event);
    event.respondWith(fetch(event.request));
});