"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWFwLmpzIl0sIm5hbWVzIjpbImhlYXAiLCJlbXB0eSIsIm1heCIsIkhlYXAiLCJ0cmVlIiwicHJvdG90eXBlIiwibWF4S2V5IiwibWVhc3VyZSIsImluc2VydCIsInB1c2giLCJ2YWx1ZSIsImV4dHJhY3RNYXgiLCJ1YiIsInNwbGl0Iiwic3BsaXRUcmVlIiwibSIsInplcm8iLCJtaWRkbGUiLCJsZWZ0IiwiY29uY2F0IiwicmlnaHQiLCJpbnNlcnRWYWx1ZXMiLCJ2YWx1ZXMiLCJzIiwiZnJvbSIsIml0ZXJhYmxlIl0sIm1hcHBpbmdzIjoiOzs7OztBQUNPLFNBQVNBLElBQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCQyxHQUF4QixFQUE4Qjs7QUFFckMsS0FBSUMsT0FBTyxTQUFQQSxJQUFPLENBQVdDLElBQVgsRUFBa0I7QUFDNUIsT0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsRUFGRDs7QUFJQUQsTUFBS0UsU0FBTCxDQUFlSixLQUFmLEdBQXVCLFlBQWE7QUFDbkMsU0FBTyxLQUFLRyxJQUFMLENBQVVILEtBQVYsRUFBUDtBQUNBLEVBRkQ7O0FBSUFFLE1BQUtFLFNBQUwsQ0FBZUMsTUFBZixHQUNBSCxLQUFLRSxTQUFMLENBQWVFLE9BQWYsR0FBeUIsWUFBYTtBQUNyQyxTQUFPLEtBQUtILElBQUwsQ0FBVUcsT0FBVixFQUFQO0FBQ0EsRUFIRDs7QUFLQUosTUFBS0UsU0FBTCxDQUFlRyxNQUFmLEdBQ0FMLEtBQUtFLFNBQUwsQ0FBZUksSUFBZixHQUFzQixVQUFXQyxLQUFYLEVBQW1CO0FBQ3hDLFNBQU8sSUFBSVAsSUFBSixDQUFVLEtBQUtDLElBQUwsQ0FBVUssSUFBVixDQUFnQkMsS0FBaEIsQ0FBVixDQUFQO0FBQ0EsRUFIRDs7QUFLQVAsTUFBS0UsU0FBTCxDQUFlTSxVQUFmLEdBQTRCLFlBQWE7QUFDeEMsTUFBTUMsS0FBSyxLQUFLTCxPQUFMLEVBQVg7QUFDQSxNQUFNTSxRQUFRLEtBQUtULElBQUwsQ0FBVVUsU0FBVixDQUFxQixVQUFFQyxDQUFGO0FBQUEsVUFBU0EsS0FBS0gsRUFBZDtBQUFBLEdBQXJCLEVBQXdDVixJQUFJYyxJQUFKLEVBQXhDLENBQWQ7QUFDQSxTQUFPLENBQUVILE1BQU1JLE1BQVIsRUFBaUIsSUFBSWQsSUFBSixDQUFVVSxNQUFNSyxJQUFOLENBQVdDLE1BQVgsQ0FBbUJOLE1BQU1PLEtBQXpCLENBQVYsQ0FBakIsQ0FBUDtBQUNBLEVBSkQ7O0FBTUFqQixNQUFLRSxTQUFMLENBQWVnQixZQUFmLEdBQThCLFVBQVdDLE1BQVgsRUFBb0I7O0FBRWpELE1BQUlDLElBQUksSUFBUjs7QUFGaUQ7QUFBQTtBQUFBOztBQUFBO0FBSWpELHdCQUFxQkQsTUFBckI7QUFBQSxRQUFZWixLQUFaO0FBQThCYSxRQUFJQSxFQUFFZixNQUFGLENBQVVFLEtBQVYsQ0FBSjtBQUE5QjtBQUppRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU1qRCxTQUFPYSxDQUFQO0FBRUEsRUFSRDs7QUFVQSxRQUFPO0FBQ050QixTQUFRO0FBQUEsVUFBTyxJQUFJRSxJQUFKLENBQVVGLE9BQU9DLEdBQVAsQ0FBVixDQUFQO0FBQUEsR0FERjtBQUVOc0IsUUFBTyxjQUFFQyxRQUFGO0FBQUEsVUFBZ0IsSUFBSXRCLElBQUosQ0FBVUYsT0FBT0MsR0FBUCxDQUFWLEVBQXlCbUIsWUFBekIsQ0FBdUNJLFFBQXZDLENBQWhCO0FBQUE7QUFGRCxFQUFQO0FBS0MiLCJmaWxlIjoiaGVhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGZ1bmN0aW9uIGhlYXAgKCBlbXB0eSAsIG1heCApIHtcblxubGV0IEhlYXAgPSBmdW5jdGlvbiAoIHRyZWUgKSB7XG5cdHRoaXMudHJlZSA9IHRyZWUgO1xufSA7XG5cbkhlYXAucHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIHRoaXMudHJlZS5lbXB0eSggKSA7XG59IDtcblxuSGVhcC5wcm90b3R5cGUubWF4S2V5ID1cbkhlYXAucHJvdG90eXBlLm1lYXN1cmUgPSBmdW5jdGlvbiAoICkge1xuXHRyZXR1cm4gdGhpcy50cmVlLm1lYXN1cmUoICkgO1xufSA7XG5cbkhlYXAucHJvdG90eXBlLmluc2VydCA9XG5IZWFwLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblx0cmV0dXJuIG5ldyBIZWFwKCB0aGlzLnRyZWUucHVzaCggdmFsdWUgKSApIDtcbn0gO1xuXG5IZWFwLnByb3RvdHlwZS5leHRyYWN0TWF4ID0gZnVuY3Rpb24gKCApIHtcblx0Y29uc3QgdWIgPSB0aGlzLm1lYXN1cmUoICkgO1xuXHRjb25zdCBzcGxpdCA9IHRoaXMudHJlZS5zcGxpdFRyZWUoICggbSApID0+IG0gPj0gdWIgLCBtYXguemVybyggKSApIDtcblx0cmV0dXJuIFsgc3BsaXQubWlkZGxlICwgbmV3IEhlYXAoIHNwbGl0LmxlZnQuY29uY2F0KCBzcGxpdC5yaWdodCApICkgXSA7XG59IDtcblxuSGVhcC5wcm90b3R5cGUuaW5zZXJ0VmFsdWVzID0gZnVuY3Rpb24gKCB2YWx1ZXMgKSB7XG5cblx0bGV0IHMgPSB0aGlzIDtcblxuXHRmb3IgKCBjb25zdCB2YWx1ZSBvZiB2YWx1ZXMgKSBzID0gcy5pbnNlcnQoIHZhbHVlICkgO1xuXG5cdHJldHVybiBzIDtcblxufSA7XG5cbnJldHVybiB7XG5cdGVtcHR5IDogKCApID0+IG5ldyBIZWFwKCBlbXB0eSggbWF4ICkgKSAsXG5cdGZyb20gOiAoIGl0ZXJhYmxlICkgPT4gbmV3IEhlYXAoIGVtcHR5KCBtYXggKSApLmluc2VydFZhbHVlcyggaXRlcmFibGUgKVxufSA7XG5cbn1cbiJdfQ==