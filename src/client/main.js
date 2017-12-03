import roadtrip from 'roadtrip';
import Index from '../universal/routes/Index.html';
import BlogIndex from '../universal/routes/BlogIndex.html';
import BlogPost from '../universal/routes/BlogPost.html';
import Guide from '../universal/routes/Guide.html';
import Repl from '../universal/routes/Repl/index.html';
import Nav from '../universal/components/Nav.html';
import Toast from '../universal/components/Toast.html';
import store from '../universal/store.js';
import * as ajax from './ajax.js';

const header = document.querySelector( 'header' );
const main = document.querySelector( 'main' );

new Nav({
	target: ( header.innerHTML = '', header ),
	store
});

let view;

// legacy
function redirect ( from, to ) {
	roadtrip.add( from, {
		enter: route => {
			if ( typeof to === 'function' ) to = to( route );
			roadtrip.goto( to, { replaceState: true });
		}
	});
}

redirect( '/blog/', '/blog' );
redirect( '/guide/', '/guide' );
redirect( '/blog/:slug/', route => `/blog/${route.params.slug}` );
redirect( '/repl/', route => {
	const query = Object.keys( route.query ).map( key => `${key}=${route.query[key]}` ).join( '&' );
	return query ? `/repl?${query}` : '/repl';
});

roadtrip
	.add( '/', {
		enter ( route ) {
			store.set({ route: 'index' });

			if ( route.isInitial ) return; // page is static

			document.title = 'Svelte • The magical disappearing UI framework';

			if ( view ) {
				view.destroy();
			} else {
				main.innerHTML = '';
			}

			view = new Index({
				target: main,
				store
			});

			window.scrollTo( route.scrollX, route.scrollY );

			// preload blog and guide
			ajax.getJSON( `/blog.[hash].json` ).then( () => {
				return ajax.getJSON( `/guide.[hash].json` );
			});
		}
	})
	.add( '/blog', {
		enter ( route ) {
			store.set({ route: 'blog' });

			if ( route.isInitial ) return; // page is static

			document.title = 'Svelte • The magical disappearing UI framework';

			if ( view ) {
				view.destroy();
			} else {
				main.innerHTML = '';
			}

			return ajax.getJSON( `/blog.[hash].json` ).then( posts => {
				view = new BlogIndex({
					target: main,
					data: {
						posts
					},
					store
				});

				window.scrollTo( route.scrollX, route.scrollY );

				// start preloading blog posts
				posts.reduce( ( promise, post ) => {
					return promise.then( () => ajax.getJSON( `/blog/${post.slug}.json` ) );
				}, Promise.resolve() )

					// then preload the guide
					.then( () => ajax.getJSON( `/guide.[hash].json` ) );
			});
		}
	})
	.add( '/blog/:slug', {
		enter ( route ) {
			store.set({ route: 'blog' });

			if ( route.isInitial ) return; // page is static

			return ajax.getJSON( `/blog/${route.params.slug}.json` ).then( post => {
				document.title = `${post.metadata.title} • Svelte`;

				if ( view ) {
					view.destroy();
				} else {
					main.innerHTML = '';
				}

				view = new BlogPost({
					target: main,
					data: {
						post
					},
					store
				});

				// TODO this doesn't work because it's the <main> that scrolls, not the window
				window.scrollTo( route.scrollX, route.scrollY );

				// preload blog index and guide
				ajax.getJSON( `/blog.[hash].json` ).then( () => {
					return ajax.getJSON( `/guide.[hash].json` );
				});
			});
		}
	})
	.add( '/guide', {
		enter ( route ) {
			store.set({ route: 'guide' });

			document.title = 'Learn Svelte';

			if ( view ) {
				view.destroy();
			} else {
				main.innerHTML = '';
			}

			return ajax.getJSON( `/guide.[hash].json` ).then( sections => {
				view = new Guide({
					target: main,
					data: {
						sections
					},
					store
				});

				view.on( 'scroll', id => {
					store.set({ activeGuideSection: id });
				});

				if ( route.scrollY === 0 && route.hash ) {
					// scroll to section
					const h = main.querySelector( `#${route.hash}` );
					if ( h ) window.scrollTo( 0, window.scrollY + h.getBoundingClientRect().top );
				} else {
					window.scrollTo( route.scrollX, route.scrollY );
				}

				// preload blog index
				ajax.getJSON( `/blog.[hash].json` );
			});
		},

		update ( route ) {
			const h = main.querySelector( `#${route.hash}` );
			if ( h ) window.scrollTo( 0, window.scrollY + h.getBoundingClientRect().top );
		}
	})
	.add( '/repl', {
		enter () {
			store.set({ route: 'repl' });

			document.title = 'Svelte REPL';

			if ( view ) {
				view.destroy();
			} else {
				main.innerHTML = '';
			}

			view = new Repl({
				target: main,
				store
			});
		}
	});

roadtrip.start();

if (navigator.serviceWorker && navigator.serviceWorker.controller) {
	navigator.serviceWorker.controller.onstatechange = function(e) {
		if (e.target.state === 'redundant') {
			Toast.show();
		}
	};
}