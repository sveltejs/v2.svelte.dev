import { contents } from './_examples.js';

const summary = JSON.stringify(contents);

export function get(req, res) {
	res.set({
		'Content-Type': 'application/json',
		'Cache-Control': `max-age=${30 * 60 * 1e3}` // 30 minutes
	});
	res.end(summary);
}