import { element } from '../utils/html';

export class ChartButtonsComponent {
	constructor(container) {
		this.container = container;
	}

	render(buttons) {
		this.container.innerHTML = '';
		buttons.forEach(button => {
			const buttonElement = element('button', {
				text: button,
				classList: 'btn marg-right-10',
			});
			this.container.appendChild(buttonElement);
		});
	}
}
