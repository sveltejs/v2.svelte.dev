const CodeMirror = require('codemirror');
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/shell/shell.js');
require('codemirror/mode/htmlmixed/htmlmixed.js');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/css/css.js');

require('./_svelte-mode.js');

module.exports = CodeMirror;