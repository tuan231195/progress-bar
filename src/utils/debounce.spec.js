import { Debounce } from './debounce';

describe('Testing debounce', () => {
	let debounce;
	const TEST_SECONDS = 200;

	beforeEach(() => {
		jest.useFakeTimers();
		debounce = new Debounce(TEST_SECONDS);
	});

	test('should run function after the specified time', () => {
		const mock = jest.fn();
		debounce.run(mock);
		jest.advanceTimersByTime(TEST_SECONDS);
		expect(mock).toHaveBeenCalled();
	});

	test('should cancel previous timer when calling multiple times', () => {
		jest.spyOn(debounce, 'cancel');
		const mock = jest.fn();
		debounce.run(mock);
		debounce.run(mock);
		expect(debounce.cancel).toHaveBeenCalled();
		jest.advanceTimersByTime(TEST_SECONDS);
		expect(mock).toHaveBeenCalledTimes(1);
	});

	test('should cancel timer correctly', () => {
		const mock = jest.fn();
		debounce.run(mock);
		debounce.cancel();
		jest.advanceTimersByTime(TEST_SECONDS);
		expect(mock).not.toHaveBeenCalled();
	});

	test('should report isRunning correctly', () => {
		const mock = jest.fn();
		debounce.run(mock);
		expect(debounce.isRunning).toBe(true);

		debounce.cancel();
		expect(debounce.isRunning).toBe(false);
	});
});
