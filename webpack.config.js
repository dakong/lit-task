const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.join(__dirname, 'build');
const INDEX_FILE_PATH = 'src/index.html';
const WC_BUNDLES_PATH = 'node_modules/@webcomponents/webcomponentsjs/bundles';
const WC_LOADER_PATH = 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'

module.exports = {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: BUILD_DIR,
		compress: true,
		port: 3001
	},
	entry: './src/index.js',
	mode: "development",
	output: {
		filename: 'index.js',
		path: BUILD_DIR,
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [
							'@babel/plugin-proposal-class-properties',
							['@babel/proposal-decorators', {decoratorsBeforeExport: true}]
						]
					}
				}
			},
		]
	},
	plugins: [
		new CopyPlugin([
			{from: path.resolve(__dirname, INDEX_FILE_PATH), to: BUILD_DIR},
			{from: path.resolve(__dirname, WC_BUNDLES_PATH), to: path.resolve(BUILD_DIR, 'bundles')},
			{from: path.resolve(__dirname, WC_LOADER_PATH), to: BUILD_DIR},
		]),
	]
};