export function waitForTimeout() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		});
	});
}
