import path from 'path';
import express from 'express';
import compression from 'compression';
import * as gist from './gist.js';

import home from '../universal/pages/home.html';
import blogIndex from '../universal/pages/blog.html';
import blogPost from '../universal/pages/blog/id.html';
import guidePage from '../universal/pages/guidePage.html';
import replPage from '../universal/pages/replPage.html';
import store from '../universal/store.js';

const blogPosts = require('./build/hashed/blog.[hash].json');
const guideSections = require('./build/hashed/guide.[hash].json');

const dev = !!process.env.DEV;

const app = express();

const root = path.resolve( '.' );

app.use(compression({ threshold: 0 }));

// TODO this is unfortunate... would be nice to have a neater solution
const hashed = __dev__ ? {
	bundle: 'bundle.js',
	css: 'main.css'
} : {
	bundle: require( './manifests/bundle.json' )[ 'bundle.js' ].replace( 'build/hashed/', '' ),
	css: require( './manifests/css.json' )[ 'main.css' ].replace( 'build/hashed/', '' )
};

const preload = [
	`</${hashed.bundle}>; rel=preload; as=script`,
	`</${hashed.css}>; rel=preload; as=style`,

	// only preload the essential fonts for initial render
	`</fonts/rajdhani-light.woff2>; rel=preload; as=font; type='font/woff2'`,
	`</fonts/roboto-regular.woff2>; rel=preload; as=font; type='font/woff2'`
].join( ', ' );

function serve (req, res, page, data) {
	res.writeHead( 200, {
		'Content-Type': 'text/html',
		Link: preload
	});

	res.write(page.render(data, { store }).html);
	res.end();
}

app.get( '/', ( req, res ) => {
	store.set({ route: 'index' });
	serve(req, res, home, { hashed });
});

app.use( '/sw.:hash.js', ( req, res ) => {
	res.redirect( '/sw.js' );
});

app.use( ( req, res, next ) => {
	if ( req.url.slice( -1 ) === '/' && req.url.length > 1 ) {
		res.redirect( 301, req.url.slice( 0, -1 ) );
	} else {
		next();
	}
});

app.get( '/blog', ( req, res ) => {
	store.set({ route: 'blog' });
	serve(req, res, blogIndex, { hashed, posts: blogPosts });
});

app.use( express.static( 'build/hashed', { maxAge: dev ? '1s' : '1y' } ));
app.use( express.static( 'build/unhashed' ) );

app.use( '/examples', express.static( 'public/examples', {
	maxAge: 60 * 1000
}));

app.use( express.static( 'public', {
	maxAge: 1000 * 60 * 60 * 24 // one day
}));

app.get( '/blog/:slug', ( req, res ) => {
	store.set({ route: 'blog' });
	try {
		const post = require( `${root}/public/blog/${req.params.slug}.json` );
		serve(req, res, blogPost, { hashed, post });
	} catch (err) {
		res.status(404);
		res.end('not found');
	}
});

app.get( '/guide', ( req, res ) => {
	store.set({ route: 'guide' });
	serve(req, res, guidePage, { hashed, sections: guideSections });
});

app.get( '/repl', ( req, res ) => {
	store.set({ route: 'repl' });
	serve(req, res, replPage, { hashed });
});

app.get( '/gists/:id', async (req, res) => {
	try {
		const body = await gist.get(req.params.id);
		res.status(200);
		res.end(body);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode);
		res.end(err.message);
	}
});

app.post( '/gists', (req, res) => {
	// TODO it must be possible to stream the request body to api.github.com,
	// and stream the response back again. but it has eluded me
	function error(err) {
		res.status(500);
		res.end(err.message);
	}

	let body = [];
	req.on('data', chunk => {
		body.push(chunk);
	}).on('end', async () => {
		body = Buffer.concat(body).toString();

		try {
			const json = await gist.post(body);
			res.status(200);
			res.end(json);
		} catch (err) {
			error(err);
		}
	}).on('error', error);
});

app.listen( 3000, () => {
	console.log( 'listening on localhost:3000' ); // eslint-disable-line no-console
});
