module.exports = {
	coverageDirectory: './coverage',
	clearMocks: true,
	moduleFileExtensions: ['js', 'json', 'jsx'],
	testURL: 'http://localhost',
	collectCoverageFrom: [
		'**/src/**/*.js',
		'!**/src/index.js',
		'!**/src/**/*.spec.js',
		'!**/src/test/**/*.js',
		'!**/node_modules/**',
	],
	coverageThreshold: {
		global: {
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
};
