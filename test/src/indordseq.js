import test from 'ava';

import {Measures} from '@functional-abstraction/measure';
import {empty} from '@functional-data-structure/finger-tree';
import {list} from '@iterable-iterator/list';

import {indordseq} from '#module';

const {KEY, LEN, KEY_LEN} = Measures;

const IndOrdSeq = indordseq(empty, KEY, LEN, KEY_LEN);

test('indordseq (ordseq behavior)', (t) => {
	let o = IndOrdSeq.empty();

	t.true(o.isEmpty());

	o = o.insert(1);
	o = o.insert(3);
	o = o.insert(2);

	t.deepEqual(o.measure(), [3, 3]);

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
	t.deepEqual(list(o.takeUntil((m) => m[0] >= 2)), [1]);
	t.deepEqual(list(o.dropUntil((m) => m[0] >= 2)), [2, 3]);

	o = IndOrdSeq.from([1, 2, 3]).insertValues([2.5, 2.5, 2.5, 2.5]);
	t.deepEqual(list(o), [1, 2, 2.5, 2.5, 2.5, 2.5, 3]);
	o = o.deleteAll(2.5);
	t.deepEqual(list(o), [1, 2, 3]);
	t.deepEqual(list(o.merge(o)), [1, 1, 2, 2, 3, 3]);
});

test('indordseq (seq behavior)', (t) => {
	let s = IndOrdSeq.empty();

	t.true(s.isEmpty());

	t.is(s.len(), 0);

	s = s.insert('b');
	s = s.insert('c');
	s = s.insert('a');

	t.true(!s.isEmpty());

	t.is(s.len(), 3);

	t.is(s.head(), 'a');
	t.deepEqual(list(s.tail()), list('bc'));

	t.is(s.last(), 'c');
	t.deepEqual(list(s.init()), list('ab'));

	t.is(s.get(0), 'a');
	t.is(s.get(1), 'b');
	t.is(s.get(2), 'c');

	s = s.insertValues('fed');

	t.deepEqual(list(s), list('abcdef'));

	const split = s.splitAt(4);
	t.deepEqual(list(split[0]), list('abcd'));
	t.deepEqual(list(split[1]), list('ef'));
	t.deepEqual(list(s.takeUntil((m) => m[1] > 4)), list('abcd'));
	t.deepEqual(list(s.dropUntil((m) => m[1] > 4)), list('ef'));

	t.deepEqual(list(IndOrdSeq.from('cdba')), list('abcd'));

	t.throws(s.get.bind(s, -1), {message: /index/});
	t.throws(s.get.bind(s, list(s).length), {message: /index/});
});
