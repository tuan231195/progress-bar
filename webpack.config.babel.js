const webpack = require('webpack');
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
const isDev = process.env.NODE_ENV === 'dev';
const npmPackage = require('./package.json');
const path = require('path');
const extractCss = require('./webpack/plugins/extract-css');
const html = require('./webpack/plugins/html');
const eslint = require('@webpack-blocks/eslint');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { match, env } = require('@webpack-blocks/core');

const { css, file } = require('@webpack-blocks/assets');

const postcss = require('@webpack-blocks/postcss');

const babel = require('@webpack-blocks/babel');

const {
	createConfig,
	setEnv,
	entryPoint,
	setOutput,
	sourceMaps,
	optimization,
	setMode,
	addPlugins,
	resolve,
} = require('@webpack-blocks/webpack');

const devServer = require('@webpack-blocks/dev-server');

const sass = require('@webpack-blocks/sass');

const webpackConfig = createConfig([
	setMode(isDev ? 'development' : 'production'),
	entryPoint(path.resolve(__dirname, 'src/index.js')),
	setOutput({
		filename: `vdtn359.[name]${isDev ? '' : '.[chunkhash]'}.js`,
		path: path.resolve(__dirname, 'dist'),
	}),
	resolve({
		alias: npmPackage._moduleAliases || {},
	}),
	addPlugins([new CleanWebpackPlugin()]),
	optimization({
		runtimeChunk: {
			name: 'manifest',
		},
		splitChunks: {
			cacheGroups: {
				node_vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	}),
	babel(),
	eslint({
		emitWarning: true,
	}),
	match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.webp'], [file()]),
	setEnv({
		NODE_ENV: process.env.NODE_ENV,
	}),
	html({
		template: path.resolve(__dirname, 'src/index.html'),
		favicon: path.resolve(__dirname, 'src/favicon.ico'),
	}),
	env('dev', [
		devServer({
			watchContentBase: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			hot: false,
			stats: 'minimal',
			contentBase: path.resolve(__dirname, 'src'),
			overlay: true,
			watchOptions: {
				aggregateTimeout: 600,
				poll: 1000,
			},
			compress: true,
			port: 5000,
		}),
		sourceMaps(),
		match(
			['*.css', '!*node_modules*'],
			[
				css({
					sourceMap: true,
					styleLoader: {
						sourceMap: true,
					},
				}),
			]
		),
		match(
			['*.scss', '!*node_modules*'],
			[
				css({
					sourceMap: true,
					styleLoader: {
						sourceMap: true,
					},
				}),
				sass({
					sourceMap: true,
				}),
			]
		),
	]),
	env('prod', [
		addPlugins([new webpack.LoaderOptionsPlugin({ minimize: true })]),
		sourceMaps('nosources-source-map'),
		match(
			['*.css', '!*node_modules*'],
			[
				extractCss({
					filename: '[name].[contenthash:8].css',
				}),
				css({
					styleLoader: false,
					sourceMap: false,
				}),
				postcss({
					config: {
						path: '.',
					},
					sourceMap: false,
				}),
				addPlugins([
					new CopyWebpackPlugin([
						{
							from: path.resolve(__dirname, 'src', 'assets'),
							to: path.resolve(__dirname, 'dist', 'assets'),
						},
					]),
				]),
			]
		),
		match(
			['*.scss', '!*node_modules*'],
			[
				extractCss({
					filename: '[name].[contenthash:8].css',
				}),
				css({
					styleLoader: false,
					sourceMap: false,
				}),
				postcss({
					config: {
						path: '.',
					},
					sourceMap: false,
				}),
				sass({
					sourceMap: false,
				}),
			]
		),
	]),
]);

module.exports = webpackConfig;
