import * as fs from 'fs';
import * as path from 'path';
import hasha from 'hasha';
import hash from 'rollup-plugin-hash';
import svelte from 'rollup-plugin-svelte';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
import buble from 'rollup-plugin-buble';
const CleanCSS = require( 'clean-css' );

const dev = !!process.env.ROLLUP_WATCH;
const root = path.resolve( '.' );

console.log( `creating ${dev ? 'development' : 'production'} client bundle` );

export default {
	entry: 'client/src/main.js',
	dest: 'client/dist/bundle.js',
	format: 'iife',
	plugins: [
		json(),
		nodeResolve(),
		commonjs(),
		svelte({
			css ( css ) {
				let styles = fs.readFileSync( `${root}/templates/main.css`, 'utf-8' )
					.replace( '__components__', css );

				if ( dev ) {
					fs.writeFileSync( `client/dist/main.css`, styles );
				} else {
					styles = new CleanCSS().minify( styles ).styles;

					const hash = hasha( styles, { algorithm: 'md5' });
					fs.writeFileSync( `client/dist/main.${hash}.css`, styles );
					fs.writeFileSync( `server/manifests/css.json`, JSON.stringify({ 'main.css': `client/dist/main.${hash}.css` }) );
				}
			}
		}),
		buble(),
		!dev && hash({
			dest: 'client/dist/bundle.[hash].js',
			manifest: 'server/manifests/bundle.json',
			manifestKey: 'bundle.js'
		}),
		!dev && uglify()
	],
	sourceMap: true
};