module.exports = {
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaVersion": 10,
		"sourceType": "module",
	},
	"env": {
		"es6": true,
		"browser": true,
		"jest": true,
		"node": true,
	},
	extends: ['eslint:recommended', 'prettier'], // extending recommended config and config derived from
												 // eslint-config-prettier
	plugins: ['prettier'], // activating esling-plugin-prettier (--fix stuff),
	rules: {
		'prettier/prettier': [ // customizing prettier rules (unfortunately not many of them are customizable)
			'error',
			{
				singleQuote: true,
				trailingComma: 'es5',
				useTabs: true,
			},
		],
		eqeqeq: ['error', 'always'],
		"no-console": ['error'],
	},
};
