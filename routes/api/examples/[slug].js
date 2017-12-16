import { examples } from './_examples.js';

const lookup = new Map();
examples.forEach(example => {
	lookup.set(example.slug, JSON.stringify(example));
});

export function get(req, res) {
	if (lookup.has(req.params.slug)) {
		res.set({
			'Content-Type': 'application/json',
			'Cache-Control': `max-age=${30 * 60 * 1e3}` // 30 minutes
		});
		res.end(lookup.get(req.params.slug));
	}
}