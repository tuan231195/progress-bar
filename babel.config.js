module.exports = function(api) {
	const isTest = api.env() === 'test';
	return {
		presets: [
			[
				'@babel/preset-env',
				{
					debug: false,
					modules: isTest ? 'commonjs' : false,
					useBuiltIns: 'usage',
					corejs: 3,
				},
			],
		],
		plugins: ['@babel/plugin-proposal-object-rest-spread'],
	};
};
