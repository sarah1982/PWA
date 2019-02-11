var deferredEvent;
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then(function(){
        console.log('service worker registered');
    })
}
window.addEventListener('beforeinstallprompt',function(event){
    event.preventDefault();
    deferredEvent=event;
    return false;
});