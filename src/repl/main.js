import Repl from './Repl.html';
import examples from './examples.js';

const match = /gist=(.+)$/.exec( window.location.search );
const gist = match ? match[1] : examples[0].gist;

const repl = new Repl({
	target: document.querySelector( 'main' ),
	data: { gist }
});

window.repl = repl;
