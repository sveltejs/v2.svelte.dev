import posts from './_posts.js';

const lookup = new Map();
posts.forEach(post => {
	lookup.set(post.slug, JSON.stringify(post));
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