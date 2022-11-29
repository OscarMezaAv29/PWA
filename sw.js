importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.precaching.precacheAndRoute([
    'index.html',
    'braille.html',
    'lsm.html',
    'img',
]);

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.NetworkOnly()
);

workbox.routing.registerRoute(
    ({request}) => request.destination === 'document',
    new workbox.strategies.NetworkOnly()
);

//si hay una respuesta que genere error
workbox.routing.setCatchHandler(async context => {
    console.log("entro");
    console.log(context);
    console.log(context.request);
    
    if (context.request.destination === 'image') {
        return workbox.precaching.matchPrecache('icon/offline.jpg');
    } else if (context.request.destination === 'document') {
        return workbox.precaching.matchPrecache('offline.html')
    }
    return Response.error();
})

// var cacheName = 'appV1';
// var contenidoCache = [
//     'index.html',
//     'braille.html',
//     'lsm.html',
//     'app.js',
//     'sw.js',
//     'manifest.webmanifest',
//     'img',
//     'styles.css',
// ];
// self.addEventListener('install', (e)=>{
//     console.log("Instalado");
//     e.waitUntil(async()=>{
//         const cache = await caches.open(cacheName);
//         await cache.addAll(contenidoCache);
//     })
// });
// self.addEventListener('fetch', (e)=>{
//     e.respondWith((async()=>{
//         const r = await caches.match(e.request);
//         if (r) return r;
//         const response = await fetch(e.request);
//         const cache = await caches.open(cacheName);
//         cache.put(e.request, response.clone());
//         return response;
//     })())
// })