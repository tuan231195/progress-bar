describe('progress-bar', () => {
	beforeEach(() => {
		cy.visit('/');

		cy.get('#endpoint-txt')
			.type('/assets/test-data.json')
			.get('#fetch-btn')
			.click();

		cy.wait(500);
	});

	it('should render buttons correctly', () => {
		assertButtons(['-13', '-18', '10', '38']);
	});

	it('should render selectors correctly', () => {
		assertSelectors(['Progress bar 1', 'Progress bar 2', 'Progress bar 3']);
	});

	it('should render progress bar correctly', () => {
		assertProgressBars(['27%', '20%', '27%']);
	});

	it('should update when clicking buttons', () => {
		clickButtons(1, 1);
		assertProgressBars(['19%', '20%', '27%']);

		clickButtons(1, 3);
		assertProgressBars(['0%', '20%', '27%']);

		clickButtons(3, 3);
		assertProgressBars(['50%', '20%', '27%']);

		clickButtons(3, 5);
		assertProgressBars(['132%', '20%', '27%']);
		getProgressBar(0).should('have.class', 'progress-bar__fill--over');
	});

	it('should update the right chart', () => {
		selectChart(1);
		clickButtons(1, 1);
		assertProgressBars(['27%', '12%', '27%']);

		selectChart(2);
		clickButtons(3, 3);
		assertProgressBars(['27%', '12%', '77%']);
	});

	function getButton(index) {
		return cy
			.get('#chart-buttons')
			.find('button')
			.eq(index);
	}

	function selectChart(index) {
		cy.get('#chart-selector select').select(`Progress bar ${index + 1}`);
	}

	function clickButtons(index, times) {
		const button = getButton(index);
		Array.from({ length: times }).forEach(() => {
			button.click(times);
		});
	}

	function getProgressBar(index) {
		return cy
			.get('#chart-container')
			.find('[data-element-name=progress-bar-fill]')
			.eq(index);
	}

	function assertProgressBars(progressBarTexts) {
		cy.get('#chart-container').then(chartContainer => {
			const progressBars = chartContainer.find('[data-element-name=progress-bar-text]');
			expect(progressBars.length).eql(progressBarTexts.length);
			expect(Array.from(progressBars).map(progressBar => progressBar.textContent)).eql(
				progressBarTexts
			);
		});
	}

	function assertButtons(btnTexts) {
		cy.get('#chart-buttons').then(buttonContainer => {
			const buttons = buttonContainer.find('button');
			expect(buttons.length).eql(btnTexts.length);
			expect(Array.from(buttons).map(buttonNode => buttonNode.textContent)).eql(btnTexts);
		});
	}

	function assertSelectors(optionTexts) {
		cy.get('#chart-selector').then(selectContainer => {
			const options = selectContainer.find('option');
			expect(options.length).eql(optionTexts.length);
			expect(Array.from(options).map(optionNode => optionNode.textContent)).eql(optionTexts);
		});
	}
});
