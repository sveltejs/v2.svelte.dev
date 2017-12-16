import LRU from 'lru-cache';

export default new LRU({
	max: 50 * 1024 * 1024, // basically a random number [shrug]
	length: str => str.length
});