export function heap(empty, max) {
	const Heap = function (tree) {
		this.tree = tree;
	};

	Heap.prototype.isEmpty = function () {
		return this.tree.isEmpty();
	};

	Heap.prototype.maxKey = Heap.prototype.measure = function () {
		return this.tree.measure();
	};

	Heap.prototype.insert = Heap.prototype.push = function (value) {
		return new Heap(this.tree.push(value));
	};

	Heap.prototype.extractMax = function () {
		const ub = this.measure();
		const split = this.tree.splitTree((m) => m >= ub, max.zero());
		return [split.middle, new Heap(split.left.concat(split.right))];
	};

	Heap.prototype.insertValues = function (values) {
		let s = this;

		for (const value of values) s = s.insert(value);

		return s;
	};

	return {
		empty: () => new Heap(empty(max)),
		from: (iterable) => new Heap(empty(max)).insertValues(iterable),
	};
}
