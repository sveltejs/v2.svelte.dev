import fetch from 'node-fetch';

export function post(req, res) {
	const user = req.session.passport && req.session.passport.user;

	if (!user) {
		res.writeHead(403, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify({ error: 'unauthorized' }));
		return;
	}

	let body = '';

	req.on('data', chunk => {
		body += chunk;
	});

	req.on('end', async () => {
		const { name, components, json } = JSON.parse(body);

		const files = {
			'meta.json': {
				content: JSON.stringify({
					svelte: true
				}, null, '  ')
			},
			'README.md': {
				content: `Created with [svelte.technology/repl](https://svelte.technology/repl)`
			}
		};
		components.forEach(component => {
			const file = `${component.name}.${component.type}`;
			files[file] = { content: component.source };
		});

		if (json) {
			files['data.json'] = { content: json };
		}

		const r = await fetch(`https://api.github.com/gists`, {
			method: 'POST',
			headers: {
				Authorization: `token ${user.token}`
			},
			body: JSON.stringify({
				description: name,
				files,
				public: false
			})
		});

		res.writeHead(r.status, {
			'Content-Type': 'application/json'
		});

		const gist = await r.json();

		res.end(JSON.stringify({
			id: gist.id,
			description: gist.description,
			owner: gist.owner,
			html_url: gist.html_url,
			files: gist.files
		}));
	});
}