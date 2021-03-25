import test from 'ava';

import {Measures} from '@aureooms/js-measure';
import {ge} from '@aureooms/js-predicate';
import {list} from '@aureooms/js-itertools';
import {empty} from '@aureooms/js-fingertree';
import {ordseq} from '../../src/index.js';

const OrdSeq = ordseq(empty, Measures.KEY);

test('ordseq', (t) => {
	let o = OrdSeq.empty();

	t.true(o.isEmpty());

	o = o.insert(1);
	o = o.insert(3);
	o = o.insert(2);

	t.is(o.measure(), 3);

	t.true(!o.isEmpty());

	t.is(o.min(), 1);
	t.is(o.max(), 3);

	t.is(o.head(), 1);
	t.deepEqual(list(o.tail()), [2, 3]);

	t.is(o.last(), 3);
	t.deepEqual(list(o.init()), [1, 2]);

	const split = o.partition(2);
	t.deepEqual(list(split[0]), [1]);
	t.deepEqual(list(split[1]), [2, 3]);
	t.deepEqual(list(o.takeUntil(ge(2))), [1]);
	t.deepEqual(list(o.dropUntil(ge(2))), [2, 3]);

	o = OrdSeq.from([1, 2, 3]).insertValues([2.5, 2.5, 2.5, 2.5]);
	t.deepEqual(list(o), [1, 2, 2.5, 2.5, 2.5, 2.5, 3]);
	o = o.deleteAll(2.5);
	t.deepEqual(list(o), [1, 2, 3]);
	t.deepEqual(list(o.merge(o)), [1, 1, 2, 2, 3, 3]);
});
