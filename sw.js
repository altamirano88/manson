;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_manson',
    urlsToCache = [
        './',
        'https://fonts.googleapis.com/css?family=Raleway:400,700',
        'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
        'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
        'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
        './style.css',
        './script.js',
        './img/manson.jpg',
        './img/manson.jpg',
        './img/carrusel1.jpg',
        './img/carrusel4.jpg',
        './img/carrusel5.jpg',
        './img/correo.jpg',
        './img/favicon.png',
        './img/icon_32.png',
        './img/icon_64.png',
        './img/icon_100.png',
        './img/icon_128.png',
        './img/icon_196.png',
        './img/icon_256.png',
        './img/icon_512.png',
        './img/princi.jpg',
        './img/serivicios1.jpg',
        './img/servicios2.jpg',
        './img/servicios3.jpg'

    ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting())
            })
            .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        //Eliminamos lo que ya no se necesita en cache
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName)
                        }
                    })
                )
            })
            // Le indica al SW activar el cache actual
            .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    //recuperar del cache
                    return res
                }
                //recuperar de la petición a la url
                return fetch(e.request)
            })
    )
})