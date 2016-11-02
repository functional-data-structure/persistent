import test from 'ava' ;

import { Measures } from 'aureooms-js-measure' ;
import { list } from 'aureooms-js-itertools' ;
import { empty } from 'aureooms-js-fingertree' ;
import { indordseq } from '../../src' ;

const { KEY , LEN , KEY_LEN } = Measures ;

const IndOrdSeq = indordseq( empty , KEY , LEN , KEY_LEN ) ;

test( 'indordseq (ordseq behavior)' , assert => {

	let o = IndOrdSeq.empty( ) ;

	assert.truthy( o.empty( ) ) ;

	o = o.insert( 1 ) ;
	o = o.insert( 3 ) ;
	o = o.insert( 2 ) ;

	assert.deepEqual( o.measure( ) , [ 3 , 3 ] ) ;

	assert.truthy( !o.empty( ) ) ;

	assert.is( o.min( ) , 1 ) ;
	assert.is( o.max( ) , 3 ) ;

	assert.is( o.head( ) , 1 ) ;
	assert.deepEqual( list( o.tail( ) ) , [2,3] ) ;

	assert.is( o.last( ) , 3 ) ;
	assert.deepEqual( list( o.init( ) ) , [1,2] ) ;

	let split = o.partition( 2 ) ;
	assert.deepEqual( list( split[0] ) , [1] ) ;
	assert.deepEqual( list( split[1] ) , [2,3] ) ;
	assert.deepEqual( list( o.takeUntil( function ( m ) { return m[0] >= 2 ; } ) ) , [ 1 ] ) ;
	assert.deepEqual( list( o.dropUntil( function ( m ) { return m[0] >= 2 ; } ) ) , [ 2 , 3 ] ) ;

	o = IndOrdSeq.from( [1,2,3] ).insertValues( [2.5,2.5,2.5,2.5] ) ;
	assert.deepEqual( list( o ) , [ 1 , 2 , 2.5 , 2.5 , 2.5 , 2.5 , 3 ] ) ;
	o = o.deleteAll( 2.5 ) ;
	assert.deepEqual( list( o ) , [ 1 , 2 , 3 ] ) ;
	assert.deepEqual( list( o.merge( o ) ) , [ 1 , 1 , 2 , 2 , 3 , 3 ] ) ;

} ) ;


test( 'indordseq (seq behavior)' , function ( assert ) {

	let s = IndOrdSeq.empty( ) ;

	assert.truthy( s.empty( ) ) ;

	assert.is( s.len( ) , 0 ) ;

	s = s.insert( 'b' ) ;
	s = s.insert( 'c' ) ;
	s = s.insert( 'a' ) ;

	assert.truthy( !s.empty( ) ) ;

	assert.is( s.len( ) , 3 ) ;

	assert.is( s.head( ) , 'a' ) ;
	assert.deepEqual( list( s.tail( ) ) , list( 'bc' ) ) ;

	assert.is( s.last( ) , 'c' ) ;
	assert.deepEqual( list( s.init( ) ) , list( 'ab' ) ) ;

	assert.is( s.get( 0 ) , 'a' ) ;
	assert.is( s.get( 1 ) , 'b' ) ;
	assert.is( s.get( 2 ) , 'c' ) ;

	s = s.insertValues( 'fed' ) ;

	assert.deepEqual( list( s ) , list( 'abcdef' ) ) ;

	let split = s.splitAt( 4 ) ;
	assert.deepEqual( list( split[0] ) , list( 'abcd' ) ) ;
	assert.deepEqual( list( split[1] ) , list( 'ef' ) ) ;
	assert.deepEqual( list( s.takeUntil( function ( m ) { return m[1] > 4 ; } ) ) , list( 'abcd' ) ) ;
	assert.deepEqual( list( s.dropUntil( function ( m ) { return m[1] > 4 ; } ) ) , list( 'ef' ) ) ;

	assert.deepEqual( list( IndOrdSeq.from( 'cdba' ) ) , list( 'abcd' ) ) ;

	assert.throws( s.get.bind( s , -1 ) , /index/ ) ;
	assert.throws( s.get.bind( s , list( s ).length ) , /index/ ) ;

} ) ;
