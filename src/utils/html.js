export function element(type, { classList, text: txt, data = {}, attributes = {} } = {}) {
	const node = document.createElement(type);
	if (txt) {
		node.textContent = txt;
	}
	if (classList) {
		node.classList = classList;
	}

	Object.entries(data).forEach(([dataKey, dataValue]) => {
		node.setAttribute(`data-${dataKey}`, dataValue);
	});

	Object.entries(attributes).forEach(([attributeKey, attributeValue]) => {
		node.setAttribute(attributeKey, attributeValue);
	});

	return node;
}

export function text(txt) {
	return document.createTextNode(txt);
}
