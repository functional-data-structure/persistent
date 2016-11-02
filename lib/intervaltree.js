"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function intervaltree(_empty, M) {

	var atleast = function atleast(k, _ref) {
		var _ref2 = _slicedToArray(_ref, 2),
		    _ = _ref2[0],
		    n = _ref2[1];

		return k <= n;
	};

	var greater = function greater(k, _ref3) {
		var _ref4 = _slicedToArray(_ref3, 2),
		    n = _ref4[0],
		    _ = _ref4[1];

		return n > k;
	};

	var matches = regeneratorRuntime.mark(function matches(low, tree) {
		var xs;
		return regeneratorRuntime.wrap(function matches$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						xs = tree.dropUntil(function (m) {
							return atleast(low, m);
						});

						if (!xs.empty()) {
							_context.next = 3;
							break;
						}

						return _context.abrupt("return");

					case 3:
						_context.next = 5;
						return xs.head();

					case 5:
						return _context.delegateYield(matches(low, xs.tail()), "t0", 6);

					case 6:
					case "end":
						return _context.stop();
				}
			}
		}, matches, this);
	});

	var IntervalTree = function IntervalTree(tree) {
		this.tree = tree;
	};

	IntervalTree.prototype.empty = function () {
		return this.tree.empty();
	};

	IntervalTree.prototype.measure = function () {
		return this.tree.measure();
	};

	IntervalTree.prototype.head = function () {
		return this.tree.head();
	};

	IntervalTree.prototype.tail = function () {
		return new IntervalTree(this.tree.tail());
	};

	IntervalTree.prototype.last = function () {
		return this.tree.last();
	};

	IntervalTree.prototype.init = function () {
		return new IntervalTree(this.tree.init());
	};

	IntervalTree.prototype.takeUntil = function (predicate) {
		return new IntervalTree(this.tree.takeUntil(predicate));
	};

	IntervalTree.prototype.dropUntil = function (predicate) {
		return new IntervalTree(this.tree.dropUntil(predicate));
	};

	IntervalTree.prototype.split = function (predicate) {
		var _tree$split = this.tree.split(predicate),
		    _tree$split2 = _slicedToArray(_tree$split, 2),
		    left = _tree$split2[0],
		    right = _tree$split2[1];

		return [new IntervalTree(left), new IntervalTree(right)];
	};

	IntervalTree.prototype[Symbol.iterator] = function () {
		return this.tree[Symbol.iterator]();
	};

	IntervalTree.prototype.insert = function (interval) {
		var k = M.measure(interval)[0];

		var _tree$split3 = this.tree.split(function (m) {
			return m[0] >= k;
		}),
		    _tree$split4 = _slicedToArray(_tree$split3, 2),
		    left = _tree$split4[0],
		    right = _tree$split4[1];

		return new IntervalTree(left.push(interval).concat(right));
	};

	IntervalTree.prototype.merge = function (other) {

		if (other.empty()) return this;

		var a = other.head();
		var k = M.measure(a)[0];

		var _split = this.split(function (m) {
			return m[0] > k;
		}),
		    _split2 = _slicedToArray(_split, 2),
		    l = _split2[0],
		    r = _split2[1];

		return new IntervalTree(l.tree.push(a).concat(r.merge(other.tail()).tree));
	};

	IntervalTree.prototype.insertValues = function (values) {

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

	IntervalTree.prototype.intervalSearch = function (interval) {

		if (!atleast(interval[0], this.measure())) return null;

		var k = M.measure(interval)[0];

		var _tree$splitTree = this.tree.splitTree(function (m) {
			return atleast(k, m);
		}, M.zero()),
		    middle = _tree$splitTree.middle;

		return middle[0] > interval[1] ? null : middle;
	};

	IntervalTree.prototype.intervalMatch = function (interval) {

		var k = M.measure(interval)[1];
		return matches(interval[0], this.tree.takeUntil(function (m) {
			return greater(k, m);
		}));
	};

	return {
		empty: function empty() {
			return new IntervalTree(_empty(M));
		},
		from: function from(iterable) {
			return new IntervalTree(_empty(M)).insertValues(iterable);
		}
	};
}
exports.intervaltree = intervaltree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnRlcnZhbHRyZWUuanMiXSwibmFtZXMiOlsiaW50ZXJ2YWx0cmVlIiwiZW1wdHkiLCJNIiwiYXRsZWFzdCIsImsiLCJfIiwibiIsImdyZWF0ZXIiLCJtYXRjaGVzIiwibG93IiwidHJlZSIsInhzIiwiZHJvcFVudGlsIiwibSIsImhlYWQiLCJ0YWlsIiwiSW50ZXJ2YWxUcmVlIiwicHJvdG90eXBlIiwibWVhc3VyZSIsImxhc3QiLCJpbml0IiwidGFrZVVudGlsIiwicHJlZGljYXRlIiwic3BsaXQiLCJsZWZ0IiwicmlnaHQiLCJTeW1ib2wiLCJpdGVyYXRvciIsImluc2VydCIsImludGVydmFsIiwicHVzaCIsImNvbmNhdCIsIm1lcmdlIiwib3RoZXIiLCJhIiwibCIsInIiLCJpbnNlcnRWYWx1ZXMiLCJ2YWx1ZXMiLCJzIiwidmFsdWUiLCJpbnRlcnZhbFNlYXJjaCIsInNwbGl0VHJlZSIsInplcm8iLCJtaWRkbGUiLCJpbnRlcnZhbE1hdGNoIiwiZnJvbSIsIml0ZXJhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNPLFNBQVNBLFlBQVQsQ0FBd0JDLE1BQXhCLEVBQWdDQyxDQUFoQyxFQUFvQzs7QUFFM0MsS0FBTUMsVUFBVSxTQUFWQSxPQUFVLENBQVdDLENBQVgsUUFBMkI7QUFBQTtBQUFBLE1BQVZDLENBQVU7QUFBQSxNQUFOQyxDQUFNOztBQUMxQyxTQUFPRixLQUFLRSxDQUFaO0FBQ0EsRUFGRDs7QUFJQSxLQUFNQyxVQUFVLFNBQVZBLE9BQVUsQ0FBV0gsQ0FBWCxTQUEyQjtBQUFBO0FBQUEsTUFBVkUsQ0FBVTtBQUFBLE1BQU5ELENBQU07O0FBQzFDLFNBQU9DLElBQUlGLENBQVg7QUFDQSxFQUZEOztBQUlBLEtBQU1JLGtDQUFVLFNBQVZBLE9BQVUsQ0FBWUMsR0FBWixFQUFrQkMsSUFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRVRDLFFBRlMsR0FFSkQsS0FBS0UsU0FBTCxDQUFnQixVQUFFQyxDQUFGO0FBQUEsY0FBU1YsUUFBU00sR0FBVCxFQUFlSSxDQUFmLENBQVQ7QUFBQSxPQUFoQixDQUZJOztBQUFBLFdBSVZGLEdBQUdWLEtBQUgsRUFKVTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUEsYUFNVFUsR0FBR0csSUFBSCxFQU5TOztBQUFBO0FBQUEsb0NBUVJOLFFBQVNDLEdBQVQsRUFBZUUsR0FBR0ksSUFBSCxFQUFmLENBUlE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQVZQLE9BQVU7QUFBQSxFQUFWLENBQU47O0FBWUEsS0FBTVEsZUFBZSxTQUFmQSxZQUFlLENBQVdOLElBQVgsRUFBa0I7QUFDdEMsT0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsRUFGRDs7QUFJQU0sY0FBYUMsU0FBYixDQUF1QmhCLEtBQXZCLEdBQStCLFlBQWE7QUFDM0MsU0FBTyxLQUFLUyxJQUFMLENBQVVULEtBQVYsRUFBUDtBQUNBLEVBRkQ7O0FBSUFlLGNBQWFDLFNBQWIsQ0FBdUJDLE9BQXZCLEdBQWlDLFlBQWE7QUFDN0MsU0FBTyxLQUFLUixJQUFMLENBQVVRLE9BQVYsRUFBUDtBQUNBLEVBRkQ7O0FBSUFGLGNBQWFDLFNBQWIsQ0FBdUJILElBQXZCLEdBQThCLFlBQWE7QUFDMUMsU0FBTyxLQUFLSixJQUFMLENBQVVJLElBQVYsRUFBUDtBQUNBLEVBRkQ7O0FBSUFFLGNBQWFDLFNBQWIsQ0FBdUJGLElBQXZCLEdBQThCLFlBQWE7QUFDMUMsU0FBTyxJQUFJQyxZQUFKLENBQWtCLEtBQUtOLElBQUwsQ0FBVUssSUFBVixFQUFsQixDQUFQO0FBQ0EsRUFGRDs7QUFJQUMsY0FBYUMsU0FBYixDQUF1QkUsSUFBdkIsR0FBOEIsWUFBYTtBQUMxQyxTQUFPLEtBQUtULElBQUwsQ0FBVVMsSUFBVixFQUFQO0FBQ0EsRUFGRDs7QUFJQUgsY0FBYUMsU0FBYixDQUF1QkcsSUFBdkIsR0FBOEIsWUFBYTtBQUMxQyxTQUFPLElBQUlKLFlBQUosQ0FBa0IsS0FBS04sSUFBTCxDQUFVVSxJQUFWLEVBQWxCLENBQVA7QUFDQSxFQUZEOztBQUlBSixjQUFhQyxTQUFiLENBQXVCSSxTQUF2QixHQUFtQyxVQUFXQyxTQUFYLEVBQXVCO0FBQ3pELFNBQU8sSUFBSU4sWUFBSixDQUFrQixLQUFLTixJQUFMLENBQVVXLFNBQVYsQ0FBcUJDLFNBQXJCLENBQWxCLENBQVA7QUFDQSxFQUZEOztBQUlBTixjQUFhQyxTQUFiLENBQXVCTCxTQUF2QixHQUFtQyxVQUFXVSxTQUFYLEVBQXVCO0FBQ3pELFNBQU8sSUFBSU4sWUFBSixDQUFrQixLQUFLTixJQUFMLENBQVVFLFNBQVYsQ0FBcUJVLFNBQXJCLENBQWxCLENBQVA7QUFDQSxFQUZEOztBQUlBTixjQUFhQyxTQUFiLENBQXVCTSxLQUF2QixHQUErQixVQUFXRCxTQUFYLEVBQXVCO0FBQUEsb0JBQzVCLEtBQUtaLElBQUwsQ0FBVWEsS0FBVixDQUFpQkQsU0FBakIsQ0FENEI7QUFBQTtBQUFBLE1BQzdDRSxJQUQ2QztBQUFBLE1BQ3RDQyxLQURzQzs7QUFFckQsU0FBTyxDQUFFLElBQUlULFlBQUosQ0FBa0JRLElBQWxCLENBQUYsRUFBNkIsSUFBSVIsWUFBSixDQUFrQlMsS0FBbEIsQ0FBN0IsQ0FBUDtBQUNBLEVBSEQ7O0FBS0FULGNBQWFDLFNBQWIsQ0FBdUJTLE9BQU9DLFFBQTlCLElBQTBDLFlBQWE7QUFDdEQsU0FBTyxLQUFLakIsSUFBTCxDQUFVZ0IsT0FBT0MsUUFBakIsR0FBUDtBQUNBLEVBRkQ7O0FBSUFYLGNBQWFDLFNBQWIsQ0FBdUJXLE1BQXZCLEdBQWdDLFVBQVdDLFFBQVgsRUFBc0I7QUFDckQsTUFBTXpCLElBQUlGLEVBQUVnQixPQUFGLENBQVdXLFFBQVgsRUFBc0IsQ0FBdEIsQ0FBVjs7QUFEcUQscUJBRTVCLEtBQUtuQixJQUFMLENBQVVhLEtBQVYsQ0FBaUIsVUFBRVYsQ0FBRjtBQUFBLFVBQVNBLEVBQUUsQ0FBRixLQUFRVCxDQUFqQjtBQUFBLEdBQWpCLENBRjRCO0FBQUE7QUFBQSxNQUU3Q29CLElBRjZDO0FBQUEsTUFFdENDLEtBRnNDOztBQUdyRCxTQUFPLElBQUlULFlBQUosQ0FBa0JRLEtBQUtNLElBQUwsQ0FBV0QsUUFBWCxFQUFzQkUsTUFBdEIsQ0FBOEJOLEtBQTlCLENBQWxCLENBQVA7QUFDQSxFQUpEOztBQU1BVCxjQUFhQyxTQUFiLENBQXVCZSxLQUF2QixHQUErQixVQUFXQyxLQUFYLEVBQW1COztBQUVqRCxNQUFLQSxNQUFNaEMsS0FBTixFQUFMLEVBQXNCLE9BQU8sSUFBUDs7QUFFdEIsTUFBTWlDLElBQUlELE1BQU1uQixJQUFOLEVBQVY7QUFDQSxNQUFNVixJQUFJRixFQUFFZ0IsT0FBRixDQUFXZ0IsQ0FBWCxFQUFlLENBQWYsQ0FBVjs7QUFMaUQsZUFPL0IsS0FBS1gsS0FBTCxDQUFZLFVBQUVWLENBQUY7QUFBQSxVQUFTQSxFQUFFLENBQUYsSUFBT1QsQ0FBaEI7QUFBQSxHQUFaLENBUCtCO0FBQUE7QUFBQSxNQU96QytCLENBUHlDO0FBQUEsTUFPckNDLENBUHFDOztBQVNqRCxTQUFPLElBQUlwQixZQUFKLENBQWtCbUIsRUFBRXpCLElBQUYsQ0FBT29CLElBQVAsQ0FBYUksQ0FBYixFQUFpQkgsTUFBakIsQ0FBeUJLLEVBQUVKLEtBQUYsQ0FBU0MsTUFBTWxCLElBQU4sRUFBVCxFQUF5QkwsSUFBbEQsQ0FBbEIsQ0FBUDtBQUVBLEVBWEQ7O0FBYUFNLGNBQWFDLFNBQWIsQ0FBdUJvQixZQUF2QixHQUFzQyxVQUFXQyxNQUFYLEVBQW9COztBQUV6RCxNQUFJQyxJQUFJLElBQVI7O0FBRnlEO0FBQUE7QUFBQTs7QUFBQTtBQUl6RCx3QkFBcUJELE1BQXJCO0FBQUEsUUFBWUUsS0FBWjtBQUE4QkQsUUFBSUEsRUFBRVgsTUFBRixDQUFVWSxLQUFWLENBQUo7QUFBOUI7QUFKeUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNekQsU0FBT0QsQ0FBUDtBQUVBLEVBUkQ7O0FBVUF2QixjQUFhQyxTQUFiLENBQXVCd0IsY0FBdkIsR0FBd0MsVUFBV1osUUFBWCxFQUFzQjs7QUFFN0QsTUFBSyxDQUFDMUIsUUFBUzBCLFNBQVMsQ0FBVCxDQUFULEVBQXVCLEtBQUtYLE9BQUwsRUFBdkIsQ0FBTixFQUFpRCxPQUFPLElBQVA7O0FBRWpELE1BQU1kLElBQUlGLEVBQUVnQixPQUFGLENBQVdXLFFBQVgsRUFBc0IsQ0FBdEIsQ0FBVjs7QUFKNkQsd0JBTTFDLEtBQUtuQixJQUFMLENBQVVnQyxTQUFWLENBQXFCLFVBQUU3QixDQUFGO0FBQUEsVUFBU1YsUUFBU0MsQ0FBVCxFQUFhUyxDQUFiLENBQVQ7QUFBQSxHQUFyQixFQUFpRFgsRUFBRXlDLElBQUYsRUFBakQsQ0FOMEM7QUFBQSxNQU1yREMsTUFOcUQsbUJBTXJEQSxNQU5xRDs7QUFRN0QsU0FBT0EsT0FBTyxDQUFQLElBQVlmLFNBQVMsQ0FBVCxDQUFaLEdBQTBCLElBQTFCLEdBQWlDZSxNQUF4QztBQUVBLEVBVkQ7O0FBWUE1QixjQUFhQyxTQUFiLENBQXVCNEIsYUFBdkIsR0FBdUMsVUFBV2hCLFFBQVgsRUFBc0I7O0FBRTVELE1BQU16QixJQUFJRixFQUFFZ0IsT0FBRixDQUFXVyxRQUFYLEVBQXNCLENBQXRCLENBQVY7QUFDQSxTQUFPckIsUUFBU3FCLFNBQVMsQ0FBVCxDQUFULEVBQXVCLEtBQUtuQixJQUFMLENBQVVXLFNBQVYsQ0FBcUIsVUFBRVIsQ0FBRjtBQUFBLFVBQVNOLFFBQVNILENBQVQsRUFBYVMsQ0FBYixDQUFUO0FBQUEsR0FBckIsQ0FBdkIsQ0FBUDtBQUVBLEVBTEQ7O0FBUUEsUUFBTztBQUNOWixTQUFRO0FBQUEsVUFBTyxJQUFJZSxZQUFKLENBQWtCZixPQUFPQyxDQUFQLENBQWxCLENBQVA7QUFBQSxHQURGO0FBRU40QyxRQUFPLGNBQUVDLFFBQUY7QUFBQSxVQUFnQixJQUFJL0IsWUFBSixDQUFrQmYsT0FBT0MsQ0FBUCxDQUFsQixFQUErQm1DLFlBQS9CLENBQTZDVSxRQUE3QyxDQUFoQjtBQUFBO0FBRkQsRUFBUDtBQUtDIiwiZmlsZSI6ImludGVydmFsdHJlZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGZ1bmN0aW9uIGludGVydmFsdHJlZSAoIGVtcHR5ICwgTSApIHtcblxuY29uc3QgYXRsZWFzdCA9IGZ1bmN0aW9uICggayAsIFsgXyAsIG4gXSApIHtcblx0cmV0dXJuIGsgPD0gbiA7XG59IDtcblxuY29uc3QgZ3JlYXRlciA9IGZ1bmN0aW9uICggayAsIFsgbiAsIF8gXSApIHtcblx0cmV0dXJuIG4gPiBrIDtcbn0gO1xuXG5jb25zdCBtYXRjaGVzID0gZnVuY3Rpb24qICggbG93ICwgdHJlZSApIHtcblxuXHRjb25zdCB4cyA9IHRyZWUuZHJvcFVudGlsKCAoIG0gKSA9PiBhdGxlYXN0KCBsb3cgLCBtICkgKSA7XG5cblx0aWYgKCB4cy5lbXB0eSggKSApIHJldHVybiA7XG5cblx0eWllbGQgeHMuaGVhZCggKSA7XG5cblx0eWllbGQqIG1hdGNoZXMoIGxvdyAsIHhzLnRhaWwoICkgKSA7XG5cbn0gO1xuXG5jb25zdCBJbnRlcnZhbFRyZWUgPSBmdW5jdGlvbiAoIHRyZWUgKSB7XG5cdHRoaXMudHJlZSA9IHRyZWUgO1xufSA7XG5cbkludGVydmFsVHJlZS5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbiAoICkge1xuXHRyZXR1cm4gdGhpcy50cmVlLmVtcHR5KCApIDtcbn0gO1xuXG5JbnRlcnZhbFRyZWUucHJvdG90eXBlLm1lYXN1cmUgPSBmdW5jdGlvbiAoICkge1xuXHRyZXR1cm4gdGhpcy50cmVlLm1lYXN1cmUoICkgO1xufSA7XG5cbkludGVydmFsVHJlZS5wcm90b3R5cGUuaGVhZCA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiB0aGlzLnRyZWUuaGVhZCggKSA7XG59IDtcblxuSW50ZXJ2YWxUcmVlLnByb3RvdHlwZS50YWlsID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIG5ldyBJbnRlcnZhbFRyZWUoIHRoaXMudHJlZS50YWlsKCApICkgO1xufSA7XG5cbkludGVydmFsVHJlZS5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiB0aGlzLnRyZWUubGFzdCggKSA7XG59IDtcblxuSW50ZXJ2YWxUcmVlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIG5ldyBJbnRlcnZhbFRyZWUoIHRoaXMudHJlZS5pbml0KCApICkgO1xufSA7XG5cbkludGVydmFsVHJlZS5wcm90b3R5cGUudGFrZVVudGlsID0gZnVuY3Rpb24gKCBwcmVkaWNhdGUgKSB7XG5cdHJldHVybiBuZXcgSW50ZXJ2YWxUcmVlKCB0aGlzLnRyZWUudGFrZVVudGlsKCBwcmVkaWNhdGUgKSApIDtcbn0gO1xuXG5JbnRlcnZhbFRyZWUucHJvdG90eXBlLmRyb3BVbnRpbCA9IGZ1bmN0aW9uICggcHJlZGljYXRlICkge1xuXHRyZXR1cm4gbmV3IEludGVydmFsVHJlZSggdGhpcy50cmVlLmRyb3BVbnRpbCggcHJlZGljYXRlICkgKSA7XG59IDtcblxuSW50ZXJ2YWxUcmVlLnByb3RvdHlwZS5zcGxpdCA9IGZ1bmN0aW9uICggcHJlZGljYXRlICkge1xuXHRjb25zdCBbIGxlZnQgLCByaWdodCBdID0gdGhpcy50cmVlLnNwbGl0KCBwcmVkaWNhdGUgKSA7XG5cdHJldHVybiBbIG5ldyBJbnRlcnZhbFRyZWUoIGxlZnQgKSAsIG5ldyBJbnRlcnZhbFRyZWUoIHJpZ2h0ICkgXSA7XG59IDtcblxuSW50ZXJ2YWxUcmVlLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIHRoaXMudHJlZVtTeW1ib2wuaXRlcmF0b3JdKCApIDtcbn0gO1xuXG5JbnRlcnZhbFRyZWUucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uICggaW50ZXJ2YWwgKSB7XG5cdGNvbnN0IGsgPSBNLm1lYXN1cmUoIGludGVydmFsIClbMF0gO1xuXHRjb25zdCBbIGxlZnQgLCByaWdodCBdID0gdGhpcy50cmVlLnNwbGl0KCAoIG0gKSA9PiBtWzBdID49IGsgKSA7XG5cdHJldHVybiBuZXcgSW50ZXJ2YWxUcmVlKCBsZWZ0LnB1c2goIGludGVydmFsICkuY29uY2F0KCByaWdodCApICkgO1xufSA7XG5cbkludGVydmFsVHJlZS5wcm90b3R5cGUubWVyZ2UgPSBmdW5jdGlvbiAoIG90aGVyICkge1xuXG5cdGlmICggb3RoZXIuZW1wdHkoICkgKSByZXR1cm4gdGhpcyA7XG5cblx0Y29uc3QgYSA9IG90aGVyLmhlYWQoICkgO1xuXHRjb25zdCBrID0gTS5tZWFzdXJlKCBhIClbMF0gO1xuXG5cdGNvbnN0IFsgbCAsIHIgXSA9IHRoaXMuc3BsaXQoICggbSApID0+IG1bMF0gPiBrICkgO1xuXG5cdHJldHVybiBuZXcgSW50ZXJ2YWxUcmVlKCBsLnRyZWUucHVzaCggYSApLmNvbmNhdCggci5tZXJnZSggb3RoZXIudGFpbCggKSApLnRyZWUgKSApIDtcblxufSA7XG5cbkludGVydmFsVHJlZS5wcm90b3R5cGUuaW5zZXJ0VmFsdWVzID0gZnVuY3Rpb24gKCB2YWx1ZXMgKSB7XG5cblx0bGV0IHMgPSB0aGlzIDtcblxuXHRmb3IgKCBjb25zdCB2YWx1ZSBvZiB2YWx1ZXMgKSBzID0gcy5pbnNlcnQoIHZhbHVlICkgO1xuXG5cdHJldHVybiBzIDtcblxufSA7XG5cbkludGVydmFsVHJlZS5wcm90b3R5cGUuaW50ZXJ2YWxTZWFyY2ggPSBmdW5jdGlvbiAoIGludGVydmFsICkge1xuXG5cdGlmICggIWF0bGVhc3QoIGludGVydmFsWzBdICwgdGhpcy5tZWFzdXJlKCApICkgKSByZXR1cm4gbnVsbCA7XG5cblx0Y29uc3QgayA9IE0ubWVhc3VyZSggaW50ZXJ2YWwgKVswXSA7XG5cblx0Y29uc3QgeyBtaWRkbGUgfSA9IHRoaXMudHJlZS5zcGxpdFRyZWUoICggbSApID0+IGF0bGVhc3QoIGsgLCBtICkgLCBNLnplcm8oICkgKSA7XG5cblx0cmV0dXJuIG1pZGRsZVswXSA+IGludGVydmFsWzFdID8gbnVsbCA6IG1pZGRsZSA7XG5cbn0gO1xuXG5JbnRlcnZhbFRyZWUucHJvdG90eXBlLmludGVydmFsTWF0Y2ggPSBmdW5jdGlvbiAoIGludGVydmFsICkge1xuXG5cdGNvbnN0IGsgPSBNLm1lYXN1cmUoIGludGVydmFsIClbMV0gO1xuXHRyZXR1cm4gbWF0Y2hlcyggaW50ZXJ2YWxbMF0gLCB0aGlzLnRyZWUudGFrZVVudGlsKCAoIG0gKSA9PiBncmVhdGVyKCBrICwgbSApICkgKSA7XG5cbn0gO1xuXG5cbnJldHVybiB7XG5cdGVtcHR5IDogKCApID0+IG5ldyBJbnRlcnZhbFRyZWUoIGVtcHR5KCBNICkgKSAsXG5cdGZyb20gOiAoIGl0ZXJhYmxlICkgPT4gbmV3IEludGVydmFsVHJlZSggZW1wdHkoIE0gKSApLmluc2VydFZhbHVlcyggaXRlcmFibGUgKVxufSA7XG5cbn1cbiJdfQ==