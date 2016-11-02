import test from 'ava' ;

import { Measures } from 'aureooms-js-measure' ;
import { empty } from 'aureooms-js-fingertree' ;
import { heap } from '../../src' ;

const Heap = heap( empty , Measures.PRIO ) ;

test( 'heap' , assert => {

	let h = Heap.empty( ) ;
	h = h.push( 1 ) ;
	h = h.push( 3 ) ;
	h = h.push( 2 ) ;

	let x = h.extractMax( ) ;
	let a = x[0] ;
	let y = x[1].extractMax( ) ;
	let b = y[0] ;
	let z = y[1].extractMax( ) ;
	let c = z[0] ;

	assert.is( a , 3 ) ;
	assert.is( b , 2 ) ;
	assert.is( c , 1 ) ;

	assert.truthy( z[1].empty( ) ) ;
	assert.is( h.maxKey( ) , 3 ) ;
	assert.is( x[1].maxKey( ) , 2 ) ;
	assert.is( y[1].maxKey( ) , 1 ) ;
	assert.is( z[1].maxKey( ) , -Infinity ) ;

	h = Heap.from( [ 1 , 3 , 2 ] ) ;

	x = h.extractMax( ) ;
	a = x[0] ;
	y = x[1].extractMax( ) ;
	b = y[0] ;
	z = y[1].extractMax( ) ;
	c = z[0] ;

	assert.is( a , 3 ) ;
	assert.is( b , 2 ) ;
	assert.is( c , 1 ) ;

	assert.truthy( z[1].empty( ) ) ;
	assert.is( h.maxKey( ) , 3 ) ;
	assert.is( x[1].maxKey( ) , 2 ) ;
	assert.is( y[1].maxKey( ) , 1 ) ;
	assert.is( z[1].maxKey( ) , -Infinity ) ;

} ) ;
