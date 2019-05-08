import { element } from '../utils/html';
import { CHANGE_CHART, UPDATE_CHART_VALUE } from '../events.constants';
import { Chart } from '../model/chart';
import { isInRange } from '../utils/array';
import { Debounce } from '../utils/debounce';

const DEBOUNCE_MILLIS = 100;

export class ChartContainerComponent {
	constructor(container, { dispatcher }) {
		this.container = container;
		this.dispatcher = dispatcher;
		this.charts = [];
		this.animatingDebounce = new Debounce(DEBOUNCE_MILLIS);
	}

	init() {
		this.setupGlobalEvents();
	}

	render({ bars, limit }) {
		this.container.innerHTML = '';
		if (!limit) {
			limit = 100;
		}
		this.charts = bars.map(bar => new Chart({ value: bar, limit }));

		this.charts.forEach(() => {
			const chartElement = element('div', {
				classList: 'progress-bar marg-bottom-20',
				attributes: {
					'data-element-name': 'progress-bar',
				},
			});

			const chartFill = element('div', {
				classList: 'progress-bar__fill',
				attributes: {
					'data-element-name': 'progress-bar-fill',
				},
			});

			const chartText = element('span', {
				classList: 'progress-bar__text',
				attributes: {
					'data-element-name': 'progress-bar-text',
				},
			});

			chartElement.appendChild(chartText);

			chartElement.appendChild(chartFill);

			this.container.appendChild(chartElement);
		});

		const chartElements = this.chartElements();

		chartElements.forEach((chartElement, index) => {
			const fillElement = chartElements[index].querySelector(
				'[data-element-name=progress-bar-fill]'
			);
			fillElement.style.width = 0;
			setTimeout(() => {
				this.updateProgress(index);
			});
		});
	}

	setupGlobalEvents() {
		this.dispatcher.on(CHANGE_CHART, (_, index) => {
			if (!isInRange(this.charts, index)) {
				return;
			}

			const chartElements = this.chartElements();

			this.activeChart = this.charts[index];
			this.activeChartElement = chartElements[index];

			chartElements.forEach(chartElement =>
				chartElement.classList.remove('progress-bar--active')
			);
			chartElements[index].classList.add('progress-bar--active');
		});

		this.dispatcher.on(UPDATE_CHART_VALUE, (_, amount) => {
			if (!this.activeChart) {
				return;
			}

			const previousValue = this.activeChart.value;
			this.activeChart.increase(amount);
			this.updateProgress(this.charts.indexOf(this.activeChart), true);
			if (previousValue === 0 && this.activeChart.value === 0) {
				this.activeChartElement.classList.add('bounce');
				this.activeChartElement.addEventListener('webkitAnimationEnd', () => {
					this.activeChartElement.classList.remove('bounce');
				});
			}
		});
	}

	updateProgress(index, debounce) {
		const chartElements = this.chartElements();

		const chart = this.charts[index];

		const fillElement = chartElements[index].querySelector(
			'[data-element-name=progress-bar-fill]'
		);
		const textElement = chartElements[index].querySelector(
			'[data-element-name=progress-bar-text]'
		);
		if (chart.percentage > 100) {
			fillElement.classList.add('progress-bar__fill--over');
		} else {
			fillElement.classList.remove('progress-bar__fill--over');
		}
		textElement.textContent = `${Math.round(chart.percentage)}%`;
		const fillWidth = `${chart.percentage > 100 ? 100 : chart.percentage}%`;
		if (debounce) {
			if (this.animatingDebounce.isRunning) {
				this.animatingDebounce.cancel();
				fillElement.classList.add('no-transition');
				fillElement.style.width = fillElement.getAttribute('data-last-width');
			}
			this.animatingDebounce.run(() => {
				fillElement.classList.remove('no-transition');
				fillElement.style.width = fillWidth;
				fillElement.setAttribute('data-last-width', null);
			});
			fillElement.setAttribute('data-last-width', fillWidth);
		} else {
			fillElement.style.width = fillWidth;
		}
	}

	chartElements() {
		return this.container.querySelectorAll('[data-element-name=progress-bar]');
	}
}
