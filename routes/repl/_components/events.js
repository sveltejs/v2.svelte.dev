export function keyEvent(code) {
	return function (node, callback) {
		node.addEventListener('keydown', handleKeydown);

		function handleKeydown(event) {
			if (event.keyCode === code) {
				callback.call(this, event);
			}
		}

		return {
			teardown() {
				node.removeEventListener('keydown', handleKeydown);
			}
		};
	}
}

export const enter = keyEvent(13);