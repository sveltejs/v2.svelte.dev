---
title: Sapper: Towards the ideal web app framework
description: TKTKTK
pubdate: 2017-12-31
author: Rich Harris
authorURL: https://twitter.com/Rich_Harris
---

If you had to list the characteristics of the perfect web application framework — not just the UI layer, but the whole thing — you'd probably come up with something like this:

1. It should do server-side rendering, for fast initial loads and no caveats around SEO
2. As a corollary, your app's codebase should be universal — write once for server *and* client
3. The client-side app should *hydrate* the server-rendered HTML, attaching event listeners (and so on) to existing elements rather than re-rendering them
4. Navigating to subsequent routes should be instantaneous
5. Offline, and other Progressive Web App characteristics, must be supported out of the box
6. Only the JavaScript and CSS required for the first page should load initially. That means the framework should do automatic code-splitting at the route level, and support dynamic `import(...)` for more granular manual control
7. No compromise on performance
8. First-rate developer experience, with hot module reloading and all the trimmings
9. The resulting codebase should be easy to grok and maintain
10. It should be possible to understand and customise every aspect of the system — no hidden webpack configs, and as little 'magic' as possible

[Next.js](https://github.com/zeit/next.js) is close to this ideal. If you haven't encountered it yet, I strongly recommend going through the tutorials at [learnnextjs.com](https://learnnextjs.com). Next introduced a brilliant idea: all the pages of your app are files in a `your-project/pages` directory, and each of those files is just a React component.

Everything else flows from that breakthrough design decision. Finding the code responsible for a given page is easy, because you can just look at the filesystem rather than playing 'guess the component name'. Project structure bikeshedding is a thing of the past. And the combination of SSR (server-side rendering) and code-splitting — something the React Router team [gave up on](https://reacttraining.com/react-router/web/guides/code-splitting), declaring 'Godspeed those who attempt the server-rendered, code-split apps' — is trivial.

But it's not *perfect*. As churlish as it might be to list the flaws in something *so, so good*, there are some:

* Next uses something called 'route masking' to create nice URLs (e.g. `/blog/hello-world` instead of `/post?slug=hello-world`). This undermines the guarantee about directory structure corresponding to app structure, and forces you to maintain configuration that translates between the two forms
* All your routes are assumed to be universal 'pages'. But it's very common to need routes that only render on the server, such as a 301 redirect or an API endpoint that serves the data for your pages, and Next doesn't have a great solution for this. You can add logic to your `server.js` file to handle these cases, but it feels at odds with the declarative approach taken for pages
* To use the client-side router, links can't be standard `<a>` tags. Instead, you have to use framework-specific `<Link>` tags, which is impossible in the markdown content for a blog post such as this one, for example

The real problem, though, is that all that goodness comes for a price. The simplest possible Next app — a single 'hello world' page that renders some static text — involves TKkb of JavaScript. Unzipped, it's TKkb, which is a non-trivial amount of code for a mobile device to parse at a time when performance is a critical determining factor in whether or not your users will stick around. And that's the *baseline*.

We can do better!


### The compiler-as-framework paradigm shift

[Svelte](https://svelte.technology/blog/frameworks-without-the-framework) introduced a radical idea: what if your UI framework wasn't a framework at all, but a compiler that turned your components into standalone JavaScript modules? Instead of using a library like React or Vue, which knows nothing about your app and must therefore be a one-size-fits-all solution, we can ship highly-optimised vanilla JavaScript. Just the code your app needs, and without the memory and performance overhead of solutions based on a virtual DOM.

The JavaScript world is [moving towards this model](TK-tom-dale-talk). [Stencil](https://stenciljs.com), a Svelte-inspired framework from the Ionic team, compiles to web components. [Glimmer](https://glimmerjs.com) *doesn't* compile to standalone JavaScript (the pros and cons of which deserve a separate blog post), but is doing some fascinating research around compiling templates to bytecode. (React is [getting in on the action](https://twitter.com/trueadm/status/944908776896978946), though their current research focuses on optimising your JSX app code, which is arguably more similar to the ahead-of-time optimisations that Angular, Ractive and Vue have been doing for a few years.)

What happens if we use that as a starting point?


### Introducing Sapper

<aside>The [name comes from](https://sapper.svelte.technology/guide#why-the-name-) the slang term for combat engineers, and is also short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong></aside>

[Sapper](https://sapper.svelte.technology) is the answer to that question. It's a Next.js-style framework that aims to meet the ten criteria at the top of this article while dramatically reducing the amount of code that gets sent to the browser.

The same 'hello world' app that took TKkb with React and Next weighs just TKkb in Sapper. That number is likely to fall further in the future as we explore the space of optimisation possibilities, such as not shipping any JavaScript *at all* for pages that aren't interactive, beyond the tiny Sapper runtime that handles client-side routing.

What about a more 'real world' example? Conveniently, the [RealWorld](https://github.com/gothinkster/realworld) project, which challenges frameworks to develop an implementation of a Medium clone, gives us a way to find out. The Sapper implementation takes TKkb to hydrate the homepage. The entire app costs TKkb, which is signficantly smaller than the reference React/Redux implementation at TKkb, but even if was as large it would *feel* faster because of code-splitting.

And that's a crucial point. We're told we need to code-split our apps, but if your app uses a traditional framework like React or Vue then there's a hard lower bound on the size of your initial code-split chunk — the framework itself, which is likely to be a significant chunk of your total app size. With the Svelte approach, that's no longer the case.


### Trade-offs



### Roadmap


