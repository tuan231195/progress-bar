export function element(type, { classList, text: txt, data = {} } = {}) {
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

	return node;
}

export function text(txt) {
	return document.createTextNode(txt);
}
