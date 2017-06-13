import path from 'path';
import express from 'express';
import compression from 'compression';
import servePage from './servePage.js';

import Nav from '../../universal/components/Nav.html';
import Index from '../../universal/routes/Index.html';
import BlogIndex from '../../universal/routes/BlogIndex.html';
import BlogPost from '../../universal/routes/BlogPost.html';
import Guide from '../../universal/routes/Guide.html';
import Repl from '../../universal/routes/Repl/index.html';

const dev = !!process.env.DEV;

const app = express();

const root = path.resolve( '.' );

app.use( compression({ threshold: 0 }) );

app.get( '/', ( req, res ) => {
	servePage( res, {
		title: 'Svelte • The magical disappearing UI framework',
		nav: Nav.render({ route: 'index' }),
		route: Index.render()
	}).catch( err => {
		console.log( err.stack ); // eslint-disable-line no-console
	});
});

app.use( ( req, res, next ) => {
	if ( req.url.slice( -1 ) === '/' && req.url.length > 1 ) {
		res.redirect( 301, req.url.slice( 0, -1 ) );
	} else {
		next();
	}
});

app.get( '/blog', ( req, res ) => {
	const posts = require( `${root}/public/blog.json` );

	servePage( res, {
		title: 'Svelte • The magical disappearing UI framework',
		nav: Nav.render({ route: 'blog' }),
		route: BlogIndex.render({ posts })
	}).catch( err => {
		console.log( err.stack ); // eslint-disable-line no-console
	});
});

app.use( express.static( 'service-worker/dist' ) );
app.use( express.static( 'client/dist', { maxAge: dev ? '1s' : '1y' }));

app.use( '/examples', express.static( 'public/examples', {
	maxAge: 60 * 1000
}));

app.use( express.static( 'public', {
	maxAge: 1000 * 60 * 60 * 24 // one day
}));

app.get( '/blog/:slug', ( req, res ) => {
	const post = require( `${root}/public/blog/${req.params.slug}.json` );

	servePage( res, {
		title: `${post.metadata.title} • Svelte`,
		nav: Nav.render({ route: 'blog' }),
		route: BlogPost.render({ post })
	}).catch( err => {
		console.log( err.stack ); // eslint-disable-line no-console
	});
});

app.get( '/guide', ( req, res ) => {
	const sections = require( `${root}/public/guide.json` );

	servePage( res, {
		title: 'Learn Svelte',
		nav: Nav.render({ route: 'guide' }),
		route: Guide.render({ sections })
	}).catch( err => {
		console.log( err.stack ); // eslint-disable-line no-console
	});
});

app.get( '/repl', ( req, res ) => {
	servePage( res, {
		title: 'Svelte REPL',
		nav: Nav.render({ route: 'repl' }),
		route: Repl.render() // TODO is there any point? just render an empty box instead?
	}).catch( err => {
		console.log( err.stack ); // eslint-disable-line no-console
	});
});

app.listen( 3000, () => {
	console.log( 'listening on localhost:3000' ); // eslint-disable-line no-console
});