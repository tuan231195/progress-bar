import { isInRange } from './array';

describe('Testing isInRange', () => {
	const testArray = [1, 2, 3];
	test('Should return correct value', () => {
		expect(isInRange(testArray, 2)).toBe(true);
		expect(isInRange(testArray, 1)).toBe(true);
		expect(isInRange(testArray, 0)).toBe(true);
		expect(isInRange(testArray, -1)).toBe(false);
		expect(isInRange(testArray, 3)).toBe(false);
	});
});
