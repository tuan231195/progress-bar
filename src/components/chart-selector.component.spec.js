import { CHANGE_CHART } from '../events.constants';
import { waitForTimeout } from '../test/wait';
import { ChartSelectorComponent } from './chart-selector.component';

describe('Testing selector component', () => {
	let container, component, dispatcher;
	beforeEach(() => {
		dispatcher = {
			trigger: jest.fn(),
		};
		container = document.createElement('div');
		component = new ChartSelectorComponent(container, {
			dispatcher,
		});
		component.init();
	});
	it('Should render select option correctly', () => {
		component.render(3);
		const optionsElement = container.querySelectorAll('option');
		expect(optionsElement.length).toBe(3);
		expect(
			Array.from(optionsElement).map(buttonElement => buttonElement.textContent)
		).toStrictEqual(['Progress bar 1', 'Progress bar 2', 'Progress bar 3']);
	});

	it('Should fire event when render or when an option is selected', async () => {
		component.render(3);
		expect(dispatcher.trigger).toHaveBeenCalledWith(CHANGE_CHART, 0);

		dispatcher.trigger.mockClear();
		const select = container.querySelector('select');
		select.value = 2;
		select.dispatchEvent(new Event('change'));
		await waitForTimeout();
		expect(dispatcher.trigger).toHaveBeenCalledWith(CHANGE_CHART, 2);
	});
});
