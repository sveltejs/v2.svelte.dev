import fs from 'fs';
import needle from 'needle';
import cache from './_cache.js';

let credentials = {
	id: process.env.client_id,
	secret: process.env.client_secret
};

try {
	const json = fs.readFileSync('credentials.json', 'utf-8');
	credentials = JSON.parse(json);
} catch(err) {
	// noop
}

export function post(req, res) {
	let body = '';

	req.on('data', chunk => {
		body += chunk;
	});

	req.on('end', () => {
		needle.post(
			`https://api.github.com/gists?client_id=${credentials.id}&client_secret=${credentials.secret}`,
			body,
			(err, response) => {
				if (err) {
					console.error(err.message);
					res.status(500).end(err.message);
				} else {
					const json = JSON.stringify(response.body);
					cache.set(response.body.id, json);

					res.set({
						'Content-Type': 'application/json',
						'Cache-Control': `max-age=31536000`
					});
					res.end(json);
				}
			}
		);
	});
}
