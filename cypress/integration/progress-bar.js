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
