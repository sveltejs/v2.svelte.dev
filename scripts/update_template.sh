# fetch svelte-app
rm -rf scripts/svelte-app
node_modules/.bin/degit sveltejs/template scripts/svelte-app

# update repl-viewer.css based on template
cp scripts/svelte-app/public/global.css assets/repl-viewer.css

# remove src (will be recreated client-side) and node_modules
rm -rf scripts/svelte-app/src
rm -rf scripts/svelte-app/node_modules

# delete and recreate assets/svelte-app.zip
rm -rf assets/svelte-app.zip

( cd scripts/svelte-app
	zip -r -X ../../assets/svelte-app.zip .
)
