node_modules/.bin/degit sveltejs/template scripts/svelte-app -f
rm -rf scripts/svelte-app/src
cp scripts/svelte-app/public/global.css public/repl-viewer.css