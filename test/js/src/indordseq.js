var measure = require( 'aureooms-js-measure' ) ;
var itertools = require( 'aureooms-js-itertools' ) ;
var fingertree = require( 'aureooms-js-fingertree' ) ;

var list = itertools.list ;
var IndOrdSeq = persistent.indordseq( fingertree.empty , measure.Measures.KEY , measure.Measures.LEN , mesure.Measures.KEY_LEN ) ;

test( 'indordseq (ordseq behavior)' , function ( assert ) {

	var o = IndOrdSeq.empty( ) ;

	assert.ok( o.empty( ) ) ;

	o = o.insert( 1 ) ;
	o = o.insert( 3 ) ;
	o = o.insert( 2 ) ;

	assert.deepEqual( o.measure( ) , [ 3 , 3 ] ) ;

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
	assert.deepEqual( list( o.takeUntil( function ( m ) { return m[0] >= 2 ; } ) ) , [ 1 ] ) ;
	assert.deepEqual( list( o.dropUntil( function ( m ) { return m[0] >= 2 ; } ) ) , [ 2 , 3 ] ) ;

	o = IndOrdSeq.from( [1,2,3] ).insertValues( [2.5,2.5,2.5,2.5] ) ;
	assert.deepEqual( list( o ) , [ 1 , 2 , 2.5 , 2.5 , 2.5 , 2.5 , 3 ] ) ;
	o = o.deleteAll( 2.5 ) ;
	assert.deepEqual( list( o ) , [ 1 , 2 , 3 ] ) ;
	assert.deepEqual( list( o.merge( o ) ) , [ 1 , 1 , 2 , 2 , 3 , 3 ] ) ;

} ) ;


test( 'indordseq (seq behavior)' , function ( assert ) {

	var s = IndOrdSeq.empty( ) ;

	assert.ok( s.empty( ) ) ;

	assert.equal( s.len( ) , 0 ) ;

	s = s.insert( 'b' ) ;
	s = s.insert( 'c' ) ;
	s = s.insert( 'a' ) ;

	assert.ok( !s.empty( ) ) ;

	assert.equal( s.len( ) , 3 ) ;

	assert.equal( s.head( ) , 'a' ) ;
	assert.deepEqual( list( s.tail( ) ) , list( 'bc' ) ) ;

	assert.equal( s.last( ) , 'c' ) ;
	assert.deepEqual( list( s.init( ) ) , list( 'ab' ) ) ;

	assert.equal( s.get( 0 ) , 'a' ) ;
	assert.equal( s.get( 1 ) , 'b' ) ;
	assert.equal( s.get( 2 ) , 'c' ) ;

	s = s.insertValues( 'fed' ) ;

	assert.deepEqual( list( s ) , list( 'abcdef' ) ) ;

	var split = s.splitAt( 4 ) ;
	assert.deepEqual( list( split[0] ) , list( 'abcd' ) ) ;
	assert.deepEqual( list( split[1] ) , list( 'ef' ) ) ;
	assert.deepEqual( list( s.takeUntil( function ( m ) { return m[1] > 4 ; } ) ) , list( 'abcd' ) ) ;
	assert.deepEqual( list( s.dropUntil( function ( m ) { return m[1] > 4 ; } ) ) , list( 'ef' ) ) ;

	assert.deepEqual( list( IndOrdSeq.from( 'cdba' ) ) , list( 'abcd' ) ) ;

	assert.throws( s.get.bind( s , -1 ) , /index/ ) ;
	assert.throws( s.get.bind( s , list( s ).length ) , /index/ ) ;

} ) ;
