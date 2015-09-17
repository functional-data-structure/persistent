"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

(function () {

	'use strict';

	var definition = function definition(exports, undefined) {

		/* js/src/heap.js */

		function heap(_empty, max) {

			var Heap = function Heap(tree) {
				this.tree = tree;
			};

			Heap.prototype.empty = function () {
				return this.tree.empty();
			};

			Heap.prototype.maxKey = Heap.prototype.measure = function () {
				return this.tree.measure();
			};

			Heap.prototype.insert = Heap.prototype.push = function (value) {
				return new Heap(this.tree.push(value));
			};

			Heap.prototype.extractMax = function () {
				var ub = this.measure();
				var split = this.tree.splitTree(function (m) {
					return m >= ub;
				}, max.zero());
				return [split.middle, new Heap(split.left.concat(split.right))];
			};

			Heap.prototype.insertValues = function (values) {

				var s = this;

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var value = _step.value;
						s = s.insert(value);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				return s;
			};

			return {
				empty: function empty() {
					return new Heap(_empty(max));
				},
				from: function from(iterable) {
					return new Heap(_empty(max)).insertValues(iterable);
				}
			};
		}

		exports.heap = heap;

		/* js/src/intervaltree.js */

		function intervaltree(_empty2, M) {

			var atleast = function atleast(k, _ref) {
				var _ref2 = _slicedToArray(_ref, 2);

				var _ = _ref2[0];
				var n = _ref2[1];

				return M.b.measure(k) <= n;
			};

			var greater = function greater(k, _ref3) {
				var _ref32 = _slicedToArray(_ref3, 2);

				var n = _ref32[0];
				var _ = _ref32[1];

				return n > M.a.measure(k);
			};

			var matches = regeneratorRuntime.mark(function matches(low, tree) {
				var xs;
				return regeneratorRuntime.wrap(function matches$(context$4$0) {
					while (1) switch (context$4$0.prev = context$4$0.next) {
						case 0:
							xs = tree.dropUntil(function (m) {
								return atleast(low);
							});

							if (!xs.empty()) {
								context$4$0.next = 3;
								break;
							}

							return context$4$0.abrupt("return");

						case 3:
							context$4$0.next = 5;
							return xs.head();

						case 5:
							return context$4$0.delegateYield(matches(low, xs.tail()), "t0", 6);

						case 6:
						case "end":
							return context$4$0.stop();
					}
				}, matches, this);
			});

			var Interval = function Interval(low, high) {
				this.low = low;
				this.high = high;
			};

			var IntervalTree = function IntervalTree(tree) {
				this.tree = tree;
			};

			IntervalTree.prototype.add = function (low, high) {
				return new IntervalTree(this.tree.push(new Interval(low, high)));
			};

			IntervalTree.prototype.empty = function () {
				return this.tree.empty();
			};

			IntervalTree.prototype.measure = function () {
				return this.tree.measure();
			};

			IntervalTree.prototype[Symbol.iterator] = function () {
				return this.tree[Symbol.iterator]();
			};

			IntervalTree.prototype.intervalSearch = function (interval) {

				if (!atleast(interval.low, t.measure())) return null;

				var _t$tree$splitTree = t.tree.splitTree(function (m) {
					return atleast(i, m);
				}, M.zero());

				var middle = _t$tree$splitTree.middle;

				return middle.low > interval.high ? null : middle;
			};

			IntervalTree.prototype.intervalMatch = function (interval) {

				return matches(interval.low, this.tree.takeUntil(function (m) {
					return greater(interval.high);
				}));
			};

			return {
				empty: function empty() {
					return new IntervalTree(_empty2(M));
				},
				from: function from(iterable) {
					return new IntervalTree(_empty2(M)).append(iterable);
				}
			};
		}

		exports.intervaltree = intervaltree;

		/* js/src/ordseq.js */

		function ordseq(_empty3, key) {

			var OrdSeq = function OrdSeq(tree) {
				this.tree = tree;
			};

			OrdSeq.prototype.empty = function () {
				return this.tree.empty();
			};

			OrdSeq.prototype.measure = function () {
				return this.tree.measure();
			};

			OrdSeq.prototype.min = OrdSeq.prototype.head = function () {
				return this.tree.head();
			};

			OrdSeq.prototype.tail = function () {
				return new OrdSeq(this.tree.tail());
			};

			OrdSeq.prototype.max = OrdSeq.prototype.last = function () {
				return this.tree.last();
			};

			OrdSeq.prototype.init = function () {
				return new OrdSeq(this.tree.init());
			};

			OrdSeq.prototype.takeUntil = function (predicate) {
				return new OrdSeq(this.tree.takeUntil(predicate));
			};

			OrdSeq.prototype.dropUntil = function (predicate) {
				return new OrdSeq(this.tree.dropUntil(predicate));
			};

			OrdSeq.prototype[Symbol.iterator] = function () {
				return this.tree[Symbol.iterator]();
			};

			OrdSeq.prototype.split = function (predicate) {
				var _tree$split = this.tree.split(predicate);

				var _tree$split2 = _slicedToArray(_tree$split, 2);

				var left = _tree$split2[0];
				var right = _tree$split2[1];

				return [new OrdSeq(left), new OrdSeq(right)];
			};

			OrdSeq.prototype.partition = function (value) {
				var k = key.measure(value);
				return this.split(function (m) {
					return m >= k;
				});
			};

			OrdSeq.prototype.insert = function (value) {
				var k = key.measure(value);

				var _tree$split3 = this.tree.split(function (m) {
					return m >= k;
				});

				var _tree$split32 = _slicedToArray(_tree$split3, 2);

				var left = _tree$split32[0];
				var right = _tree$split32[1];

				return new OrdSeq(left.push(value).concat(right));
			};

			OrdSeq.prototype.deleteAll = function (value) {
				var k = key.measure(value);

				var _tree$split4 = this.tree.split(function (m) {
					return m >= k;
				});

				var _tree$split42 = _slicedToArray(_tree$split4, 2);

				var l = _tree$split42[0];
				var r = _tree$split42[1];

				var _r$split = r.split(function (m) {
					return m > k;
				});

				var _r$split2 = _slicedToArray(_r$split, 2);

				var _ = _r$split2[0];
				var R = _r$split2[1];

				return new OrdSeq(l.concat(R));
			};

			OrdSeq.prototype.merge = function (other) {

				if (other.empty()) return this;

				var a = other.head();
				var k = key.measure(a);

				var _split = this.split(function (m) {
					return m > k;
				});

				var _split2 = _slicedToArray(_split, 2);

				var l = _split2[0];
				var r = _split2[1];

				return new OrdSeq(l.tree.push(a).concat(r.merge(other.tail()).tree));
			};

			OrdSeq.prototype.insertValues = function (values) {

				var s = this;

				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var value = _step2.value;
						s = s.insert(value);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
							_iterator2["return"]();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				return s;
			};

			return {
				empty: function empty() {
					return new OrdSeq(_empty3(key));
				},
				from: function from(iterable) {
					return new OrdSeq(_empty3(key)).insertValues(iterable);
				}
			};
		}

		exports.ordseq = ordseq;

		/* js/src/seq.js */

		function seq(_empty4, size) {

			var Seq = function Seq(tree) {
				this.tree = tree;
			};

			Seq.prototype.empty = function () {
				return this.tree.empty();
			};

			Seq.prototype.measure = Seq.prototype.len = function () {
				return this.tree.measure();
			};

			Seq.prototype.head = function () {
				return this.tree.head();
			};

			Seq.prototype.tail = function () {
				return new Seq(this.tree.tail());
			};

			Seq.prototype.last = function () {
				return this.tree.last();
			};

			Seq.prototype.init = function () {
				return new Seq(this.tree.init());
			};

			Seq.prototype.cons = function (value) {
				return new Seq(this.tree.cons(value));
			};

			Seq.prototype.push = function (value) {
				return new Seq(this.tree.push(value));
			};

			Seq.prototype.append = function (iterable) {
				return new Seq(this.tree.append(iterable));
			};

			Seq.prototype.prepend = function (iterable) {
				return new Seq(this.tree.prepend(iterable));
			};

			Seq.prototype.concat = function (other) {
				return new Seq(this.tree.concat(other.tree));
			};

			Seq.prototype.takeUntil = function (predicate) {
				return new Seq(this.tree.takeUntil(predicate));
			};

			Seq.prototype.dropUntil = function (predicate) {
				return new Seq(this.tree.dropUntil(predicate));
			};

			Seq.prototype.set = function (index, value) {

				if (index < 0 || index >= this.len()) throw new Error("wrong index '" + index + "'");

				var split = this.tree.splitTree(function (m) {
					return m > index;
				}, size.zero());

				return new Seq(split.left.push(value).concat(split.right));
			};

			Seq.prototype.get = function (index) {

				if (index < 0 || index >= this.len()) throw new Error("wrong index '" + index + "'");

				return this.tree.splitTree(function (m) {
					return m > index;
				}, size.zero()).middle;
			};

			Seq.prototype[Symbol.iterator] = function () {
				return this.tree[Symbol.iterator]();
			};

			Seq.prototype.split = function (predicate) {
				var _tree$split5 = this.tree.split(predicate);

				var _tree$split52 = _slicedToArray(_tree$split5, 2);

				var left = _tree$split52[0];
				var right = _tree$split52[1];

				return [new Seq(left), new Seq(right)];
			};

			Seq.prototype.splitAt = function (index) {
				return this.split(function (m) {
					return m > index;
				});
			};

			return {
				empty: function empty() {
					return new Seq(_empty4(size));
				},
				from: function from(iterable) {
					return new Seq(_empty4(size)).append(iterable);
				}
			};
		}

		exports.seq = seq;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("aureooms-js-persistent", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["persistent"] = {});
	} else console.error("unable to detect type of module to define for aureooms-js-persistent");
})();