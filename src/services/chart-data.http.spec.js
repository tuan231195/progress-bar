import { fetchData } from './chart-data.http';

describe('Testing fetch data', () => {
	const mockResponse = { bars: [1, 2, 3] };
	beforeEach(() => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => mockResponse,
			})
		);
	});
	test('Should fetch data from the right endpoint', async () => {
		const endpoint = 'http://localhost:5000';
		const data = await fetchData(endpoint);
		expect(window.fetch).toHaveBeenCalledWith(endpoint);
		expect(data).toStrictEqual(mockResponse);
	});
});
