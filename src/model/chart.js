export class Chart {
	constructor({ value, limit }) {
		this.value = value;
		this.limit = limit;
	}

	increase(amount) {
		if (this.value + amount < 0) {
			this.value = 0;
			return;
		}
		this.value += amount;
	}

	get percentage() {
		return (this.value / this.limit) * 100;
	}
}
