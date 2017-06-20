import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const dev = !!process.env.ROLLUP_WATCH;

export default {
	entry: 'client/src/codemirror.js',
	dest: 'public/codemirror.js',
	format: 'amd',
	plugins: [
		nodeResolve(),
		commonjs(),
		!dev && uglify()
	],
	sourceMap: true
};