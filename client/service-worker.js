const CACHE_NAME = `cache-v__CACHEVERSION__`;
const urlsToCache = __MANIFEST__;

self.addEventListener( 'install', event => {
	event.waitUntil(
		caches.open( CACHE_NAME )
			.then( cache => cache.addAll( urlsToCache ) )
			.then( () => self.skipWaiting() )
	);
});


self.addEventListener( 'activate', event => {
	event.waitUntil(
		caches.keys()
			.then( cacheNames => {
				return Promise.all(
					cacheNames.map( cacheName => {
						if ( cacheName !== CACHE_NAME ) {
							return caches.delete( cacheName );
						}
					})
				)
				.then( () => self.clients.claim() );
			})
	);
});


self.addEventListener( 'fetch', event => {
	event.respondWith(
		caches.match( event.request )
			.then( response => {
				if ( response ) return response;

				const fetchRequest = event.request.clone();

				return fetch( fetchRequest )
					.then( response => {
						// Check if we received a valid response
						if ( !response || response.status !== 200 || response.type !== 'basic' ) {
							return response;
						}

						const responseToCache = response.clone();

						caches.open( CACHE_NAME )
							.then( cache => {
								cache.put( event.request, responseToCache );
							});

						return response;
					});
			})
	);
});