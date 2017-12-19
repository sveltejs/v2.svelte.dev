import fs from 'fs';
import path from 'path';
import glob from 'glob';

function read_json (file) {
	const json = fs.readFileSync(path.resolve('content/examples', file), 'utf-8');
	return JSON.parse(json);
}

const contents = [];
const examples = [];

read_json('manifest.json').forEach(group => {
	const group_contents = [];

	group.examples.forEach(id => {
		const example = read_json(`${id}/example.json`);

		example.slug = id;

		example.data = example.data || {};

		example.components = glob
			.sync('**/*.+(html|js)', { cwd: `content/examples/${id}` })
			.map(file => {
				const ext = path.extname(file);
				const type = ext.slice(1);

				return {
					name: file.replace(ext, ''),
					type,
					entry: file === 'App.html' ? true : undefined,
					source: fs.readFileSync(
						`content/examples/${id}/${file}`,
						'utf-8'
					)
				};
			})
			.sort((a, b) => {
				if (a.name === 'App') return -1;
				if (b.name === 'App') return 1;

				if (a.type !== b.type) {
					return a.type === 'js' ? 1 : -1;
				}

				return a.name < b.name ? -1 : 1;
			});

		group_contents.push({
			id,
			title: example.title
		});

		examples.push(example);
	});

	contents.push({
		name: group.name,
		examples: group_contents
	});
});

export { examples, contents };