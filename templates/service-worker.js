const ASSETS = `cache__timestamp__`;

const to_cache = __shell__.concat(__assets__);
const cached = new Set(to_cache);

const routes = __routes__;

self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(ASSETS)
			.then(cache => cache.addAll(to_cache))
			.then(() => {
				self.skipWaiting();
			})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(async keys => {
			for (const key of keys) {
				if (key !== ASSETS) await caches.delete(key);
			}

			await self.clients.claim();
		})
	);
});

self.addEventListener('fetch', event => {
	const url = new URL(event.request.url);
	if (!/^https?/.test(url.protocol)) return;

	// always serve assets and webpack-generated files from cache
	if (cached.has(url.pathname)) {
		event.respondWith(caches.match(event.request));
		return;
	}

	// for pages, serve a shell index.html
	if (url.origin === self.origin && routes.find(route => route.pattern.test(url.pathname))) {
		event.respondWith(caches.match('/index.html'));
		return;
	}

	// for everything else, try the network first, falling back to
	// cache if the user is offline
	event.respondWith(
		caches
			.open('offline')
			.then(async cache => {
				try {
					const response = await fetch(event.request);
					cache.put(event.request, response.clone());
					return response;
				} catch(err) {
					const response = await cache.match(event.request);
					if (response) return response;

					throw err;
				}
			})
	);
});
