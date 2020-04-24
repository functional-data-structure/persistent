import test from 'ava' ;

import { Measures } from '@aureooms/js-measure' ;
import { gt } from '@aureooms/js-predicate' ;
import { list } from '@aureooms/js-itertools' ;
import { empty } from '@aureooms/js-fingertree' ;
import { seq } from '../../src' ;

const Seq = seq( empty , Measures.SIZE ) ;

test( 'seq' , assert => {

	let s = Seq.empty( ) ;

	assert.truthy( s.empty( ) ) ;

	assert.is( s.len( ) , 0 ) ;

	s = s.push( 'b' ) ;
	s = s.push( 'c' ) ;
	s = s.cons( 'a' ) ;

	assert.truthy( !s.empty( ) ) ;

	assert.is( s.len( ) , 3 ) ;

	assert.is( s.head( ) , 'a' ) ;
	assert.deepEqual( list( s.tail( ) ) , list( 'bc' ) ) ;

	assert.is( s.last( ) , 'c' ) ;
	assert.deepEqual( list( s.init( ) ) , list( 'ab' ) ) ;

	assert.is( s.get( 0 ) , 'a' ) ;
	assert.is( s.get( 1 ) , 'b' ) ;
	assert.is( s.get( 2 ) , 'c' ) ;

	let t = s.set( 1 , 'B' ) ;

	assert.is( s.get( 0 ) , 'a' ) ;
	assert.is( s.get( 1 ) , 'b' ) ;
	assert.is( s.get( 2 ) , 'c' ) ;

	assert.is( t.get( 0 ) , 'a' ) ;
	assert.is( t.get( 1 ) , 'B' ) ;
	assert.is( t.get( 2 ) , 'c' ) ;

	s = s.append( 'def' ) ;
	s = s.prepend( '?.!' ) ;

	assert.deepEqual( list( s ) , list( '?.!abcdef' ) ) ;
	assert.deepEqual( list( s.concat( t ) ) , list( '?.!abcdefaBc' ) ) ;

	let split = s.splitAt( 4 ) ;
	assert.deepEqual( list( split[0] ) , list( '?.!a' ) ) ;
	assert.deepEqual( list( split[1] ) , list( 'bcdef' ) ) ;
	assert.deepEqual( list( s.takeUntil( gt( 4 ) ) ) , list( '?.!a' ) ) ;
	assert.deepEqual( list( s.dropUntil( gt( 4 ) ) ) , list( 'bcdef' ) ) ;

	assert.deepEqual( list( Seq.from( 'abcd' ) ) , list( 'abcd' ) ) ;

	assert.throws( s.get.bind( s , -1 ) , { message: /index/ } ) ;
	assert.throws( s.get.bind( s , list( s ).length ) , { message: /index/ } ) ;

	assert.throws( s.set.bind( s , -1 , 'Z' ) , { message: /index/ } ) ;
	assert.throws( s.set.bind( s , list( s ).length , 'Z' ) , { message: /index/ } ) ;

} ) ;
