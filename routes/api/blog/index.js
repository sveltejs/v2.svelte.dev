import posts from './_posts.js';

const summary = JSON.stringify(posts.map(post => {
	return {
		slug: post.slug,
		metadata: post.metadata
	};
}));

export function get(req, res) {
	res.set({
		'Content-Type': 'application/json',
		'Cache-Control': `max-age=${5 * 60 * 1e3}` // 5 minutes
	});
	res.end(summary);
}