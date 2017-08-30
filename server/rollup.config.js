import json from 'rollup-plugin-json';
import svelte from 'rollup-plugin-svelte';
import replace from 'rollup-plugin-replace';
import pkg from '../package.json';

const dev = !!process.env.ROLLUP_WATCH;

export default {
	input: 'server/src/index.js',
	output: {
		file: 'server/dist/index.js',
		format: 'cjs',
	},
	external: Object.keys(pkg.dependencies).concat([
		'path', 'fs'
	]),
	plugins: [
		json(),
		svelte({
			generate: 'ssr',
			cascade: false,
			css: false
		}),
		replace({
			__dev__: !!dev
		})
	]
};
