import { element } from '../utils/html';
import { UPDATE_CHART_VALUE } from '../events.constants';

export class ChartButtonsComponent {
	constructor(container, { dispatcher }) {
		this.container = container;
		this.dispatcher = dispatcher;
	}

	init() {}

	render(buttons) {
		this.container.innerHTML = '';
		buttons.forEach(amount => {
			const buttonElement = element('button', {
				text: amount,
				classList: 'btn marg-right-10',
				data: {
					amount,
				},
			});
			this.container.appendChild(buttonElement);
		});

		this.setupComponentEvents();
	}

	setupComponentEvents() {
		const buttons = this.container.querySelectorAll('button');
		buttons.forEach(button => {
			button.addEventListener('click', event => {
				const amount = Number(event.target.getAttribute('data-amount'));
				this.dispatcher.trigger(UPDATE_CHART_VALUE, amount);
			});
		});
	}
}
