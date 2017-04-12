import * as fs from 'fs';
import * as path from 'path';
import svelte from 'rollup-plugin-svelte';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
import buble from 'rollup-plugin-buble';
const CleanCSS = require( 'clean-css' );

const dev = !!process.env.DEV;
const root = path.resolve( __dirname, '..' );

console.log( `creating ${dev ? 'development' : 'production'} bundle` );

export default {
	entry: 'client/main.js',
	dest: 'public/js/bundle.js',
	format: 'iife',
	plugins: [
		json(),
		nodeResolve(),
		commonjs(),
		svelte({
			css ( css ) {
				css = fs.readFileSync( `${root}/server/templates/main.css`, 'utf-8' )
					.replace( '__components__', css );

				const minified = new CleanCSS().minify( css );
				fs.writeFileSync( `${root}/public/main.css`, minified.styles );
			}
		}),
		buble(),
		!dev && uglify()
	],
	sourceMap: true
};