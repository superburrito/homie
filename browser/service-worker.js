const homieCacheName = "HomieCache-0.3.73";

const cacheFirstPaths = [
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

	// Internal HTML JSS requests
  // Mains
	'/index.html',
	'/main.js',
	'/style.css',
  
  // Media items
  '/media/homieLogoFavicon.png',
  '/media/homieLogo96.png',
  '/media/homieLogo144.png',
  '/media/homieLogo192.png',
  '/media/helpDefault.jpg',
  '/media/homeDefault.jpg',
  '/media/landingDefault.jpg',
  '/media/mapIcon.png',
  '/media/thumbnail.png',
  '/media/defaultProfile.png',

  // Rights-related Media
  '/media/guideCover.png',
  '/media/safetyGuideCover.png',

  // Programs-related Media 
  '/media/programsCare.jpg',
  '/media/programsComp.jpg',

  // HTML Templates 
  '/ask/ask.template.html',
  '/forum/forum.template.html',
  '/help/help.template.html',
  '/home/home.template.html',
  '/landing/landing.template.html',
  '/map/profile.template.html',
  '/message/message.template.html',
  '/messages/messages.template.html',
  '/messenger/messenger.template.html',
  '/question/question.template.html',
  '/settings/settings.template.html',
  '/sidenav/sidenav.template.html',
  '/signup/signup.template.html',
  '/tasks/tasks.template.html',
  '/terms/terms.template.html',
  '/toolbar/toolbar.template.html',
  '/translator/translator.template.html',
];

const serverFirstPaths = [
  '/map/map.template.html', 
  '/programs/programs.template.html',
  '/rights/rights.template.html',
  '/api/'
]

// Helper: Policy Checker
const checkServerFirstPolicy = (requestUrlStr) => {
  for(let i=0; i<serverFirstPaths.length; i++){
    if(requestUrlStr.includes(serverFirstPaths[i])){
      return true;
    }
  }
  return false;
}

// Installation: Caching the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(homieCacheName).then((cache) => {
      console.log('[SW] Fetching and Installing cache-first files...');
      return cache.addAll(cacheFirstPaths);
    })
  );
});

// Activation: Clearing old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((cacheName) => {
        if (cacheName !== homieCacheName) {
          console.log('[SW] Removing outdated cache: ', cacheName);
          return caches.delete(cacheName).then(() => {
            console.log('[SW] Cache has been deleted.');
          });
        } else {
          console.log("[SW] Preserving cache: ", cacheName);
        }
      }));
    })
  );
});

// Fetching: Retrieving data based on connectivity
self.addEventListener('fetch', (event) => {
  // Make sure we are fetching a GET request
  if(event.request.method !== "GET") return;
  // Determine policy for request url
  if (checkServerFirstPolicy(event.request.url)) {  
    event.respondWith(
      // Fetch the request first
      fetch(event.request)
      .then((response) => {        
        return caches.open(homieCacheName).then((cache) => {
          cache.put(event.request, response.clone());
          console.log("[SW] Fetched and cached data for: ", event.request);
          return response;
        })
      })
      // Request could not be fetched, so check cache.
      .catch(function (err) {
        console.log("[SW] Server-first data fetch failed. Checking cache for: ", err);
        return caches.match(event.request).then((response) => {
          if (response) { 
            console.log('[SW] Server-first data found in cache for: ', event.request); 
            return response;
          } else {
            console.log("[SW] Server-first data not found in cache for: ", event.request); 
          }
        });
      })
    );
  // If a shell request was made
  } else {
    event.respondWith(
      // Check the cache for response. If the response isn't found, fetch it.
      caches.match(event.request).then((response) => {
        if (response) { 
          console.log('[SW] Cache-first data found in cache for: ', event.request); 
          return response;
        // Response could not be found in the cache, so fetch it.
        } else {
          console.log("[SW] Cache-first data not found in cache. Fetching: ", event.request);
          return fetch(event.request).then((response) => {
            return caches.open(homieCacheName).then((cache) => {
              cache.put(event.request, response.clone());
              console.log("[SW] Fetched and cached cache-first data for: ", event.request);
              return response;
            });
          })
          .catch(function (err) {
            console.log("[SW] Cache-first data fetched failed for: ", event.request);
          });
        }
      })
    );
  }
});


