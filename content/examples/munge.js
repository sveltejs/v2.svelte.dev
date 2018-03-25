const fs = require('fs');
const path = require('path');

const manifest = require('./manifest.json');
const gists = require('./_gists.json');

const titleBySlug = {};

fs.readdirSync(__dirname).forEach(file => {
	const stats = fs.statSync(path.join(__dirname, file));
	if (!stats.isDirectory()) return;

	const meta = require(`./${file}/example.json`);

	titleBySlug[file] = meta.title;
});

console.log(titleBySlug);

const gistBySlug = {};

gists.forEach(gist => {
	gistBySlug[gist.slug] = gist.gist;
});

manifest.forEach(group => {
	group.examples = group.examples.map(slug => {
		return {
			slug,
			title: titleBySlug[slug],
			gist: gistBySlug[slug]
		};
	});
});

fs.writeFileSync(path.join(__dirname, 'manifest2.json'), JSON.stringify(manifest, null, '\t'));