import { Store } from 'svelte/store.js';

const store = new Store({
	guide_contents: []
});

// TODO setTimeout is an ugly hack — this code runs before
// global.fetch is set
setTimeout(() => {
	fetch(`/api/guide/contents`).then(r => r.json()).then(guide_contents => {
		store.set({ guide_contents });
	});
});


export default store;