import { EventDispatcher } from './event-dispatcher';

const EVENT_NAME = 'test-event';

describe('Testing event dispatcher', () => {
	let eventDispatcher;

	beforeEach(() => {
		eventDispatcher = new EventDispatcher();
	});

	test('Should fire listener correctly', () => {
		const passValue = 1;
		const mock1 = jest.fn();
		const mock2 = jest.fn();
		eventDispatcher.on(EVENT_NAME, mock1);
		eventDispatcher.on(EVENT_NAME, mock2);

		eventDispatcher.trigger(EVENT_NAME, passValue);
		expect(mock1).toHaveBeenCalledWith(EVENT_NAME, passValue);
		expect(mock2).toHaveBeenCalledWith(EVENT_NAME, passValue);
	});

	test('Should return correct value for hasListener', () => {
		expect(eventDispatcher.hasListener(EVENT_NAME)).toBe(false);

		eventDispatcher.on(EVENT_NAME, () => {});

		expect(eventDispatcher.hasListener(EVENT_NAME)).toBe(true);

		eventDispatcher.off(EVENT_NAME);

		expect(eventDispatcher.hasListener(EVENT_NAME)).toBe(false);
	});

	test('Should unregister listener correctly', () => {
		const passValue = 1;
		const listener = jest.fn();
		eventDispatcher.on(EVENT_NAME, listener);
		expect(eventDispatcher.hasListener(EVENT_NAME)).toBe(true);

		eventDispatcher.off(EVENT_NAME, listener);
		expect(eventDispatcher.hasListener(EVENT_NAME)).toBe(false);

		eventDispatcher.trigger(EVENT_NAME, passValue);
		expect(listener).not.toHaveBeenCalled();
	});

	test('Should remove listener when calling unsubscribe function', () => {
		const passValue = 1;
		const listener = jest.fn();
		const subscription = eventDispatcher.on(EVENT_NAME, listener);
		expect(eventDispatcher.hasListener(EVENT_NAME)).toBe(true);

		subscription();
		expect(eventDispatcher.hasListener(EVENT_NAME)).toBe(false);

		eventDispatcher.trigger(EVENT_NAME, passValue);
		expect(listener).not.toHaveBeenCalled();
	});
});
