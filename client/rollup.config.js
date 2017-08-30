import * as fs from 'fs';
import hasha from 'hasha';
import hash from 'rollup-plugin-hash';
import svelte from 'rollup-plugin-svelte';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
import buble from 'rollup-plugin-buble';

const dev = !!process.env.ROLLUP_WATCH;

console.log( `creating ${dev ? 'development' : 'production'} client bundle` );

export default {
	input: 'client/src/main.js',
	output: {
		file: 'client/dist/bundle.js',
		format: 'iife',
	},
	plugins: [
		json(),
		nodeResolve(),
		commonjs(),
		svelte({
			cascade: false,
			css ( css ) {
				if (dev) {
					css.write('client/dist/main.css');
				} else {
					const hash = hasha( css.code, { algorithm: 'md5' });
					const dest = `client/dist/main.${hash}.css`;
					css.write(dest);
					fs.writeFileSync( `server/manifests/css.json`, JSON.stringify({ 'main.css': dest }) );
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
	sourcemap: true
};
