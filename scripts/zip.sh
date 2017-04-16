cp public/repl-viewer.css scripts/svelte-app/public/global.css
rm -rf public/svelte-app.zip

( cd scripts/svelte-app
	rm -rf node_modules
	zip -r -X ../../public/svelte-app.zip .
)