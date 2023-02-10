var cacheName = 'petstore-v1';
var cacheFiles = [
    'checkout.html',
    'products.js',
    'petstore.webmanifest',
    'image/math.png',
    'image/gr.png'
];

self.addEventListener('install',(e) => {
    console.log("[Service Worker] install");
    e.waitUntil(
        caches.open(cacheName).then((cache)=>{
            console.log("[Service Worker] Caching all the files");
            return cache.addAll(cacheFiles);
})
    );
});

// self.addEventListener('fetch',function (e) {
//     e.respondWith(
//         caches.match(e.request).then((function (r){
//             console.log("[Service Worker] Fetching resource:"+ e.request.url);
//             return r
// }))
// );
// });

self.addEventListener('fetch',function (e) {
    e.respondWith(
        caches.match(e.request).then((function (r){
            return r || fetch(e.request).then(function (cache){
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
}))
);
});