import { text, element } from './html';

describe('Testing html utility methods', () => {
	describe('Testing text()', () => {
		it('Should create text node correctly', () => {
			const TEXT = 'test text';
			const textNode = text(TEXT);
			expect(textNode.nodeType).toBe(3);
			expect(textNode.textContent).toBe(TEXT);
		});

		it('Should create element node correctly', () => {
			const TEXT = 'test text';
			const data = {
				a: 'a',
				b: 'b',
			};
			const attributes = {
				id: 'test',
			};
			const elementNode = element('div', {
				classList: 'a b c',
				text: TEXT,
				data,
				attributes,
			});

			expect(elementNode.nodeType).toBe(1);
			expect(elementNode.tagName).toBe('DIV');
			expect(elementNode.className).toBe('a b c');
			expect(elementNode.getAttribute('id')).toBe(attributes.id);
			expect(elementNode.getAttribute('data-a')).toBe(data.a);
			expect(elementNode.getAttribute('data-b')).toBe(data.b);
		});
	});
});
