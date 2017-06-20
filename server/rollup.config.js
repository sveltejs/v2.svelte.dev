import json from 'rollup-plugin-json';
import svelte from 'rollup-plugin-svelte';
import replace from 'rollup-plugin-replace';
import pkg from '../package.json';

const dev = !!process.env.ROLLUP_WATCH;

export default {
	entry: 'server/src/index.js',
	dest: 'server/dist/index.js',
	format: 'cjs',
	external: Object.keys(pkg.dependencies).concat([
		'path', 'fs'	
	]),
	plugins: [
		json(),
		svelte({
			generate: 'ssr',
			css: false
		}),
		replace({
			__dev__: !!dev
		})
	]
};