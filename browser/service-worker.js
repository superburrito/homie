// Cache for application shell
var apiCacheName = "HomieAPICache-v3";
var shellCacheName = "HomieShellCache-v3";

var filesToCache = [
	// External dependencies (npm and bower)
	'https://fonts.googleapis.com/css?family=Lato',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'/node_modules/angular/angular.min.js',
	'/node_modules/angular-animate/angular-animate.min.js',
	'/node_modules/angular-aria/angular-aria.min.js',
	'/node_modules/angular-material/angular-material.min.js',
	'/node_modules/angular-ui-router/release/angular-ui-router.min.js',
  '/node_modules/angular-material/angular-material.min.css',
  '/node_modules/angular-translate/dist/angular-translate.min.js',
	'/bower_components/ng-file-upload/ng-file-upload-shim.min.js',
	'/bower_components/ng-file-upload/ng-file-upload.min.js',
	'/bower_components/angular-cloudinary/angular-cloudinary.js',
  'https://code.responsivevoice.org/responsivevoice.js',
  '/bower_components/ngmap/build/scripts/ng-map.min.js',
  'https://maps.google.com/maps/api/js?key=AIzaSyDNUChV5viHxGHs_UnQeddcPT7-aidLZTI', 

	// Internal HTML JSS requests
  '/',
	'/index.html',
	'/main.js',
	'/style.css',
	'/home/home.template.html',
	'/landing/landing.template.html',
	'/map/map.template.html',
	'/navbar/navbar.template.html',
	'/phrasebook/phrasebook.template.html',
	'/settings/settings.template.html',
	'/sidenav/sidenav.template.html',
	'/signup/signup.template.html',
	'/tasks/tasks.template.html',
	'/terms/terms.template.html',
	'/toolbar/toolbar.template.html',
	'/translator/translator.template.html',

	// Media files
	'/media/thumbnail.png'
];


// Installation: Caching the app shell
self.addEventListener('install', function (event) {
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(shellCacheName).then(function (cache) {
      console.log('[SW] Caching Homie App Shell...');
      return cache.addAll(filesToCache);
    })
  );
});


// Activation: Clearing old caches
self.addEventListener('activate', function (event) {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (cacheName) {
        if (cacheName !== shellCacheName) {
          console.log('[SW] Removing old cache', cacheName);
          return caches.delete(cacheName);
        }
        console.log("[SW] Not removing cache ", cacheName);
      }));
    })
  );
});


// Fetching: Retrieving data based on connectivity
self.addEventListener('fetch', function (event) {
  var apiUrl = '128.199.104.204/'
  var localUrl = 'localhost:8080';

  // Make sure we are fetching a GET request
  if(event.request.method != "GET") return;

  // If an API (data) request was made
  if (event.request.url.includes(apiUrl) ||
      event.request.url.includes(localUrl)) {
    event.respondWith(
      // Fetch the request first
      fetch(event.request)
      .then(function (response) {        
        return caches.open(apiCacheName).then(function (cache) {
          cache.put(event.request, response.clone());
          console.log("[SW] Fetched and cached API data for: ", event.request);
          return response;
        })
      })
      // Request could not be fetched, so check cache.
      .catch(function (err) {
        console.log("[SW] API data fetch failed. Checking cache for: ", err);
        return caches.match(event.request).then(function (response) {
          if (response) { 
            console.log('[SW] API data found in cache for: ', event.request); 
            return response;
          } else {
            console.log("[SW] API data not found in cache for: ", event.request); 
          }
        });
      })
    );
  // If a shell request was made
  } else {
    event.respondWith(
      // Check the cache for response. If the response isn't found, fetch it.
      caches.match(event.request).then(function (response) {
        if (response) { 
          console.log('[SW] App Shell data found in cache for: ', event.request); 
          return response;
        // Response could not be found in the cache, so fetch it.
        } else {
          console.log("[SW] App Shell data not found in cache. Fetching: ", event.request);
          return fetch(event.request).then(function (response) {
            return caches.open(shellCacheName).then(function (cache) {
              cache.put(event.request, response.clone());
              console.log("[SW] Fetched and cached App Shell data for: ", event.request);
              return response;
            });
          })
          .catch(function (err) {
            console.log("[SW] App Shell data fetched failed for: ", event.request);
          });
        }
      })
    );
  }
});


