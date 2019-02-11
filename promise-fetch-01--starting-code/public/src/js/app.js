
var deferredPrompt;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});
var promise=new Promise(function(resolve,reject){
  setTimeout(function() {
    resolve('This is executed once the timer is done!');
  }, 3000);
})

fetch('http://httpbin.org/')
.then(function(data){
  return data.json();
}).then(function(data){
  console.log(JSON.stringify(data));
})
.catch(function(err) {
  console.log(err);
})
promise.then(function(strResolve){
  return strResolve;
}).then(function(str){
  console.log(str);
}).catch(function(err){
  console.log(err.code);
})

