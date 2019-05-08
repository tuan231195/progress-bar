const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function html({ template, ...options }) {
	return (context, util) =>
		util.merge({
			plugins: [
				new HtmlWebpackPlugin({
					template,
					inject: true,
					...options,
				}),
			],
		});
};
