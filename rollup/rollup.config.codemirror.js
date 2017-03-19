import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const dev = !!process.env.DEV;

export default {
	entry: 'client/codemirror.js',
	dest: 'public/codemirror.js',
	format: 'amd',
	plugins: [
		nodeResolve(),
		commonjs(),
		// !dev && uglify()
	],
	sourceMap: true
};