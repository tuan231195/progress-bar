import { element } from '../utils/html';

export class ChartSelectorComponent {
	constructor(container) {
		this.container = container;
	}

	render(chartLength) {
		this.container.innerHTML = '';

		const select = element('select');

		Array.from({ length: chartLength }).forEach((_, index) => {
			const option = element('option', {
				text: `Progress bar ${index + 1}`,
				data: {
					index,
				},
			});

			select.appendChild(option);
		});

		this.container.appendChild(select);
	}
}
