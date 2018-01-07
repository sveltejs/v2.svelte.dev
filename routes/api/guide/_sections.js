import fs from 'fs';
import path from 'path';
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

export default function() {
	return fs
		.readdirSync(`content/guide`)
		.filter(file => file[0] !== '.' && path.extname(file) === '.md')
		.map(file => {
			const markdown = fs.readFileSync(`content/guide/${file}`, 'utf-8');

			const { content, metadata } = process_markdown(markdown);

			// syntax highlighting
			let uid = 0;
			const replComponents = {};
			const replData = {};
			const highlighted = {};

			const tweaked_content = content.replace(
				/```([\w-]+)?\n([\s\S]+?)```/g,
				(match, lang, code) => {
					if (lang === 'hidden-data') {
						replData[uid] = JSON.parse(code);
						return '\n\n';
					}

					const syntax = lang.startsWith('html-nested-')
						? 'html'
						: langs[lang] || lang;
					const { value } = hljs.highlight(syntax, code);
					const name = lang.slice(12);

					if (lang.startsWith('html-nested-')) {
						replComponents[uid].push({
							name,
							source: code
						});

						highlighted[uid] += `\n\n<h2>${name}.html</h2>${value}`;
						return '';
					} else {
						highlighted[++uid] = value;

						if (lang === 'html') {
							replComponents[uid] = [
								{
									name: 'App',
									source: code
								}
							];

							return `%%${uid}`;
						}

						return `@@${uid}`;
					}
				}
			);

			const html = marked(tweaked_content)
				.replace(/<p>(<a class='open-in-repl'[\s\S]+?)<\/p>/g, '$1')
				.replace(/<p>@@(\d+)<\/p>/g, (match, id) => {
					return `<pre><code>${highlighted[id]}</code></pre>`;
				})
				.replace(/<p>%%(\d+)<\/p>/g, (match, id) => {
					const components = replComponents[id];
					const header = components.length > 1 ? `<h2>App.html</h2>` : '';
					const pre = `<pre><code>${header}${highlighted[id]}</code></pre>`;
					const data = replData[id] || {};

					const json = JSON.stringify({
						gist: null,
						components,
						data
					});

					const href = `/repl?data=${encodeURIComponent(btoa(json))}`;
					return `<a class='open-in-repl' href='${href}'></a>${pre}`;
				})
				.replace(/^\t+/gm, match => match.split('\t').join('  '));

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
				html,
				metadata,
				subsections,
				slug: file.replace(/^\d+-/, '').replace(/\.md$/, '')
			};
		});
}