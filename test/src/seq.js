import test from 'ava' ;

import { Measures } from '@aureooms/js-measure' ;
import { gt } from '@aureooms/js-predicate' ;
import { list, range } from '@aureooms/js-itertools' ;
import { empty } from '@aureooms/js-fingertree' ;
import { seq } from '../../src' ;

const Seq = seq( empty , Measures.SIZE ) ;

test( 'seq' , t => {

	let s = Seq.empty( ) ;

	t.true( s.empty( ) ) ;

	t.is( s.len( ) , 0 ) ;

	s = s.push( 'b' ) ;
	s = s.push( 'c' ) ;
	s = s.cons( 'a' ) ;

	t.true( !s.empty( ) ) ;

	t.is( s.len( ) , 3 ) ;

	t.is( s.head( ) , 'a' ) ;
	t.deepEqual( list( s.tail( ) ) , list( 'bc' ) ) ;

	t.is( s.last( ) , 'c' ) ;
	t.deepEqual( list( s.init( ) ) , list( 'ab' ) ) ;

	t.is( s.get( 0 ) , 'a' ) ;
	t.is( s.get( 1 ) , 'b' ) ;
	t.is( s.get( 2 ) , 'c' ) ;

	let _t = s.set( 1 , 'B' ) ;

	t.is( s.get( 0 ) , 'a' ) ;
	t.is( s.get( 1 ) , 'b' ) ;
	t.is( s.get( 2 ) , 'c' ) ;

	t.is( _t.get( 0 ) , 'a' ) ;
	t.is( _t.get( 1 ) , 'B' ) ;
	t.is( _t.get( 2 ) , 'c' ) ;

	s = s.append( 'def' ) ;
	s = s.prepend( '?.!' ) ;

	t.deepEqual( list( s ) , list( '?.!abcdef' ) ) ;
	t.deepEqual( list( s.concat( _t ) ) , list( '?.!abcdefaBc' ) ) ;

	let split = s.splitAt( 4 ) ;
	t.deepEqual( list( split[0] ) , list( '?.!a' ) ) ;
	t.deepEqual( list( split[1] ) , list( 'bcdef' ) ) ;
	t.deepEqual( list( s.takeUntil( gt( 4 ) ) ) , list( '?.!a' ) ) ;
	t.deepEqual( list( s.dropUntil( gt( 4 ) ) ) , list( 'bcdef' ) ) ;

	t.deepEqual( list( Seq.from( 'abcd' ) ) , list( 'abcd' ) ) ;

	t.throws( s.get.bind( s , -1 ) , { message: /index/ } ) ;
	t.throws( s.get.bind( s , list( s ).length ) , { message: /index/ } ) ;

	t.throws( s.set.bind( s , -1 , 'Z' ) , { message: /index/ } ) ;
	t.throws( s.set.bind( s , list( s ).length , 'Z' ) , { message: /index/ } ) ;

} ) ;

test('@aureooms/js-fingertree github issue #73', t => {
	let s = Seq.from('abcde');

	for (const x of range(26)) {
		const c = String.fromCharCode( 87 + x );
		s = s.set(2, c);
		t.deepEqual(list(s), list('ab'+c+'de'));
	}
}) ;
