**Work in progress**

Hi all,  
so I've done it.  
I forked the svelte.technology-repo and styled the page along my [style-drafts](https://github.com/sveltejs/svelte.technology/issues/335#issuecomment-421912789).  
Opinions are welcome.

I also replied on an issue by @rich_harris concerning syntax-highlighting and wanted to throw these thought into discussion too.  
Just have to find it again...wait...ahh...[here #316](https://github.com/sveltejs/svelte.technology/pull/316#issuecomment-425632718)

and have fun  
Achim



---

**Still on the list**

- [ ] **aarrghh. Browser-Tests** (developed with **Chrome**)
	Just saw:

	- Firefox dislikes my svgs

	- Safari doesn't want my link-styles

	- No one knows what Explorer will do...

		So please, watch in Chrome for now

- [ ] **figure out mobile styles**

- [ ] **nav (see above)**

- [ ] blog-post single-page

- [ ] offset for #anchors. They're below nav. 

- [ ] smooth-scroll solution? 

- [ ] REPL – "click to run"

- [ ] REPL – lost SplitPanes (css)

- [ ] REPL – user menu
  not able to login/load/check

- [ ] REPL – wrong viewer-height

- [ ] some mindful/helpful animations?

- [ ] code cleanup

- [ ] list-styles

- [x] <strike>REPL – fix file-edit (css)</strike>

- [x] <strike>links</strike>

- [x] <strike>replace hljs with prism (smaller footprint)</strike>

- [x] <strike>fix guide-padding</strike>

- [x] <strike>site icons</strike>

- [x] <strike>current section icon</strike>

- [x] <strike>fix blockquotes</strike>

- [x] <strike>wrong font in syntax-highlighter</strike>

- [x] <strike>bigger h3</strike>

- [x] <strike>Home-/Landing-page just rough</strike>

- [x] <strike>blog (rough list-page)</strike>

- [x] <strike>repl (rough)</strike>

- [x] <strike>error (very, very rough)</strike>

---

**Is it bad to use global.css?**

I thought for main stuff it makes sense to define common stuff in global.css than to "overload" <style> in routes.

<small>Easy to change that if needed/requested.</small>

I know that global.css won't receive auto-css-removal, but is this an issue for commonly, overall used style-stuff?
I've tried hard to include only real global-stuff.

Main advantage in my eyes is the usage of custom-css-properties for theming, color- and font-stuff or helper-classes.

<small>**hmm. OK.** That could be done with components including css too.</small>

**maybe it's this**
I find all these `.someting :global(xxx) :global(yy)` disturbing.

**NOTE on css**
The real basic reset is inline in template.html
for fastest possible load.



---

**Some Questions**

- Is an agressive font-subsetting OK?
- Is this @web-font load ok?
	I wanted to prevent the inlining of base64.
	Got it from [fout-with-class](https://github.com/zachleat/web-font-loading-recipes)
- What are our required glyphs? Even Chinese?
- Is inlining svg for icons bad practice?

