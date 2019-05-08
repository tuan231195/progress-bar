import { waitForTimeout } from '../test/wait';
import { ChartContainerComponent } from './chart-container.component';
import { EventDispatcher } from '../services/event-dispatcher';
import { CHANGE_CHART, UPDATE_CHART_VALUE } from '../events.constants';

describe('Testing selector component', () => {
	let container, component, dispatcher;

	beforeEach(() => {
		dispatcher = new EventDispatcher();
		container = document.createElement('div');
		component = new ChartContainerComponent(container, {
			dispatcher,
		});
		component.init();
	});
	it('Should render chart text correctly', async () => {
		component.render({ bars: [30, 40, 50], limit: 200 });
		const textElements = container.querySelectorAll('[data-element-name=progress-bar-text]');
		await waitForTimeout();
		expect(textElements.length).toBe(3);
		expect(Array.from(textElements).map(textElement => textElement.textContent)).toStrictEqual([
			'15%',
			'20%',
			'25%',
		]);
	});

	it('Should render chart bar correctly', async () => {
		component.render({ bars: [30, 40, 50], limit: 200 });
		const fillElements = container.querySelectorAll('[data-element-name=progress-bar-fill]');
		await waitForTimeout();
		expect(fillElements.length).toBe(3);
		expect(Array.from(fillElements).map(textElement => textElement.style.width)).toStrictEqual([
			'15%',
			'20%',
			'25%',
		]);
	});

	it('Should update the right charts', async () => {
		component.render({ bars: [30, 40, 50], limit: 200 });

		dispatcher.trigger(UPDATE_CHART_VALUE, 50);
		await waitForTimeout();

		dispatcher.trigger(CHANGE_CHART, 0);
		dispatcher.trigger(UPDATE_CHART_VALUE, -50);

		dispatcher.trigger(CHANGE_CHART, 1);
		dispatcher.trigger(UPDATE_CHART_VALUE, 50);

		dispatcher.trigger(CHANGE_CHART, 2);
		dispatcher.trigger(UPDATE_CHART_VALUE, 160);

		await waitForTimeout();

		const fillElements = container.querySelectorAll('[data-element-name=progress-bar-fill]');

		expect(Array.from(fillElements).map(textElement => textElement.style.width)).toStrictEqual([
			'0%',
			'45%',
			'100%',
		]);

		const textElements = container.querySelectorAll('[data-element-name=progress-bar-text]');

		expect(textElements.length).toBe(3);
		expect(Array.from(textElements).map(textElement => textElement.textContent)).toStrictEqual([
			'0%',
			'45%',
			'105%',
		]);
	});
});
