const config = require('sapper/webpack/config.js');
const pkg = require('../package.json');

module.exports = {
	entry: config.server.entry(),
	output: config.server.output(),
	target: 'node',
	resolve: {
		extensions: ['.js', '.json', '.html']
	},
	externals: new RegExp(`^${Object.keys(pkg.dependencies).filter(d => d !== 'svelte').join('|')}`),
	module: {
		rules: [
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						css: false,
						generate: 'ssr'
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	mode: process.env.NODE_ENV
};