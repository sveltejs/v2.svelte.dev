---
title: Compiler options
---

The Svelte compiler supports a number of options that affect its behavior. How these are specified depends on the particular build tool you're using. Check out the documentation for your build tool's Svelte plugin for more information.

Here are some of the most important compiler options. For a more complete list, see [Svelte's readme](https://github.com/sveltejs/svelte#options).


### dev

Svelte can catch many types of issues at compile time, but there are others that can only be caught at runtime. But in production, to save bytes and improve speed, we don't want to include any of these checks. So Svelte has a `dev` compiler option to enable or disable them. This defaults to `false`, but in development, you should compile your components with `dev: true` to help catch issues. Check the browser console for exceptions or warnings from your components.
