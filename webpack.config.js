const path = require('path');
const fs = require("fs");

module.exports = (env, argv) => ({
	entry: './src/main/js/app.js',
	output: {
		path: argv.mode === 'production' ? path.join(__dirname , './src/main/resources/static') : 
					/* mode development */ path.join(__dirname , 'target/classes/static'),
		filename: 'dist/dist.app.js',
	},
	devtool: argv.mode === 'production' ? false : 'source-map',
	cache: false,
	module: {
		rules: [
			{
				test: /\.?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			}
		]
	}
});