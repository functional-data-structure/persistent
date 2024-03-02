import test from 'ava';

import {Measures} from '@functional-abstraction/measure';
import {empty} from '@functional-data-structure/finger-tree';
import {list} from '@iterable-iterator/list';

import {intervaltree} from '#module';

const IntervalTree = intervaltree(empty, Measures.INTERVAL);

test('intervaltree', (t) => {
	let i = IntervalTree.empty();

	t.true(i.isEmpty());

	i = i.insert([1, 7]);
	i = i.insert([3, 9]);
	i = i.insert([4, 6]);

	t.deepEqual(i.measure(), [4, 9]);

	t.is(i.intervalSearch([100, 1000]), null);
	t.is(i.intervalSearch([-1000, -100]), null);
	t.deepEqual(i.intervalSearch([8, 9]), [3, 9]);
	t.deepEqual(i.intervalSearch([5, 5]), [1, 7]);
	t.deepEqual(i.intervalSearch([1, 2]), [1, 7]);

	t.deepEqual(list(i.intervalMatch([100, 1000])), []);
	t.deepEqual(list(i.intervalMatch([-1000, -100])), []);
	t.deepEqual(list(i.intervalMatch([8, 9])), [[3, 9]]);
	t.deepEqual(list(i.intervalMatch([5, 5])), [
		[1, 7],
		[3, 9],
		[4, 6],
	]);
	t.deepEqual(list(i.intervalMatch([1, 2])), [[1, 7]]);

	t.deepEqual(list(i), [
		[1, 7],
		[3, 9],
		[4, 6],
	]);

	i = IntervalTree.from(i);

	t.deepEqual(i.measure(), [4, 9]);

	t.is(i.intervalSearch([100, 1000]), null);
	t.is(i.intervalSearch([-1000, -100]), null);
	t.deepEqual(i.intervalSearch([8, 9]), [3, 9]);
	t.deepEqual(i.intervalSearch([5, 5]), [1, 7]);
	t.deepEqual(i.intervalSearch([1, 2]), [1, 7]);

	t.deepEqual(list(i.intervalMatch([100, 1000])), []);
	t.deepEqual(list(i.intervalMatch([-1000, -100])), []);
	t.deepEqual(list(i.intervalMatch([8, 9])), [[3, 9]]);
	t.deepEqual(list(i.intervalMatch([5, 5])), [
		[1, 7],
		[3, 9],
		[4, 6],
	]);
	t.deepEqual(list(i.intervalMatch([1, 2])), [[1, 7]]);

	t.deepEqual(list(i), [
		[1, 7],
		[3, 9],
		[4, 6],
	]);
	t.deepEqual(list(i.takeUntil((m) => m[0] > 1)), [[1, 7]]);
	t.deepEqual(list(i.dropUntil((m) => m[0] > 1)), [
		[3, 9],
		[4, 6],
	]);
	t.deepEqual(list(i.merge(i)), [
		[1, 7],
		[1, 7],
		[3, 9],
		[3, 9],
		[4, 6],
		[4, 6],
	]);

	t.deepEqual(list(i.head()), [1, 7]);
	t.deepEqual(list(i.last()), [4, 6]);
	t.deepEqual(list(i.tail()), [
		[3, 9],
		[4, 6],
	]);
	t.deepEqual(list(i.init()), [
		[1, 7],
		[3, 9],
	]);
});
