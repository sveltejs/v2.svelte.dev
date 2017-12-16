import sections from './_sections.js';

const contents = JSON.stringify(sections.map(section => {
	return {
		metadata: section.metadata,
		subsections: section.subsections,
		slug: section.slug
	};
}));

export function get(req, res) {
	res.set({
		'Content-Type': 'application/json',
		'Cache-Control': `max-age=${30 * 60 * 1e3}` // 30 minutes
	});
	res.end(contents);
}