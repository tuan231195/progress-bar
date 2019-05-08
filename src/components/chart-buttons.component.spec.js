import { ChartButtonsComponent } from './chart-buttons.component';
import { waitForTimeout } from '../test/wait';
import { UPDATE_CHART_VALUE } from '../events.constants';

describe('Testing buttons component', () => {
	let container, component, dispatcher;
	beforeEach(() => {
		dispatcher = {
			trigger: jest.fn(),
		};
		container = document.createElement('div');
		component = new ChartButtonsComponent(container, {
			dispatcher,
		});
		component.init();
	});
	it('Should render buttons correctly', () => {
		component.render([1, 2, 3]);
		const buttonElements = container.querySelectorAll('button');
		expect(buttonElements.length).toBe(3);
		expect(
			Array.from(buttonElements).map(buttonElement => buttonElement.textContent)
		).toStrictEqual(['1', '2', '3']);
	});

	it('Should fire event when button clicked', async () => {
		component.render([1, 2, 3]);
		const buttonElement = container.querySelectorAll('button')[2];
		buttonElement.click();
		await waitForTimeout();
		expect(dispatcher.trigger).toHaveBeenCalledWith(UPDATE_CHART_VALUE, 3);
	});
});
