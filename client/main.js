import roadtrip from 'roadtrip';
import Index from '../shared/routes/Index.html';
import BlogIndex from '../shared/routes/BlogIndex.html';
import BlogPost from '../shared/routes/BlogPost.html';
import Guide from '../shared/routes/Guide.html';
import Nav from '../shared/components/Nav.html';
import get from './get.js';

const header = document.querySelector( 'header' );
const main = document.querySelector( 'main' );

const nav = new Nav({
	target: ( header.innerHTML = '', header )
});

let view;

// legacy
roadtrip
	.add( '/blog/', {
		enter () {
			roadtrip.goto( '/blog', { replaceState: true });
		}
	})
	.add( '/blog/:slug/', {
		enter ( route ) {
			roadtrip.goto( `/blog/${route.params.slug}`, { replaceState: true });
		}
	})
	.add( '/guide/', {
		enter () {
			roadtrip.goto( '/guide', { replaceState: true });
		}
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

			if ( route.isInitial ) return; // page is static

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

				window.scrollTo( route.scrollX, route.scrollY );
			});
		}
	});

roadtrip.start();