import fs from 'fs';
import path from 'path';
import process_markdown from '../_process_markdown.js';
import marked from 'marked';
import hljs from 'highlight.js';

export default function () {
	return fs
		.readdirSync('content/blog')
		.map(file => {
			if (path.extname(file) !== '.md') return;

			const markdown = fs.readFileSync(`content/blog/${file}`, 'utf-8');

			const { content, metadata } = process_markdown(markdown);

			const date = new Date(`${metadata.pubdate} EDT`); // cheeky hack
			metadata.dateString = date.toDateString();

			const renderer = new marked.Renderer();

			renderer.code = (source, lang) => {
				const highlighted = hljs.highlight(lang, source).value;
				return `<pre><code>${highlighted}</code></pre>`;
			};

			const html = marked(content.replace(/^\t+/gm, match => match.split('\t').join('  ')), {
				renderer
			});

			return {
				html,
				metadata,
				slug: file.replace(/^[\d-]+/, '').replace(/\.md$/, '')
			};
		})
		.sort((a, b) => {
			return a.metadata.pubdate < b.metadata.pubdate ? 1 : -1;
		});
}
