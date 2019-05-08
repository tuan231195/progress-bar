exports.target = function target(target) {
	return (context, util) =>
		util.merge({
			target,
		});
};

exports.externals = function externals(externals) {
	return (context, util) =>
		util.merge({
			externals,
		});
};
