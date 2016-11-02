import test from 'ava' ;

import { Measures } from 'aureooms-js-measure' ;
import { ge } from 'aureooms-js-predicate' ;
import { list } from 'aureooms-js-itertools' ;
import { empty } from 'aureooms-js-fingertree' ;
import { ordseq } from '../../src' ;

const OrdSeq = ordseq( empty , Measures.KEY ) ;

test( 'ordseq' , assert => {

	let o = OrdSeq.empty( ) ;

	assert.truthy( o.empty( ) ) ;

	o = o.insert( 1 ) ;
	o = o.insert( 3 ) ;
	o = o.insert( 2 ) ;

	assert.is( o.measure( ) , 3 ) ;

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
	assert.deepEqual( list( o.takeUntil( ge( 2 ) ) ) , [ 1 ] ) ;
	assert.deepEqual( list( o.dropUntil( ge( 2 ) ) ) , [ 2 , 3 ] ) ;

	o = OrdSeq.from( [1,2,3] ).insertValues( [2.5,2.5,2.5,2.5] ) ;
	assert.deepEqual( list( o ) , [ 1 , 2 , 2.5 , 2.5 , 2.5 , 2.5 , 3 ] ) ;
	o = o.deleteAll( 2.5 ) ;
	assert.deepEqual( list( o ) , [ 1 , 2 , 3 ] ) ;
	assert.deepEqual( list( o.merge( o ) ) , [ 1 , 1 , 2 , 2 , 3 , 3 ] ) ;

} ) ;

