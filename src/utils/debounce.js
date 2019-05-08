export class Debounce {
	constructor(seconds) {
		this.seconds = seconds;
		this.timeout = null;
	}

	run(func) {
		this.cancel();
		this.timeout = setTimeout(func, this.seconds);
	}

	cancel() {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
	}

	get isRunning() {
		return !!this.timeout;
	}
}
