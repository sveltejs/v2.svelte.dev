import replace from 'rollup-plugin-replace';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import glob from 'glob';

const dev = !!process.env.DEV;

console.log( `creating ${dev ? 'development' : 'production'} service worker` );

const manifest = [].concat(
	// routes
	'/',
	'/guide',
	'/repl',
	'/blog',

	// js
	'/bundle.js',
	'/curl.js',
	'/codemirror.js',
	'/magic-string.umd.js',

	// css
	'/main.css',
	'/codemirror.css',

	// fonts
	glob.sync( 'fonts/**/*.woff?(2)', { cwd: 'public' }).map( x => `/${x}` ),

	// content
	'/blog.json', // don't need to include individual posts
	'/guide.json',
	glob.sync( 'examples/**/*.json', { cwd: 'public' }).map( x => `/${x}` )
);

export default {
	entry: 'client/service-worker.js',
	dest: 'public/sw.js',
	format: 'iife',
	plugins: [
		replace({
			__CACHEVERSION__: Date.now(),
			__MANIFEST__: JSON.stringify( manifest )
		}),
		buble(),
		!dev && uglify()
	],
	sourceMap: true
};