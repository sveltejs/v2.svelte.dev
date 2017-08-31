rm -rf public/svelte-app.zip

( cd scripts/svelte-app
	rm -rf src
	rm -rf node_modules
	zip -r -X ../../public/svelte-app.zip .
)
