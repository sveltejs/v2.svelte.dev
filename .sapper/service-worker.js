const ASSETS = `cache1513438768695`;

const to_cache = ["/client/5.5.fb1c84d729fdd4a9dfa4.js","/client/repl.0.fb1c84d729fdd4a9dfa4.js","/client/_.2.fb1c84d729fdd4a9dfa4.js","/client/blog_$slug$.3.fb1c84d729fdd4a9dfa4.js","/client/guide.4.fb1c84d729fdd4a9dfa4.js","/client/blog.1.fb1c84d729fdd4a9dfa4.js","/client/6.6.fb1c84d729fdd4a9dfa4.js","/client/7.7.fb1c84d729fdd4a9dfa4.js","/client/8.8.fb1c84d729fdd4a9dfa4.js","/client/9.9.fb1c84d729fdd4a9dfa4.js","/client/main.fb1c84d729fdd4a9dfa4.js","/index.html"].concat(["curl.js","fonts/Inconsolata/Inconsolata-Bold.woff","fonts/Inconsolata/Inconsolata-Bold.woff2","fonts/Inconsolata/Inconsolata-Regular.woff","fonts/Inconsolata/Inconsolata-Regular.woff2","fonts/Inconsolata/OFL.txt","fonts/Rajdhani/Rajdhani-Bold.woff","fonts/Rajdhani/Rajdhani-Bold.woff2","fonts/Rajdhani/Rajdhani-Medium.woff","fonts/Rajdhani/Rajdhani-Medium.woff2","fonts/Rajdhani/Rajdhani-Regular.woff","fonts/Rajdhani/Rajdhani-Regular.woff2","fonts/Roboto/Roboto-Bold.woff","fonts/Roboto/Roboto-Bold.woff2","fonts/Roboto/Roboto-Light.woff","fonts/Roboto/Roboto-Light.woff2","fonts/Roboto/Roboto-LightItalic.woff","fonts/Roboto/Roboto-LightItalic.woff2","global.css","icons/flip.svg","manifest.json","repl-viewer.css"]);
const cached = new Set(to_cache);

const routes = [{ pattern: /^\/repl$/ }, { pattern: /^\/blog$/ }, { pattern: /^\/guide$/ }, { pattern: /^\/$/ }, { pattern: /^\/blog\/([^\/]+)$/ }];

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
