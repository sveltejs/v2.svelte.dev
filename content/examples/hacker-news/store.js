const cache = new Map();
const items = new Map();

async function fetchJSON(url) {
	if (!cache.has(url)) {
		const req = await fetch(url);
		const data = await req.json();
		cache.set(url, data);
	}

	return cache.get(url);
}

export async function getPage(i) {
	const page = await fetchJSON(`https://hn.svelte.technology/top/${i}.json`);

	page.items.forEach(item => {
		items.set(item.id, item);
	});

	return page;
}

export async function getItem(id) {
	if (!items.has(id)) {
		items.set(id, await fetchJSON(`https://hn.svelte.technology/item/${id}.json`));
	}

	return items.get(id);
}

export function getComments(id) {
	return fetchJSON(`https://hn.svelte.technology/comments/${id}.json`);
}