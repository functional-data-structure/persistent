"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function indordseq(_empty, key, size, measure) {

	// probably needs a total order instead of a measure
	// this causes generality problems in the insert, merge, partition and delete
	// methods

	var IndOrdSeq = function IndOrdSeq(tree) {
		this.tree = tree;
	};

	IndOrdSeq.prototype.empty = function () {
		return this.tree.empty();
	};

	IndOrdSeq.prototype.measure = function () {
		return this.tree.measure();
	};

	IndOrdSeq.prototype.min = IndOrdSeq.prototype.head = function () {
		return this.tree.head();
	};

	IndOrdSeq.prototype.tail = function () {
		return new IndOrdSeq(this.tree.tail());
	};

	IndOrdSeq.prototype.max = IndOrdSeq.prototype.last = function () {
		return this.tree.last();
	};

	IndOrdSeq.prototype.init = function () {
		return new IndOrdSeq(this.tree.init());
	};

	IndOrdSeq.prototype.takeUntil = function (predicate) {
		return new IndOrdSeq(this.tree.takeUntil(predicate));
	};

	IndOrdSeq.prototype.dropUntil = function (predicate) {
		return new IndOrdSeq(this.tree.dropUntil(predicate));
	};

	IndOrdSeq.prototype[Symbol.iterator] = function () {
		return this.tree[Symbol.iterator]();
	};

	IndOrdSeq.prototype.split = function (predicate) {
		var _tree$split = this.tree.split(predicate),
		    _tree$split2 = _slicedToArray(_tree$split, 2),
		    left = _tree$split2[0],
		    right = _tree$split2[1];

		return [new IndOrdSeq(left), new IndOrdSeq(right)];
	};

	IndOrdSeq.prototype.partition = function (value) {
		var k = key.measure(value);
		return this.split(function (m) {
			return m[0] >= k;
		});
	};

	IndOrdSeq.prototype.insert = function (value) {
		var k = key.measure(value);

		var _tree$split3 = this.tree.split(function (m) {
			return m[0] >= k;
		}),
		    _tree$split4 = _slicedToArray(_tree$split3, 2),
		    left = _tree$split4[0],
		    right = _tree$split4[1];

		return new IndOrdSeq(left.push(value).concat(right));
	};

	IndOrdSeq.prototype.deleteAll = function (value) {
		var k = key.measure(value);

		var _tree$split5 = this.tree.split(function (m) {
			return m[0] >= k;
		}),
		    _tree$split6 = _slicedToArray(_tree$split5, 2),
		    l = _tree$split6[0],
		    r = _tree$split6[1];

		var _r$split = r.split(function (m) {
			return m[0] > k;
		}),
		    _r$split2 = _slicedToArray(_r$split, 2),
		    _ = _r$split2[0],
		    R = _r$split2[1];

		return new IndOrdSeq(l.concat(R));
	};

	IndOrdSeq.prototype.merge = function (other) {

		if (other.empty()) return this;

		var a = other.head();
		var k = key.measure(a);

		var _split = this.split(function (m) {
			return m[0] > k;
		}),
		    _split2 = _slicedToArray(_split, 2),
		    l = _split2[0],
		    r = _split2[1];

		return new IndOrdSeq(l.tree.push(a).concat(r.merge(other.tail()).tree));
	};

	IndOrdSeq.prototype.insertValues = function (values) {

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

	IndOrdSeq.prototype.len = function () {
		return this.tree.measure()[1];
	};

	IndOrdSeq.prototype.get = function (index) {

		if (index < 0 || index >= this.len()) throw new Error("wrong index '" + index + "'");

		return this.tree.splitTree(function (m) {
			return m[1] > index;
		}, size.zero()).middle;
	};

	IndOrdSeq.prototype.splitAt = function (index) {
		return this.split(function (m) {
			return m[1] > index;
		});
	};

	return {
		empty: function empty() {
			return new IndOrdSeq(_empty(measure));
		},
		from: function from(iterable) {
			return new IndOrdSeq(_empty(measure)).insertValues(iterable);
		}
	};
}
exports.indordseq = indordseq;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRvcmRzZXEuanMiXSwibmFtZXMiOlsiaW5kb3Jkc2VxIiwiZW1wdHkiLCJrZXkiLCJzaXplIiwibWVhc3VyZSIsIkluZE9yZFNlcSIsInRyZWUiLCJwcm90b3R5cGUiLCJtaW4iLCJoZWFkIiwidGFpbCIsIm1heCIsImxhc3QiLCJpbml0IiwidGFrZVVudGlsIiwicHJlZGljYXRlIiwiZHJvcFVudGlsIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJzcGxpdCIsImxlZnQiLCJyaWdodCIsInBhcnRpdGlvbiIsInZhbHVlIiwiayIsIm0iLCJpbnNlcnQiLCJwdXNoIiwiY29uY2F0IiwiZGVsZXRlQWxsIiwibCIsInIiLCJfIiwiUiIsIm1lcmdlIiwib3RoZXIiLCJhIiwiaW5zZXJ0VmFsdWVzIiwidmFsdWVzIiwicyIsImxlbiIsImdldCIsImluZGV4IiwiRXJyb3IiLCJzcGxpdFRyZWUiLCJ6ZXJvIiwibWlkZGxlIiwic3BsaXRBdCIsImZyb20iLCJpdGVyYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDTyxTQUFTQSxTQUFULENBQXFCQyxNQUFyQixFQUE2QkMsR0FBN0IsRUFBbUNDLElBQW5DLEVBQTBDQyxPQUExQyxFQUFvRDs7QUFFM0Q7QUFDQTtBQUNBOztBQUVBLEtBQU1DLFlBQVksU0FBWkEsU0FBWSxDQUFXQyxJQUFYLEVBQWtCO0FBQ25DLE9BQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLEVBRkQ7O0FBSUFELFdBQVVFLFNBQVYsQ0FBb0JOLEtBQXBCLEdBQTRCLFlBQWE7QUFDeEMsU0FBTyxLQUFLSyxJQUFMLENBQVVMLEtBQVYsRUFBUDtBQUNBLEVBRkQ7O0FBSUFJLFdBQVVFLFNBQVYsQ0FBb0JILE9BQXBCLEdBQThCLFlBQWE7QUFDMUMsU0FBTyxLQUFLRSxJQUFMLENBQVVGLE9BQVYsRUFBUDtBQUNBLEVBRkQ7O0FBSUFDLFdBQVVFLFNBQVYsQ0FBb0JDLEdBQXBCLEdBQ0FILFVBQVVFLFNBQVYsQ0FBb0JFLElBQXBCLEdB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RUFSRDs7QUFVQWxDLFdBQVVFLFNBQVYsQ0FBb0JpQyxHQUFwQixHQUEwQixZQUFhO0FBQ3RDLFNBQU8sS0FBS2xDLElBQUwsQ0FBVUYsT0FBVixHQUFxQixDQUFyQixDQUFQO0FBQ0EsRUFGRDs7QUFJQUMsV0FBVUUsU0FBVixDQUFvQmtDLEdBQXBCLEdBQTBCLFVBQVdDLEtBQVgsRUFBbUI7O0FBRTVDLE1BQUtBLFFBQVEsQ0FBUixJQUFhQSxTQUFTLEtBQUtGLEdBQUwsRUFBM0IsRUFBeUMsTUFBTSxJQUFJRyxLQUFKLG1CQUEyQkQsS0FBM0IsT0FBTjs7QUFFekMsU0FBTyxLQUFLcEMsSUFBTCxDQUFVc0MsU0FBVixDQUFxQjtBQUFBLFVBQUtuQixFQUFFLENBQUYsSUFBT2lCLEtBQVo7QUFBQSxHQUFyQixFQUF5Q3ZDLEtBQUswQyxJQUFMLEVBQXpDLEVBQXdEQyxNQUEvRDtBQUVBLEVBTkQ7O0FBUUF6QyxXQUFVRSxTQUFWLENBQW9Cd0MsT0FBcEIsR0FBOEIsVUFBV0wsS0FBWCxFQUFtQjtBQUNoRCxTQUFPLEtBQUt2QixLQUFMLENBQVk7QUFBQSxVQUFLTSxFQUFFLENBQUYsSUFBT2lCLEtBQVo7QUFBQSxHQUFaLENBQVA7QUFDQSxFQUZEOztBQUlBLFFBQU87QUFDTnpDLFNBQVE7QUFBQSxVQUFPLElBQUlJLFNBQUosQ0FBZUosT0FBT0csT0FBUCxDQUFmLENBQVA7QUFBQSxHQURGO0FBRU40QyxRQUFPLGNBQUVDLFFBQUY7QUFBQSxVQUFnQixJQUFJNUMsU0FBSixDQUFlSixPQUFPRyxPQUFQLENBQWYsRUFBa0NpQyxZQUFsQyxDQUFnRFksUUFBaEQsQ0FBaEI7QUFBQTtBQUZELEVBQVA7QUFLQyIsImZpbGUiOiJpbmRvcmRzZXEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBmdW5jdGlvbiBpbmRvcmRzZXEgKCBlbXB0eSAsIGtleSAsIHNpemUgLCBtZWFzdXJlICkge1xuXG4vLyBwcm9iYWJseSBuZWVkcyBhIHRvdGFsIG9yZGVyIGluc3RlYWQgb2YgYSBtZWFzdXJlXG4vLyB0aGlzIGNhdXNlcyBnZW5lcmFsaXR5IHByb2JsZW1zIGluIHRoZSBpbnNlcnQsIG1lcmdlLCBwYXJ0aXRpb24gYW5kIGRlbGV0ZVxuLy8gbWV0aG9kc1xuXG5jb25zdCBJbmRPcmRTZXEgPSBmdW5jdGlvbiAoIHRyZWUgKSB7XG5cdHRoaXMudHJlZSA9IHRyZWUgO1xufSA7XG5cbkluZE9yZFNlcS5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbiAoICkge1xuXHRyZXR1cm4gdGhpcy50cmVlLmVtcHR5KCApIDtcbn0gO1xuXG5JbmRPcmRTZXEucHJvdG90eXBlLm1lYXN1cmUgPSBmdW5jdGlvbiAoICkge1xuXHRyZXR1cm4gdGhpcy50cmVlLm1lYXN1cmUoICkgO1xufSA7XG5cbkluZE9yZFNlcS5wcm90b3R5cGUubWluID1cbkluZE9yZFNlcS5wcm90b3R5cGUuaGVhZCA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiB0aGlzLnRyZWUuaGVhZCggKSA7XG59IDtcblxuSW5kT3JkU2VxLnByb3RvdHlwZS50YWlsID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIG5ldyBJbmRPcmRTZXEoIHRoaXMudHJlZS50YWlsKCApICkgO1xufSA7XG5cbkluZE9yZFNlcS5wcm90b3R5cGUubWF4ID1cbkluZE9yZFNlcS5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiB0aGlzLnRyZWUubGFzdCggKSA7XG59IDtcblxuSW5kT3JkU2VxLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIG5ldyBJbmRPcmRTZXEoIHRoaXMudHJlZS5pbml0KCApICkgO1xufSA7XG5cbkluZE9yZFNlcS5wcm90b3R5cGUudGFrZVVudGlsID0gZnVuY3Rpb24gKCBwcmVkaWNhdGUgKSB7XG5cdHJldHVybiBuZXcgSW5kT3JkU2VxKCB0aGlzLnRyZWUudGFrZVVudGlsKCBwcmVkaWNhdGUgKSApIDtcbn0gO1xuXG5JbmRPcmRTZXEucHJvdG90eXBlLmRyb3BVbnRpbCA9IGZ1bmN0aW9uICggcHJlZGljYXRlICkge1xuXHRyZXR1cm4gbmV3IEluZE9yZFNlcSggdGhpcy50cmVlLmRyb3BVbnRpbCggcHJlZGljYXRlICkgKSA7XG59IDtcblxuSW5kT3JkU2VxLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIHRoaXMudHJlZVtTeW1ib2wuaXRlcmF0b3JdKCApIDtcbn0gO1xuXG5JbmRPcmRTZXEucHJvdG90eXBlLnNwbGl0ID0gZnVuY3Rpb24gKCBwcmVkaWNhdGUgKSB7XG5cdGNvbnN0IFsgbGVmdCAsIHJpZ2h0IF0gPSB0aGlzLnRyZWUuc3BsaXQoIHByZWRpY2F0ZSApIDtcblx0cmV0dXJuIFsgbmV3IEluZE9yZFNlcSggbGVmdCApICwgbmV3IEluZE9yZFNlcSggcmlnaHQgKSBdIDtcbn0gO1xuXG5JbmRPcmRTZXEucHJvdG90eXBlLnBhcnRpdGlvbiA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cdGNvbnN0IGsgPSBrZXkubWVhc3VyZSggdmFsdWUgKSA7XG5cdHJldHVybiB0aGlzLnNwbGl0KCBtID0+IG1bMF0gPj0gayApIDtcbn0gO1xuXG5JbmRPcmRTZXEucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cdGNvbnN0IGsgPSBrZXkubWVhc3VyZSggdmFsdWUgKSA7XG5cdGNvbnN0IFsgbGVmdCAsIHJpZ2h0IF0gPSB0aGlzLnRyZWUuc3BsaXQoIG0gPT4gbVswXSA+PSBrICkgO1xuXHRyZXR1cm4gbmV3IEluZE9yZFNlcSggbGVmdC5wdXNoKCB2YWx1ZSApLmNvbmNhdCggcmlnaHQgKSApIDtcbn0gO1xuXG5JbmRPcmRTZXEucHJvdG90eXBlLmRlbGV0ZUFsbCA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cdGNvbnN0IGsgPSBrZXkubWVhc3VyZSggdmFsdWUgKSA7XG5cdGNvbnN0IFsgbCAsIHIgXSA9IHRoaXMudHJlZS5zcGxpdCggbSA9PiBtWzBdID49IGsgKSA7XG5cdGNvbnN0IFsgXyAsIFIgXSA9IHIuc3BsaXQoIG0gPT4gbVswXSA+IGsgKSA7XG5cdHJldHVybiBuZXcgSW5kT3JkU2VxKCBsLmNvbmNhdCggUiApICkgO1xufSA7XG5cbkluZE9yZFNlcS5wcm90b3R5cGUubWVyZ2UgPSBmdW5jdGlvbiAoIG90aGVyICkge1xuXG5cdGlmICggb3RoZXIuZW1wdHkoICkgKSByZXR1cm4gdGhpcyA7XG5cblx0Y29uc3QgYSA9IG90aGVyLmhlYWQoICkgO1xuXHRjb25zdCBrID0ga2V5Lm1lYXN1cmUoIGEgKSA7XG5cblx0Y29uc3QgWyBsICwgciBdID0gdGhpcy5zcGxpdCggbSA9PiBtWzBdID4gayApIDtcblxuXHRyZXR1cm4gbmV3IEluZE9yZFNlcSggbC50cmVlLnB1c2goIGEgKS5jb25jYXQoIHIubWVyZ2UoIG90aGVyLnRhaWwoICkgKS50cmVlICkgKSA7XG5cbn0gO1xuXG5JbmRPcmRTZXEucHJvdG90eXBlLmluc2VydFZhbHVlcyA9IGZ1bmN0aW9uICggdmFsdWVzICkge1xuXG5cdGxldCBzID0gdGhpcyA7XG5cblx0Zm9yICggY29uc3QgdmFsdWUgb2YgdmFsdWVzICkgcyA9IHMuaW5zZXJ0KCB2YWx1ZSApIDtcblxuXHRyZXR1cm4gcyA7XG5cbn0gO1xuXG5JbmRPcmRTZXEucHJvdG90eXBlLmxlbiA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiB0aGlzLnRyZWUubWVhc3VyZSggKVsxXSA7XG59IDtcblxuSW5kT3JkU2VxLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoIGluZGV4ICkge1xuXG5cdGlmICggaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuKCApICkgdGhyb3cgbmV3IEVycm9yKCBgd3JvbmcgaW5kZXggJyR7aW5kZXh9J2AgKSA7XG5cblx0cmV0dXJuIHRoaXMudHJlZS5zcGxpdFRyZWUoIG0gPT4gbVsxXSA+IGluZGV4ICwgc2l6ZS56ZXJvKCApICkubWlkZGxlIDtcblxufSA7XG5cbkluZE9yZFNlcS5wcm90b3R5cGUuc3BsaXRBdCA9IGZ1bmN0aW9uICggaW5kZXggKSB7XG5cdHJldHVybiB0aGlzLnNwbGl0KCBtID0+IG1bMV0gPiBpbmRleCApIDtcbn0gO1xuXG5yZXR1cm4ge1xuXHRlbXB0eSA6ICggKSA9PiBuZXcgSW5kT3JkU2VxKCBlbXB0eSggbWVhc3VyZSApICkgLFxuXHRmcm9tIDogKCBpdGVyYWJsZSApID0+IG5ldyBJbmRPcmRTZXEoIGVtcHR5KCBtZWFzdXJlICkgKS5pbnNlcnRWYWx1ZXMoIGl0ZXJhYmxlIClcbn0gO1xuXG59XG4iXX0=