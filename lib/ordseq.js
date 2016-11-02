"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function ordseq(_empty, key) {

	// probably needs a total order instead of a key measure
	// this causes generality problems in the insert, merge, partition and delete
	// methods

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
		var _tree$split = this.tree.split(predicate),
		    _tree$split2 = _slicedToArray(_tree$split, 2),
		    left = _tree$split2[0],
		    right = _tree$split2[1];

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
		}),
		    _tree$split4 = _slicedToArray(_tree$split3, 2),
		    left = _tree$split4[0],
		    right = _tree$split4[1];

		return new OrdSeq(left.push(value).concat(right));
	};

	OrdSeq.prototype.deleteAll = function (value) {
		var k = key.measure(value);

		var _tree$split5 = this.tree.split(function (m) {
			return m >= k;
		}),
		    _tree$split6 = _slicedToArray(_tree$split5, 2),
		    l = _tree$split6[0],
		    r = _tree$split6[1];

		var _r$split = r.split(function (m) {
			return m > k;
		}),
		    _r$split2 = _slicedToArray(_r$split, 2),
		    _ = _r$split2[0],
		    R = _r$split2[1];

		return new OrdSeq(l.concat(R));
	};

	OrdSeq.prototype.merge = function (other) {

		if (other.empty()) return this;

		var a = other.head();
		var k = key.measure(a);

		var _split = this.split(function (m) {
			return m > k;
		}),
		    _split2 = _slicedToArray(_split, 2),
		    l = _split2[0],
		    r = _split2[1];

		return new OrdSeq(l.tree.push(a).concat(r.merge(other.tail()).tree));
	};

	OrdSeq.prototype.insertValues = function (values) {

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
			return new OrdSeq(_empty(key));
		},
		from: function from(iterable) {
			return new OrdSeq(_empty(key)).insertValues(iterable);
		}
	};
}
exports.ordseq = ordseq;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vcmRzZXEuanMiXSwibmFtZXMiOlsib3Jkc2VxIiwiZW1wdHkiLCJrZXkiLCJPcmRTZXEiLCJ0cmVlIiwicHJvdG90eXBlIiwibWVhc3VyZSIsIm1pbiIsImhlYWQiLCJ0YWlsIiwibWF4IiwibGFzdCIsImluaXQiLCJ0YWtlVW50aWwiLCJwcmVkaWNhdGUiLCJkcm9wVW50aWwiLCJTeW1ib2wiLCJpdGVyYXRvciIsInNwbGl0IiwibGVmdCIsInJpZ2h0IiwicGFydGl0aW9uIiwidmFsdWUiLCJrIiwibSIsImluc2VydCIsInB1c2giLCJjb25jYXQiLCJkZWxldGVBbGwiLCJsIiwiciIsIl8iLCJSIiwibWVyZ2UiLCJvdGhlciIsImEiLCJpbnNlcnRWYWx1ZXMiLCJ2YWx1ZXMiLCJzIiwiZnJvbSIsIml0ZXJhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNPLFNBQVNBLE1BQVQsQ0FBa0JDLE1BQWxCLEVBQTBCQyxHQUExQixFQUFnQzs7QUFFdkM7QUFDQTtBQUNBOztBQUVBLEtBQU1DLFNBQVMsU0FBVEEsTUFBUyxDQUFXQyxJQUFYLEVBQWtCO0FBQ2hDLE9BQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLEVBRkQ7O0FBSUFELFFBQU9FLFNBQVAsQ0FBaUJKLEtBQWpCLEdBQXlCLFlBQWE7QUFDckMsU0FBTyxLQUFLRyxJQUFMLENBQVVILEtBQVYsRUFBUDtBQUNBLEVBRkQ7O0FBSUFFLFFBQU9FLFNBQVAsQ0FBaUJDLE9BQWpCLEdBQTJCLFlBQWE7QUFDdkMsU0FBTyxLQUFLRixJQUFMLENBQVVFLE9BQVYsRUFBUDtBQUNBLEVBRkQ7O0FBSUFILFFBQU9FLFNBQVAsQ0FBaUJFLEdBQWpCLEdBQ0FKLE9BQU9FLFNBQVAsQ0FBaUJHLElBQWpCLEdBQXdCLFlBQWE7QUFDcEMsU0FBTyxLQUFLSixJQUFMLENBQVVJLElBQVYsRUFBUDtBQUNBLEVBSEQ7O0FBS0FMLFFBQU9FLFNBQVAsQ0FBaUJJLElBQWpCLEdBQXdCLFlBQWE7QUFDcEMsU0FBTyxJQUFJTixNQUFKLENBQVksS0FBS0MsSUFBTCxDQUFVSyxJQUFWLEVBQVosQ0FBUDtBQUNBLEVBRkQ7O0FBSUFOLFFBQU9FLFNBQVAsQ0FBaUJLLEdBQWpCLEdBQ0FQLE9BQU9FLFNBQVAsQ0FBaUJNLElBQWpCLEdBQXdCLFlBQWE7QUFDcEMsU0FBTyxLQUFLUCxJQUFMLENBQVVPLElBQVYsRUFBUDtBQUNBLEVBSEQ7O0FBS0FSLFFBQU9FLFNBQVAsQ0FBaUJPLElBQWpCLEdBQXdCLFlBQWE7QUFDcEMsU0FBTyxJQUFJVCxNQUFKLENBQVksS0FBS0MsSUFBTCxDQUFVUSxJQUFWLEVBQVosQ0FBUDtBQUNBLEVBRkQ7O0FBSUFULFFBQU9FLFNBQVAsQ0FBaUJRLFNBQWpCLEdBQTZCLFVBQVdDLFNBQVgsRUFBdUI7QUFDbkQsU0FBTyxJQUFJWCxNQUFKLENBQVksS0FBS0MsSUFBTCxDQUFVUyxTQUFWLENBQXFCQyxTQUFyQixDQUFaLENBQVA7QUFDQSxFQUZEOztBQUlBWCxRQUFPRSxTQUFQLENBQWlCVSxTQUFqQixHQUE2QixVQUFXRCxTQUFYLEVBQXVCO0FBQ25ELFNBQU8sSUFBSVgsTUFBSixDQUFZLEtBQUtDLElBQUwsQ0FBVVcsU0FBVixDQUFxQkQsU0FBckIsQ0FBWixDQUFQO0FBQ0EsRUFGRDs7QUFJQVgsUUFBT0UsU0FBUCxDQUFpQlcsT0FBT0MsUUFBeEIsSUFBb0MsWUFBYTtBQUNoRCxTQUFPLEtBQUtiLElBQUwsQ0FBVVksT0FBT0MsUUFBakIsR0FBUDtBQUNBLEVBRkQ7O0FBSUFkLFFBQU9FLFNBQVAsQ0FBaUJhLEtBQWpCLEdBQXlCLFVBQVdKLFNBQVgsRUFBdUI7QUFBQSxvQkFDdEIsS0FBS1YsSUFBTCxDQUFVYyxLQUFWLENBQWlCSixTQUFqQixDQURzQjtBQUFBO0FBQUEsTUFDdkNLLElBRHVDO0FBQUEsTUFDaENDLEtBRGdDOztBQUUvQyxTQUFPLENBQUUsSUFBSWpCLE1BQUosQ0FBWWdCLElBQVosQ0FBRixFQUF1QixJQUFJaEIsTUFBSixDQUFZaUIsS0FBWixDQUF2QixDQUFQO0FBQ0EsRUFIRDs7QUFLQWpCLFFBQU9FLFNBQVAsQ0FBaUJnQixTQUFqQixHQUE2QixVQUFXQyxLQUFYLEVBQW1CO0FBQy9DLE1BQU1DLElBQUlyQixJQUFJSSxPQUFKLENBQWFnQixLQUFiLENBQVY7QUFDQSxTQUFPLEtBQUtKLEtBQUwsQ0FBWSxVQUFFTSxDQUFGO0FBQUEsVUFBU0EsS0FBS0QsQ0FBZDtBQUFBLEdBQVosQ0FBUDtBQUNBLEVBSEQ7O0FBS0FwQixRQUFPRSxTQUFQLENBQWlCb0IsTUFBakIsR0FBMEIsVUFBV0gsS0FBWCxFQUFtQjtBQUM1QyxNQUFNQyxJQUFJckIsSUFBSUksT0FBSixDQUFhZ0IsS0FBYixDQUFWOztBQUQ0QyxxQkFFbkIsS0FBS2xCLElBQUwsQ0FBVWMsS0FBVixDQUFpQixVQUFFTSxDQUFGO0FBQUEsVUFBU0EsS0FBS0QsQ0FBZDtBQUFBLEdBQWpCLENBRm1CO0FBQUE7QUFBQSxNQUVwQ0osSUFGb0M7QUFBQSxNQUU3QkMsS0FGNkI7O0FBRzVDLFNBQU8sSUFBSWpCLE1BQUosQ0FBWWdCLEtBQUtPLElBQUwsQ0FBV0osS0FBWCxFQUFtQkssTUFBbkIsQ0FBMkJQLEtBQTNCLENBQVosQ0FBUDtBQUNBLEVBSkQ7O0FBTUFqQixRQUFPRSxTQUFQLENBQWlCdUIsU0FBakIsR0FBNkIsVUFBV04sS0FBWCxFQUFtQjtBQUMvQyxNQUFNQyxJQUFJckIsSUFBSUksT0FBSixDQUFhZ0IsS0FBYixDQUFWOztBQUQrQyxxQkFFN0IsS0FBS2xCLElBQUwsQ0FBVWMsS0FBVixDQUFpQixVQUFFTSxDQUFGO0FBQUEsVUFBU0EsS0FBS0QsQ0FBZDtBQUFBLEdBQWpCLENBRjZCO0FBQUE7QUFBQSxNQUV2Q00sQ0FGdUM7QUFBQSxNQUVuQ0MsQ0FGbUM7O0FBQUEsaUJBRzdCQSxFQUFFWixLQUFGLENBQVMsVUFBRU0sQ0FBRjtBQUFBLFVBQVNBLElBQUlELENBQWI7QUFBQSxHQUFULENBSDZCO0FBQUE7QUFBQSxNQUd2Q1EsQ0FIdUM7QUFBQSxNQUduQ0MsQ0FIbUM7O0FBSS9DLFNBQU8sSUFBSTdCLE1BQUosQ0FBWTBCLEVBQUVGLE1BQUYsQ0FBVUssQ0FBVixDQUFaLENBQVA7QUFDQSxFQUxEOztBQU9BN0IsUUFBT0UsU0FBUCxDQUFpQjRCLEtBQWpCLEdBQXlCLFVBQVdDLEtBQVgsRUFBbUI7O0FBRTNDLE1BQUtBLE1BQU1qQyxLQUFOLEVBQUwsRUFBc0IsT0FBTyxJQUFQOztBQUV0QixNQUFNa0MsSUFBSUQsTUFBTTFCLElBQU4sRUFBVjtBQUNBLE1BQU1lLElBQUlyQixJQUFJSSxPQUFKLENBQWE2QixDQUFiLENBQVY7O0FBTDJDLGVBT3pCLEtBQUtqQixLQUFMLENBQVksVUFBRU0sQ0FBRjtBQUFBLFVBQVNBLElBQUlELENBQWI7QUFBQSxHQUFaLENBUHlCO0FBQUE7QUFBQSxNQU9uQ00sQ0FQbUM7QUFBQSxNQU8vQkMsQ0FQK0I7O0FBUzNDLFNBQU8sSUFBSTNCLE1BQUosQ0FBWTBCLEVBQUV6QixJQUFGLENBQU9zQixJQUFQLENBQWFTLENBQWIsRUFBaUJSLE1BQWpCLENBQXlCRyxFQUFFRyxLQUFGLENBQVNDLE1BQU16QixJQUFOLEVBQVQsRUFBeUJMLElBQWxELENBQVosQ0FBUDtBQUVBLEVBWEQ7O0FBYUFELFFBQU9FLFNBQVAsQ0FBaUIrQixZQUFqQixHQUFnQyxVQUFXQyxNQUFYLEVBQW9COztBQUVuRCxNQUFJQyxJQUFJLElBQVI7O0FBRm1EO0FBQUE7QUFBQTs7QUFBQTtBQUluRCx3QkFBcUJELE1BQXJCO0FBQUEsUUFBWWYsS0FBWjtBQUE4QmdCLFFBQUlBLEVBQUViLE1BQUYsQ0FBVUgsS0FBVixDQUFKO0FBQTlCO0FBSm1EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTW5ELFNBQU9nQixDQUFQO0FBRUEsRUFSRDs7QUFVQSxRQUFPO0FBQ05yQyxTQUFRO0FBQUEsVUFBTyxJQUFJRSxNQUFKLENBQVlGLE9BQU9DLEdBQVAsQ0FBWixDQUFQO0FBQUEsR0FERjtBQUVOcUMsUUFBTyxjQUFFQyxRQUFGO0FBQUEsVUFBZ0IsSUFBSXJDLE1BQUosQ0FBWUYsT0FBT0MsR0FBUCxDQUFaLEVBQTJCa0MsWUFBM0IsQ0FBeUNJLFFBQXpDLENBQWhCO0FBQUE7QUFGRCxFQUFQO0FBS0MiLCJmaWxlIjoib3Jkc2VxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZnVuY3Rpb24gb3Jkc2VxICggZW1wdHkgLCBrZXkgKSB7XG5cbi8vIHByb2JhYmx5IG5lZWRzIGEgdG90YWwgb3JkZXIgaW5zdGVhZCBvZiBhIGtleSBtZWFzdXJlXG4vLyB0aGlzIGNhdXNlcyBnZW5lcmFsaXR5IHByb2JsZW1zIGluIHRoZSBpbnNlcnQsIG1lcmdlLCBwYXJ0aXRpb24gYW5kIGRlbGV0ZVxuLy8gbWV0aG9kc1xuXG5jb25zdCBPcmRTZXEgPSBmdW5jdGlvbiAoIHRyZWUgKSB7XG5cdHRoaXMudHJlZSA9IHRyZWUgO1xufSA7XG5cbk9yZFNlcS5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbiAoICkge1xuXHRyZXR1cm4gdGhpcy50cmVlLmVtcHR5KCApIDtcbn0gO1xuXG5PcmRTZXEucHJvdG90eXBlLm1lYXN1cmUgPSBmdW5jdGlvbiAoICkge1xuXHRyZXR1cm4gdGhpcy50cmVlLm1lYXN1cmUoICkgO1xufSA7XG5cbk9yZFNlcS5wcm90b3R5cGUubWluID1cbk9yZFNlcS5wcm90b3R5cGUuaGVhZCA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiB0aGlzLnRyZWUuaGVhZCggKSA7XG59IDtcblxuT3JkU2VxLnByb3RvdHlwZS50YWlsID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIG5ldyBPcmRTZXEoIHRoaXMudHJlZS50YWlsKCApICkgO1xufSA7XG5cbk9yZFNlcS5wcm90b3R5cGUubWF4ID1cbk9yZFNlcS5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiB0aGlzLnRyZWUubGFzdCggKSA7XG59IDtcblxuT3JkU2VxLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIG5ldyBPcmRTZXEoIHRoaXMudHJlZS5pbml0KCApICkgO1xufSA7XG5cbk9yZFNlcS5wcm90b3R5cGUudGFrZVVudGlsID0gZnVuY3Rpb24gKCBwcmVkaWNhdGUgKSB7XG5cdHJldHVybiBuZXcgT3JkU2VxKCB0aGlzLnRyZWUudGFrZVVudGlsKCBwcmVkaWNhdGUgKSApIDtcbn0gO1xuXG5PcmRTZXEucHJvdG90eXBlLmRyb3BVbnRpbCA9IGZ1bmN0aW9uICggcHJlZGljYXRlICkge1xuXHRyZXR1cm4gbmV3IE9yZFNlcSggdGhpcy50cmVlLmRyb3BVbnRpbCggcHJlZGljYXRlICkgKSA7XG59IDtcblxuT3JkU2VxLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIHRoaXMudHJlZVtTeW1ib2wuaXRlcmF0b3JdKCApIDtcbn0gO1xuXG5PcmRTZXEucHJvdG90eXBlLnNwbGl0ID0gZnVuY3Rpb24gKCBwcmVkaWNhdGUgKSB7XG5cdGNvbnN0IFsgbGVmdCAsIHJpZ2h0IF0gPSB0aGlzLnRyZWUuc3BsaXQoIHByZWRpY2F0ZSApIDtcblx0cmV0dXJuIFsgbmV3IE9yZFNlcSggbGVmdCApICwgbmV3IE9yZFNlcSggcmlnaHQgKSBdIDtcbn0gO1xuXG5PcmRTZXEucHJvdG90eXBlLnBhcnRpdGlvbiA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cdGNvbnN0IGsgPSBrZXkubWVhc3VyZSggdmFsdWUgKSA7XG5cdHJldHVybiB0aGlzLnNwbGl0KCAoIG0gKSA9PiBtID49IGsgKSA7XG59IDtcblxuT3JkU2VxLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xuXHRjb25zdCBrID0ga2V5Lm1lYXN1cmUoIHZhbHVlICkgO1xuXHRjb25zdCBbIGxlZnQgLCByaWdodCBdID0gdGhpcy50cmVlLnNwbGl0KCAoIG0gKSA9PiBtID49IGsgKSA7XG5cdHJldHVybiBuZXcgT3JkU2VxKCBsZWZ0LnB1c2goIHZhbHVlICkuY29uY2F0KCByaWdodCApICkgO1xufSA7XG5cbk9yZFNlcS5wcm90b3R5cGUuZGVsZXRlQWxsID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblx0Y29uc3QgayA9IGtleS5tZWFzdXJlKCB2YWx1ZSApIDtcblx0Y29uc3QgWyBsICwgciBdID0gdGhpcy50cmVlLnNwbGl0KCAoIG0gKSA9PiBtID49IGsgKSA7XG5cdGNvbnN0IFsgXyAsIFIgXSA9IHIuc3BsaXQoICggbSApID0+IG0gPiBrICkgO1xuXHRyZXR1cm4gbmV3IE9yZFNlcSggbC5jb25jYXQoIFIgKSApIDtcbn0gO1xuXG5PcmRTZXEucHJvdG90eXBlLm1lcmdlID0gZnVuY3Rpb24gKCBvdGhlciApIHtcblxuXHRpZiAoIG90aGVyLmVtcHR5KCApICkgcmV0dXJuIHRoaXMgO1xuXG5cdGNvbnN0IGEgPSBvdGhlci5oZWFkKCApIDtcblx0Y29uc3QgayA9IGtleS5tZWFzdXJlKCBhICkgO1xuXG5cdGNvbnN0IFsgbCAsIHIgXSA9IHRoaXMuc3BsaXQoICggbSApID0+IG0gPiBrICkgO1xuXG5cdHJldHVybiBuZXcgT3JkU2VxKCBsLnRyZWUucHVzaCggYSApLmNvbmNhdCggci5tZXJnZSggb3RoZXIudGFpbCggKSApLnRyZWUgKSApIDtcblxufSA7XG5cbk9yZFNlcS5wcm90b3R5cGUuaW5zZXJ0VmFsdWVzID0gZnVuY3Rpb24gKCB2YWx1ZXMgKSB7XG5cblx0bGV0IHMgPSB0aGlzIDtcblxuXHRmb3IgKCBjb25zdCB2YWx1ZSBvZiB2YWx1ZXMgKSBzID0gcy5pbnNlcnQoIHZhbHVlICkgO1xuXG5cdHJldHVybiBzIDtcblxufSA7XG5cbnJldHVybiB7XG5cdGVtcHR5IDogKCApID0+IG5ldyBPcmRTZXEoIGVtcHR5KCBrZXkgKSApICxcblx0ZnJvbSA6ICggaXRlcmFibGUgKSA9PiBuZXcgT3JkU2VxKCBlbXB0eSgga2V5ICkgKS5pbnNlcnRWYWx1ZXMoIGl0ZXJhYmxlIClcbn0gO1xuXG59XG4iXX0=