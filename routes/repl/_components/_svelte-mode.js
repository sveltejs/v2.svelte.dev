const CodeMirror = require('codemirror/lib/codemirror');

CodeMirror.defineMode('svelte', (config, parserConfig) => {
	const htmlMode = CodeMirror.getMode(config, 'htmlmixed');
	const jsMode = CodeMirror.getMode(config, 'javascript');

	function token(stream, state) {
		if (state.tagClose) {
			state.tagClose = false;
			stream.eatSpace();

			if (stream.eat('}')) return 'tag';
			return null;
		}

		if (state.inJS) {
			const token = jsMode.token(stream, state.jsState);

			if (!token) {
				const current = stream.current();

				if (current === '{') state.braceDepth += 1;

				if (current === '}') {
					if (state.braceDepth === 0) {
						state.inJS = false;
						return 'tag';
					} else {
						state.braceDepth -= 1;
					}
				}
			}

			return token;
		}

		if (state.blockOpen) {
			state.blockOpen = false;
			state.indented += 2;

			if (stream.match(/#(if|each|await)/, true)) {
				state.inJS = true;
				state.braceDepth = 0;
				state.jsState = CodeMirror.startState(jsMode);

				return 'keyword';
			}
		}

		if (state.blockClause) {
			state.blockClause = false;
			state.tagClose = true;

			if (stream.match(/:(elseif|then|catch)/, true)) {
				state.inJS = true;
				state.braceDepth = 0;
				state.jsState = CodeMirror.startState(jsMode);

				return 'keyword';
			}

			if (stream.match(/:else/, true)) {
				return 'keyword';
			}
		}

		if (state.blockClose) {
			state.blockClose = false;
			state.indented -= 2;
			state.tagClose = true;

			if (stream.match(/\/(if|each|await)/, true)) {
				return 'keyword';
			}
		}

		if (stream.eat('{')) {
			const char = stream.peek();
			if (char === '#') {
				state.blockOpen = true;
			} else if (char === ':') {
				state.blockClause = true;
			} else if (char === '/') {
				state.blockClose = true;
			} else {
				state.inJS = true;
				state.braceDepth = 0;
				state.jsState = CodeMirror.startState(jsMode);
			}

			return 'tag';
		}

		const token = htmlMode.token(stream, state.innerState);
		if (token) return token;

		const current = stream.current();
		const index = current.indexOf('{');

		if (index !== -1) {
			stream.backUp(current.length - index);
		}
	}

	return {
		startState: () => {
			return {
				tagClose: false,
				blockOpen: false,
				blockClause: false,
				blockClose: false,
				indented: 0,
				inJS: false,
				braceDepth: 0,
				jsState: null,
				innerState: CodeMirror.startState(htmlMode)
			};
		},

		copyState: state => {
			return {
				tagClose: state.tagClose,
				blockOpen: state.blockOpen,
				blockClause: state.blockClause,
				blockClose: state.blockClose,
				indented: state.indented,
				inJS: state.inJS,
				braceDepth: 0,
				jsState: CodeMirror.copyState(jsMode, state.jsState),
				innerState: CodeMirror.copyState(htmlMode, state.innerState)
			};
		},

		token,

		indent: (state, textAfter, fullLine) => {
			let indentation = (
				state.indented +
				htmlMode.indent(state.innerState, textAfter, fullLine)
			);

			if (/{(:|\/)/.test(textAfter)) indentation -= 2;

			return indentation;
		},

		electricInput: /({[:/]|<\/[\s\w:]+>)$/
	};
});
