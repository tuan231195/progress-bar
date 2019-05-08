import { element } from '../utils/html';

export class ChartContainerComponent {
	constructor(container) {
		this.container = container;
	}
	render({ bars, limit }) {
		this.container.innerHTML = '';
		bars.forEach(bar => {
			const chart = element('div', {
				classList: 'progress-bar marg-bottom-20',
			});

			const chartFill = element('div', {
				classList: 'progress-bar__fill',
			});

			chartFill.style.width = `${bar}%`;

			const chartText = element('span', {
				text: bar,
				classList: 'progress-bar__text',
			});

			chart.appendChild(chartText);

			chart.appendChild(chartFill);

			this.container.appendChild(chart);
		});
	}
}
