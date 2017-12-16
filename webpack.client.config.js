const config = require('sapper/webpack/config.js');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: config.client.entry(),
	output: config.client.output(),
	resolve: {
		extensions: ['.js', '.html']
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						hydratable: true,
						emitCss: true,
						cascade: false,
						store: true
					}
				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{ loader: 'css-loader', options: { sourceMap: config.dev } }]
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('main.css'),
		!config.dev && new webpack.optimize.ModuleConcatenationPlugin(),
		!config.dev && new UglifyJSPlugin()
	].filter(Boolean),
	devtool: config.dev ? 'inline-source-map' : false
};