import fs from 'fs';
import path from 'path';
import * as fleece from 'golden-fleece';
import process_markdown from '../_process_markdown.js';
import marked from 'marked';
import hljs from 'highlight.js';

const langs = {
	'hidden-data': 'json',
	'html-no-repl': 'html'
};

function btoa(str) {
	return new Buffer(str).toString('base64');
}

const escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

const unescaped = Object.keys(escaped).reduce(
	(unescaped, key) => ((unescaped[escaped[key]] = key), unescaped),
	{}
);

function unescape(str) {
	return String(str).replace(/&.+?;/g, match => unescaped[match] || match);
}

const blockTypes = 'blockquote html heading hr list listitem paragraph table tablerow tablecell'.split(' ');

function extractMeta(line, lang) {
	try {
		if (lang === 'html' && line.startsWith('<!--') && line.endsWith('-->')) {
			return fleece.evaluate(line.slice(4, -3).trim());
		}

		if (lang === 'js' || lang === 'json' && line.startsWith('/*') && line.endsWith('*/')) {
			return fleece.evaluate(line.slice(2, -2).trim());
		}
	} catch (err) {
		// TODO report these errors, don't just squelch them
		return null;
	}
}

// https://github.com/darkskyapp/string-hash/blob/master/index.js
function getHash(str) {
	let hash = 5381;
	let i = str.length;

	while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
	return (hash >>> 0).toString(36);
}

export const demos = new Map();

export default function() {
	return fs
		.readdirSync(`content/guide`)
		.filter(file => file[0] !== '.' && path.extname(file) === '.md')
		.map(file => {
			const markdown = fs.readFileSync(`content/guide/${file}`, 'utf-8');

			const { content, metadata } = process_markdown(markdown);

			const groups = [];
			let group = null;
			let uid = 1;

			const renderer = new marked.Renderer();

			renderer.code = (source, lang) => {
				source = source.replace(/^ +/gm, match => match.split('    ').join('\t'));

				const lines = source.split('\n');

				const meta = extractMeta(lines[0], lang);
				if (meta) source = lines.slice(1).join('\n');

				let prefix = '';

				if (lang === 'html' && !group) {
					if (!meta || meta.repl !== false) {
						prefix = `<a class='open-in-repl' href='repl?demo=@@${uid}'></a>`;
					}

					group = { id: uid++, blocks: [] };
					groups.push(group);
				}

				if (group) group.blocks.push({ meta: meta || {}, lang, source });

				if (meta && meta.hidden) return '';

				const highlighted = hljs.highlight(lang, source).value;
				return `${prefix}<pre><code>${highlighted}</code></pre>`;
			};

			blockTypes.forEach(type => {
				const fn = renderer[type];
				renderer[type] = function() {
					group = null;
					return fn.apply(this, arguments);
				};
			});

			const html = marked(content, { renderer });

			const hashes = {};

			groups.forEach(group => {
				const main = group.blocks[0];
				if (main.meta.repl === false) return;

				const hash = getHash(group.blocks.map(block => block.source).join(''));
				hashes[group.id] = hash;

				const json5 = group.blocks.find(block => block.lang === 'json');

				const title = main.meta.title;
				if (!title) console.error(`Missing title for demo in ${file}`);

				demos.set(hash, JSON.stringify({
					title: title || 'Example from guide',
					components: group.blocks
						.filter(block => block.lang === 'html' || block.lang === 'js')
						.map(block => {
							const [name, type] = (block.meta.filename || '').split('.');
							return {
								name: name || 'App',
								type: type || 'html',
								source: block.source
							};
						}),
					json5: json5 && json5.source
				}));
			});

			const subsections = [];
			const pattern = /<h3 id="(.+?)">(.+?)<\/h3>/g;
			let match;

			while ((match = pattern.exec(html))) {
				const slug = match[1];
				const title = unescape(
					match[2].replace(/<\/?code>/g, '').replace(/\.(\w+)\W.*/, '.$1')
				);

				subsections.push({ slug, title });
			}

			return {
				html: html.replace(/@@(\d+)/g, (m, id) => hashes[id] || m),
				metadata,
				subsections,
				slug: file.replace(/^\d+-/, '').replace(/\.md$/, '')
			};
		});
}