import needle from 'needle';
import LRU from 'lru-cache';

const credentials = tryRequire('../../credentials.json') || {
	id: process.env.client_id,
	secret: process.env.client_secret
};

console.log(`has client_id: ${!!credentials.id}`);
console.log(`has client_secret: ${!!credentials.secret}`);

const cache = new LRU({
	max: 50 * 1024 * 1024, // basically a random number [shrug]
	length: str => str.length
});

export function get(id) {
	return new Promise((fulfil, reject) => {
		if (cache.has(id)) {
			fulfil(cache.get(id));
			return;
		}

		needle.get(`https://api.github.com/gists/${id}?client_id=${credentials.id}&client_secret=${credentials.secret}`, {
			decode: false,
			parse: false
		}, (err, response) => {
			if (err) return reject(err);

			cache.set(id, response.body);
			fulfil(response.body);
		});
	});
}

export function post(body) {
	return new Promise((fulfil, reject) => {
		needle.post(`https://api.github.com/gists?client_id=${credentials.id}&client_secret=${credentials.secret}`, body, (err, response) => {
			if (err) {
				reject(err);
			} else {
				const json = JSON.stringify(response.body);
				cache.set(response.body.id, json);
				fulfil(json);
			}
		});
	});
}

function tryRequire(file) {
	try {
		return require(file);
	} catch (err) {
		return null;
	}
}