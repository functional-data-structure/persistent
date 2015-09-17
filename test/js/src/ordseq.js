var measure = require( 'aureooms-js-measure' ) ;
var predicate = require( 'aureooms-js-predicate' ) ;
var itertools = require( 'aureooms-js-itertools' ) ;
var fingertree = require( 'aureooms-js-fingertree' ) ;

var ge = predicate.ge ;
var list = itertools.list ;
var OrdSeq = persistent.ordseq( fingertree.empty , measure.Measures.KEY ) ;

test( 'ordseq' , function ( assert ) {

	var o = OrdSeq.empty( ) ;

	assert.ok( o.empty( ) ) ;

	o = o.insert( 1 ) ;
	o = o.insert( 3 ) ;
	o = o.insert( 2 ) ;

	assert.equal( o.measure( ) , 3 ) ;

	assert.ok( !o.empty( ) ) ;

	assert.equal( o.min( ) , 1 ) ;
	assert.equal( o.max( ) , 3 ) ;

	assert.equal( o.head( ) , 1 ) ;
	assert.deepEqual( list( o.tail( ) ) , [2,3] ) ;

	assert.equal( o.last( ) , 3 ) ;
	assert.deepEqual( list( o.init( ) ) , [1,2] ) ;

	var split = o.partition( 2 ) ;
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

