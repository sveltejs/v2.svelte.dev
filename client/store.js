import { Store } from 'svelte/store.js';

class ClientStore extends Store {
	logout() {
		return fetch(`auth/logout`, {
			method: 'POST',
			credentials: 'include'
		}).then(() => {
			this.set({ user: null });
		});
	}
}

export default new ClientStore();