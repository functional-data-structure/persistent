
var measure = require( 'aureooms-js-measure' ) ;
var fingertree = require( 'aureooms-js-fingertree' ) ;

var Heap = persistent.heap( fingertree.empty , measure.Measures.PRIO ) ;

test( 'heap' , function ( assert ) {

	var h = Heap.empty( ) ;
	h = h.push( 1 ) ;
	h = h.push( 3 ) ;
	h = h.push( 2 ) ;

	var x = h.extractMax( ) ;
	var a = x[0] ;
	var y = x[1].extractMax( ) ;
	var b = y[0] ;
	var z = y[1].extractMax( ) ;
	var c = z[0] ;

	assert.equal( a , 3 ) ;
	assert.equal( b , 2 ) ;
	assert.equal( c , 1 ) ;

	assert.ok( z[1].empty( ) ) ;
	assert.equal( h.maxKey( ) , 3 ) ;
	assert.equal( x[1].maxKey( ) , 2 ) ;
	assert.equal( y[1].maxKey( ) , 1 ) ;
	assert.equal( z[1].maxKey( ) , -Infinity ) ;

} ) ;
