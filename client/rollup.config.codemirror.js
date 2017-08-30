import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const dev = !!process.env.ROLLUP_WATCH;

export default {
	input: 'client/src/codemirror.js',
	output: {
		file: 'public/codemirror.js',
		format: 'amd',
	},
	plugins: [
		nodeResolve(),
		commonjs(),
		!dev && uglify()
	],
	sourcemap: true
};
