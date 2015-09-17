var measure = require( 'aureooms-js-measure' ) ;
var predicate = require( 'aureooms-js-predicate' ) ;
var itertools = require( 'aureooms-js-itertools' ) ;
var fingertree = require( 'aureooms-js-fingertree' ) ;

var ge = predicate.ge ;
var list = itertools.list ;
var IntervalTree = persistent.intervaltree( fingertree.empty , measure.Measures.INTERVAL ) ;

test( 'intervaltree' , function ( assert ) {

	var i = IntervalTree.empty( ) ;

	assert.ok( i.empty( ) ) ;

	i = i.insert( [ 1 , 7 ] ) ;
	i = i.insert( [ 3 , 9 ] ) ;
	i = i.insert( [ 4 , 6 ] ) ;

	assert.deepEqual( i.measure( ) , [ 4 , 9 ] ) ;

	assert.deepEqual( i.intervalSearch( [ 100 , 1000 ] )  , null ) ;
	assert.deepEqual( i.intervalSearch( [ -1000 , -100 ] )  , null ) ;
	assert.deepEqual( i.intervalSearch( [ 8 , 9 ] )  , [ 3 , 9 ] ) ;
	assert.deepEqual( i.intervalSearch( [ 5 , 5 ] )  , [ 1 , 7 ] ) ;
	assert.deepEqual( i.intervalSearch( [ 1 , 2 ] )  , [ 1 , 7 ] ) ;

	assert.deepEqual( list( i.intervalMatch( [ 100 , 1000 ] ) )  , [ ] ) ;
	assert.deepEqual( list( i.intervalMatch( [ -1000 , -100 ] ) )  , [ ] ) ;
	assert.deepEqual( list( i.intervalMatch( [ 8 , 9 ] ) )  , [ [ 3 , 9 ] ] ) ;
	assert.deepEqual( list( i.intervalMatch( [ 5 , 5 ] ) )  , [ [ 1 , 7 ] , [ 3 , 9 ] , [ 4 , 6 ] ] ) ;
	assert.deepEqual( list( i.intervalMatch( [ 1 , 2 ] ) )  , [ [ 1 , 7 ] ] ) ;

	assert.deepEqual( list( i )  , [ [ 1 , 7 ] , [ 3 , 9 ] , [ 4 , 6 ] ] ) ;

	i = IntervalTree.from( i ) ;

	assert.deepEqual( i.measure( ) , [ 4 , 9 ] ) ;

	assert.deepEqual( i.intervalSearch( [ 100 , 1000 ] )  , null ) ;
	assert.deepEqual( i.intervalSearch( [ -1000 , -100 ] )  , null ) ;
	assert.deepEqual( i.intervalSearch( [ 8 , 9 ] )  , [ 3 , 9 ] ) ;
	assert.deepEqual( i.intervalSearch( [ 5 , 5 ] )  , [ 1 , 7 ] ) ;
	assert.deepEqual( i.intervalSearch( [ 1 , 2 ] )  , [ 1 , 7 ] ) ;

	assert.deepEqual( list( i.intervalMatch( [ 100 , 1000 ] ) )  , [ ] ) ;
	assert.deepEqual( list( i.intervalMatch( [ -1000 , -100 ] ) )  , [ ] ) ;
	assert.deepEqual( list( i.intervalMatch( [ 8 , 9 ] ) )  , [ [ 3 , 9 ] ] ) ;
	assert.deepEqual( list( i.intervalMatch( [ 5 , 5 ] ) )  , [ [ 1 , 7 ] , [ 3 , 9 ] , [ 4 , 6 ] ] ) ;
	assert.deepEqual( list( i.intervalMatch( [ 1 , 2 ] ) )  , [ [ 1 , 7 ] ] ) ;

	assert.deepEqual( list( i )  , [ [ 1 , 7 ] , [ 3 , 9 ] , [ 4 , 6 ] ] ) ;
	assert.deepEqual( list( i.takeUntil( function ( m ) { return m[0] > 1 ; } ) )  , [ [ 1 , 7 ] ] ) ;
	assert.deepEqual( list( i.dropUntil( function ( m ) { return m[0] > 1 ; } ) )  , [ [ 3 , 9 ] , [ 4 , 6 ] ] ) ;
	assert.deepEqual( list( i.merge( i ) )  , [ [ 1 , 7 ] , [ 1 , 7 ] , [ 3 , 9 ] , [ 3 , 9 ] , [ 4 , 6 ] , [ 4 , 6 ] ] ) ;

	assert.deepEqual( list( i.head( ) ) , [ 1 , 7 ] ) ;
	assert.deepEqual( list( i.last( ) ) , [ 4 , 6 ] ) ;
	assert.deepEqual( list( i.tail( ) ) , [ [ 3 , 9 ] , [ 4 , 6 ] ] ) ;
	assert.deepEqual( list( i.init( ) ) , [ [ 1 , 7 ] , [ 3 , 9 ] ] ) ;

} ) ;

