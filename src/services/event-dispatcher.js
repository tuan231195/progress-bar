export class EventDispatcher {
	constructor() {
		this.eventListeners = {};
	}

	trigger(event, data) {
		if (!this.eventListeners[event]) {
			return;
		}

		this.eventListeners[event].forEach(listener => listener(event, data));
	}

	hasListener(event) {
		return !!(this.eventListeners[event] && this.eventListeners[event].length);
	}

	on(event, listener) {
		if (!this.eventListeners[event]) {
			this.eventListeners[event] = [];
		}
		this.eventListeners[event].push(listener);

		return () => {
			this.off(event, listener);
		};
	}

	off(event, listener) {
		if (!this.eventListeners[event]) {
			return;
		}
		if (!listener) {
			delete this.eventListeners[event];
			return;
		}

		this.eventListeners[event] = this.eventListeners[event].filter(
			eventListener => eventListener !== listener
		);

		if (!this.eventListeners[event].length) {
			delete this.eventListeners[event];
		}
	}
}
