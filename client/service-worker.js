const CACHE_NAME = `cache-v__CACHEVERSION__`;
const urlsToCache = __MANIFEST__; // eslint-disable-line no-undef

self.addEventListener( 'install', event => {
	console.log( 'install' );
	event.waitUntil(
		caches.open( CACHE_NAME )
			.then( cache => {
				return Promise.all(
					urlsToCache.map( url => {
						return cache.add( url ).catch( err => {
							console.error( `Error caching ${url}: ${err.message}` );
						});
					})
				);
			})
			.catch( err => {
				console.log( 'ffs' );
				console.error( err.stack );
			})
			.then( () => {
				console.log( `cached ${urlsToCache.length} urls` );
				self.skipWaiting();
			})
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
	if ( !/^https?/.test( event.request.url ) ) return;

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
								// no need to wait on this before responding
								cache.put( event.request, responseToCache ).catch( err => {
									console.error( `failed to cache ${event.request.url}: ${err.stack}` );
								});
							});

						return response;
					});
			})
			.catch( err => {
				console.error( err.stack );
			})
	);
});