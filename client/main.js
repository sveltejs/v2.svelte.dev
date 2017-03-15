import roadtrip from 'roadtrip';
import Index from '../shared/routes/Index.html';
import BlogIndex from '../shared/routes/BlogIndex.html';
import BlogPost from '../shared/routes/BlogPost.html';
import Guide from '../shared/routes/Guide.html';
import Repl from '../shared/routes/Repl/index.html';
import Nav from '../shared/components/Nav.html';
import get from './get.js';

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

			return get( `/blog.json` ).then( JSON.parse ).then( posts => {
				view = new BlogIndex({
					target: main,
					data: {
						posts
					}
				});

				window.scrollTo( route.scrollX, route.scrollY );
			});
		}
	})
	.add( '/blog/:slug', {
		enter ( route ) {
			nav.set({ route: 'blog' });

			if ( route.isInitial ) return; // page is static

			return get( `/blog/${route.params.slug}.json` ).then( JSON.parse ).then( post => {
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

			return get( `/guide.json` ).then( JSON.parse ).then( sections => {
				view = new Guide({
					target: main,
					data: {
						sections
					}
				});

				if ( route.scrollY === 0 ) {
					// scroll to section
					if ( window.location.hash.length > 1 ) {
						const h = main.querySelector( window.location.hash );
						if ( h ) window.scrollTo( 0, h.getBoundingClientRect().top );
					}
				} else {
					window.scrollTo( route.scrollX, route.scrollY );
				}
			});
		}
	})
	.add( '/repl', {
		enter ( route ) {
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