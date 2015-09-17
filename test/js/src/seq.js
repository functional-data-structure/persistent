
var measure = require( 'aureooms-js-measure' ) ;
var itertools = require( 'aureooms-js-itertools' ) ;
var fingertree = require( 'aureooms-js-fingertree' ) ;

var list = itertools.list ;
var Seq = persistent.seq( fingertree.empty , measure.Measures.SIZE ) ;

test( 'seq' , function ( assert ) {

	var s = Seq.empty( ) ;

	assert.ok( s.empty( ) ) ;

	assert.equal( s.len( ) , 0 ) ;

	s = s.push( 'b' ) ;
	s = s.push( 'c' ) ;
	s = s.cons( 'a' ) ;

	assert.ok( !s.empty( ) ) ;

	assert.equal( s.len( ) , 3 ) ;

	assert.equal( s.head( ) , 'a' ) ;
	assert.deepEqual( list( s.tail( ) ) , list( 'bc' ) ) ;

	assert.equal( s.last( ) , 'c' ) ;
	assert.deepEqual( list( s.init( ) ) , list( 'ab' ) ) ;

	assert.equal( s.get( 0 ) , 'a' ) ;
	assert.equal( s.get( 1 ) , 'b' ) ;
	assert.equal( s.get( 2 ) , 'c' ) ;

	var t = s.set( 1 , 'B' ) ;

	assert.equal( s.get( 0 ) , 'a' ) ;
	assert.equal( s.get( 1 ) , 'b' ) ;
	assert.equal( s.get( 2 ) , 'c' ) ;

	assert.equal( t.get( 0 ) , 'a' ) ;
	assert.equal( t.get( 1 ) , 'B' ) ;
	assert.equal( t.get( 2 ) , 'c' ) ;

	s = s.append( 'def' ) ;
	s = s.prepend( '?.!' ) ;

	assert.deepEqual( list( s ) , list( '?.!abcdef' ) ) ;
	assert.deepEqual( list( s.concat( t ) ) , list( '?.!abcdefaBc' ) ) ;

	var split = s.splitAt( 4 ) ;
	assert.deepEqual( list( split[0] ) , list( '?.!a' ) ) ;
	assert.deepEqual( list( split[1] ) , list( 'bcdef' ) ) ;

	assert.deepEqual( list( Seq.from( 'abcd' ) ) , list( 'abcd' ) ) ;

} ) ;
