import { Store } from 'svelte/store.js';

const store = new Store({
	guide_contents: []
});

// TODO set this in the sapper middleware
if (process.browser) {
	fetch(`api/guide/contents`).then(r => r.json()).then(guide_contents => {
		store.set({ guide_contents });
	});
}


export default store;