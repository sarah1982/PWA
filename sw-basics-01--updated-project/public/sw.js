self.addEventListener('install',function(event){
    console.log("[serviceWorker] installing..", event);
})
self.addEventListener('install',function(event){
    console.log("[serviceWorker] activating..", event);
})
self.addEventListener('fetch',function(event){
    console.log("[serviceWorker] fetching..",event);
    event.respondWith(fetch(event.request));
})