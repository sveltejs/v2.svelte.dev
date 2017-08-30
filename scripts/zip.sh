rm -rf client/dist/svelte-app.zip

( cd scripts/svelte-app
	rm -rf src
	rm -rf node_modules
	zip -r -X ../../client/dist/svelte-app.zip .
)
