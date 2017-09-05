import roadtrip from 'roadtrip';
import Index from '../universal/routes/Index.html';
import BlogIndex from '../universal/routes/BlogIndex.html';
import BlogPost from '../universal/routes/BlogPost.html';
import Guide from '../universal/routes/Guide.html';
import Repl from '../universal/routes/Repl/index.html';
import Nav from '../universal/components/Nav.html';
import * as store from './store.js';

const header = document.querySelector( 'header' );
const main = document.querySelector( 'main' );

const nav = new Nav({
	target: ( header.innerHTML = '', header )
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
			nav.set({ route: 'index' });

			if ( route.isInitial ) return; // page is static

			document.title = 'Svelte • The magical disappearing UI framework';

			if ( view ) {
				view.destroy();
			} else {
				main.innerHTML = '';
			}

			view = new Index({
				target: main
			});

			window.scrollTo( route.scrollX, route.scrollY );

			// preload blog and guide
			store.getJSON( `/blog.[hash].json` ).then( () => {
				return store.getJSON( `/guide.[hash].json` );
			});
		}
	})
	.add( '/blog', {
		enter ( route ) {
			nav.set({ route: 'blog' });

			if ( route.isInitial ) return; // page is static

			document.title = 'Svelte • The magical disappearing UI framework';

			if ( view ) {
				view.destroy();
			} else {
				main.innerHTML = '';
			}

			return store.getJSON( `/blog.[hash].json` ).then( posts => {
				view = new BlogIndex({
					target: main,
					data: {
						posts
					}
				});

				window.scrollTo( route.scrollX, route.scrollY );

				// start preloading blog posts
				posts.reduce( ( promise, post ) => {
					return promise.then( () => store.getJSON( `/blog/${post.slug}.json` ) );
				}, Promise.resolve() )

					// then preload the guide
					.then( () => store.getJSON( `/guide.[hash].json` ) );
			});
		}
	})
	.add( '/blog/:slug', {
		enter ( route ) {
			nav.set({ route: 'blog' });

			if ( route.isInitial ) return; // page is static

			return store.getJSON( `/blog/${route.params.slug}.json` ).then( post => {
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
					}
				});

				// TODO this doesn't work because it's the <main> that scrolls, not the window
				window.scrollTo( route.scrollX, route.scrollY );

				// preload blog index and guide
				store.getJSON( `/blog.[hash].json` ).then( () => {
					return store.getJSON( `/guide.[hash].json` );
				});
			});
		}
	})
	.add( '/guide', {
		enter ( route ) {
			nav.set({ route: 'guide' });

			document.title = 'Learn Svelte';

			if ( view ) {
				view.destroy();
			} else {
				main.innerHTML = '';
			}

			return store.getJSON( `/guide.[hash].json` ).then( sections => {
				view = new Guide({
					target: main,
					data: {
						sections
					}
				});

				view.on( 'scroll', id => {
					nav.set({ active: id });
				});

				if ( route.scrollY === 0 && route.hash ) {
					// scroll to section
					const h = main.querySelector( `#${route.hash}` );
					if ( h ) window.scrollTo( 0, window.scrollY + h.getBoundingClientRect().top );
				} else {
					window.scrollTo( route.scrollX, route.scrollY );
				}

				// preload blog index
				store.getJSON( `/blog.[hash].json` );
			});
		},

		update ( route ) {
			const h = main.querySelector( `#${route.hash}` );
			if ( h ) window.scrollTo( 0, window.scrollY + h.getBoundingClientRect().top );
		}
	})
	.add( '/repl', {
		enter () {
			nav.set({ route: 'repl' });

			document.title = 'Svelte REPL';

			if ( view ) {
				view.destroy();
			} else {
				main.innerHTML = '';
			}

			view = new Repl({
				target: main
			});
		}
	});

roadtrip.start();