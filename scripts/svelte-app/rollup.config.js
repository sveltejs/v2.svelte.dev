import * as fs from 'fs';
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'src/main.js',
	dest: 'public/bundle.js',
	format: 'iife',
	moduleName: 'app',
	plugins: [
		svelte({
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css ( css ) {
				fs.writeFileSync( 'public/app.css', css || '' );
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve(),
		commonjs()
	],
	sourceMap: true
};