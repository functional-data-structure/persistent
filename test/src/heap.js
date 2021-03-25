import test from 'ava';

import {Measures} from '@aureooms/js-measure';
import {empty} from '@aureooms/js-fingertree';
import {heap} from '../../src/index.js';

const Heap = heap(empty, Measures.PRIO);

test('heap', (t) => {
	let h = Heap.empty();
	h = h.push(1);
	h = h.push(3);
	h = h.push(2);

	let x = h.extractMax();
	let a = x[0];
	let y = x[1].extractMax();
	let b = y[0];
	let z = y[1].extractMax();
	let c = z[0];

	t.is(a, 3);
	t.is(b, 2);
	t.is(c, 1);

	t.true(z[1].isEmpty());
	t.is(h.maxKey(), 3);
	t.is(x[1].maxKey(), 2);
	t.is(y[1].maxKey(), 1);
	t.is(z[1].maxKey(), Number.NEGATIVE_INFINITY);

	h = Heap.from([1, 3, 2]);

	x = h.extractMax();
	a = x[0];
	y = x[1].extractMax();
	b = y[0];
	z = y[1].extractMax();
	c = z[0];

	t.is(a, 3);
	t.is(b, 2);
	t.is(c, 1);

	t.true(z[1].isEmpty());
	t.is(h.maxKey(), 3);
	t.is(x[1].maxKey(), 2);
	t.is(y[1].maxKey(), 1);
	t.is(z[1].maxKey(), Number.NEGATIVE_INFINITY);
});
