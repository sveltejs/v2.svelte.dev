import cache from './_cache.js';
import needle from 'needle';

export function get(req, res) {
	const { id } = req.params;

	Promise.resolve(
		cache.get(id) ||
		needle('get',
			`https://api.github.com/gists/${id}?client_id=${credentials.id}&client_secret=${credentials.secret}`,
			{ decode: false, parse: false }
		).then(response => {
			cache.set(id, response.body);
			return response.body;
		})
	).then(json => {
		res.set({
			'Content-Type': 'application/json',
			'Cache-Control': `max-age=31536000`
		});
		res.end(json);
	});
}