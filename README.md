# [svelte.technology](https://svelte.technology)

The website for Svelte.

## Running locally

This project uses [yarn](https://yarnpkg.com) to manage dependencies.

Set up the project:

```bash
git clone git@github.com:sveltejs/svelte.technology.git
cd svelte.technology
yarn
```

Start the server with `yarn run dev`, and navigate to [localhost:3000](http://localhost:3000).

## Using a local copy of Svelte

By default, the REPL will fetch the most recent version of Svelte from https://unpkg.com/svelte. If you need to test a local version of Svelte, you can do so by linking it and navigating to [localhost:3000/repl?version=local](http://localhost:3000/repl?version=local):

```bash
cd /path/to/svelte
yarn link
yarn dev # rebuild Svelte on changes

cd /path/to/svelte.technology
yarn link svelte
yarn dev
```

## REPL GitHub integration

In order for the REPL's GitHub integration to work properly when running locally, you will need to create a GitHub OAuth app. Set its authorization callback URL to `http://localhost:3000/auth/callback`, and in the root of this project, create a file `.env` containing:

```
GITHUB_CLIENT_ID=[your app's client id]
GITHUB_CLIENT_SECRET=[your app's client secret]
BASEURL=http://localhost:3000
```

## License

[MIT](LICENSE)
