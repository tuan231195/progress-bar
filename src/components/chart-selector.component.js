import { element } from '../utils/html';
import { CHANGE_CHART } from '../events.constants';

export class ChartSelectorComponent {
	constructor(container, { dispatcher }) {
		this.container = container;
		this.dispatcher = dispatcher;
	}

	init() {}

	render(chartLength) {
		this.container.innerHTML = '';

		this.select = element('select');

		Array.from({ length: chartLength }).forEach((_, index) => {
			const option = element('option', {
				text: `Progress bar ${index + 1}`,
				attributes: {
					value: index,
				},
			});

			this.select.appendChild(option);
		});

		this.container.appendChild(this.select);
		this.setupComponentEvents();
		this.dispatcher.trigger(CHANGE_CHART, 0);
	}

	setupComponentEvents() {
		this.select.addEventListener('change', event => {
			const chartIndex = event.target.value;
			this.dispatcher.trigger(CHANGE_CHART, chartIndex);
		});
	}
}
