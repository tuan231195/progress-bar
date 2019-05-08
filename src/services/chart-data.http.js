export function fetchData(endpoint) {
	return fetch(endpoint).then(res => res.json());
}
