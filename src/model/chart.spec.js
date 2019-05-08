import { Chart } from './chart';

describe('Testing chart model', () => {
	test('Should not go below 0', () => {
		const chart = new Chart({ value: 1, limit: 100 });
		chart.increase(-1);
		expect(chart.value).toBe(0);

		chart.increase(-1);
		expect(chart.value).toBe(0);
	});

	test('Should calculate percentage correctly', () => {
		const chart = new Chart({ value: 30, limit: 150 });
		expect(chart.percentage).toBe(20);

		chart.increase(-15);
		expect(chart.percentage).toBe(10);

		chart.increase(60);
		expect(chart.percentage).toBe(50);
	});
});
