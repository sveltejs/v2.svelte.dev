import replace from 'rollup-plugin-replace';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

const dev = !!process.env.DEV;

console.log( `creating ${dev ? 'development' : 'production'} service worker` );

export default {
	entry: 'client/service-worker.js',
	dest: 'public/service-worker.js',
	format: 'iife',
	plugins: [
		replace({
			__CACHEVERSION__: dev ? 'dev' : Date.now()
		}),
		buble(),
		!dev && uglify()
	],
	sourceMap: true
};