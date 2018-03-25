import fetch from 'node-fetch';

export async function get(req, res) {
	const { id } = req.params;

	const r = await fetch(`https://api.github.com/gists/${id}`);

	res.writeHead(r.status, {
		'Content-Type': 'application/json'
	});

	const result = await r.json();

	if (r.status === 200) {
		res.end(JSON.stringify({
			id: result.id,
			description: result.description,
			owner: result.owner,
			html_url: result.html_url,
			files: result.files
		}));
	} else {
		res.end(JSON.stringify(result));
	}
}