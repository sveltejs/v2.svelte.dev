const fs = require( 'fs' );
const path = require( 'path' );
const express = require( 'express' );
const compression = require( 'compression' );
const servePage = require( './servePage.js' );

const dev = !!process.env.DEV;

const app = express();

const root = path.resolve( __dirname, '..' );

app.use( compression({ threshold: 0 }) );
app.use( express.static( 'public' ) );

function loadComponent ( file ) {
	const resolved = require.resolve( `./${file}.js` );
	if ( dev ) delete require.cache[ resolved ];
	return require( resolved );
}

app.get( '/', ( req, res ) => {
	const Nav = loadComponent( 'components/Nav' );
	const Index = loadComponent( 'routes/Index' );

	servePage( res, {
		title: 'Svelte • The magical disappearing UI framework',
		nav: Nav.render({ route: 'index' }),
		route: Index.render()
	}).catch( err => {
		console.log( err.stack );
	});
});

app.get( '/blog', ( req, res ) => {
	const Nav = loadComponent( 'components/Nav' );
	const BlogIndex = loadComponent( 'routes/BlogIndex' );

	const posts = require( `${root}/public/posts.json` );

	servePage( res, {
		title: 'Svelte • The magical disappearing UI framework',
		nav: Nav.render({ route: 'blog' }),
		route: BlogIndex.render({ posts })
	}).catch( err => {
		console.log( err.stack );
	});
});

app.get( '/blog/:slug', ( req, res ) => {
	const Nav = loadComponent( 'components/Nav' );
	const BlogPost = loadComponent( 'routes/BlogPost' );

	const post = require( `${root}/public/posts/${req.params.slug}.json` );

	servePage( res, {
		title: `${post.metadata.title} • Svelte`,
		nav: Nav.render({ route: 'blog' }),
		route: BlogPost.render({ post })
	}).catch( err => {
		console.log( err.stack );
	});
});

app.get( '/guide', ( req, res ) => {
	const Nav = loadComponent( 'components/Nav' );
	const Guide = loadComponent( 'routes/Guide' );

	const sections = require( `${root}/public/guide.json` );

	servePage( res, {
		title: 'Learn Svelte',
		nav: Nav.render({ route: 'guide' }),
		route: Guide.render({ sections })
	}).catch( err => {
		console.log( err.stack );
	});
});

app.listen( 3000, () => {
	console.log( 'listening on localhost:3000' );
});