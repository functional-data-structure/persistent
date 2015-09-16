
function sequence ( empty , counter ) {


let Sequence = function ( tree ) {
	this.tree = tree ;
} ;

Sequence.prototype.empty = function ( ) {
	return this.tree.empty( ) ;
} ;

Sequence.prototype.measure =
Sequence.prototype.size = function ( ) {
	return this.tree.measure( ) ;
} ;

Sequence.prototype.head = function ( ) {
	return this.tree.head( ) ;
} ;

Sequence.prototype.tail = function ( ) {
	return new Sequence( this.tree.tail( ) ) ;
} ;

Sequence.prototype.last = function ( ) {
	return this.tree.last( ) ;
} ;

Sequence.prototype.init = function ( ) {
	return new Sequence( this.tree.init( ) ) ;
} ;

Sequence.prototype.cons = function ( value ) {
	return new Sequence( this.tree.cons( value ) ) ;
} ;

Sequence.prototype.push = function ( value ) {
	return new Sequence( this.tree.push( value ) ) ;
} ;

Sequence.prototype.append = function ( iterable ) {
	return new Sequence( this.tree.append( iterable ) ) ;
} ;

Sequence.prototype.prepend = function ( iterable ) {
	return new Sequence( this.tree.prepend( iterable ) ) ;
} ;

Sequence.prototype.concat = function ( other ) {
	return new Sequence( this.tree.concat( other.tree ) ) ;
} ;

Sequence.prototype.takeUntil = function ( predicate ) {
	return new Sequence( this.tree.takeUntil( predicate ) ) ;
} ;

Sequence.prototype.dropUntil = function ( predicate ) {
	return new Sequence( this.tree.dropUntil( predicate ) ) ;
} ;

Sequence.prototype.set = function ( index , value ) {

	if ( index < 0 || index >= this.size( ) ) throw new Error( `wrong index '${index}'` ) ;

	const split = this.tree.splitTree( ( m ) => m > index , counter.zero( ) ) ;

	return new Sequence( split.left.push( value ).concat( split.right ) ) ;

} ;

Sequence.prototype.get = function ( index ) {

	if ( index < 0 || index >= this.size( ) ) throw new Error( `wrong index '${index}'` ) ;

	return this.tree.splitTree( ( m ) => m > index , counter.zero( ) ).middle ;

} ;


Sequence.prototype[Symbol.iterator] = function ( ) {
	return this.tree[Symbol.iterator]( ) ;
} ;

Sequence.prototype.split = function ( predicate ) {
	const [ left , right ] = this.tree.split( predicate ) ;
	return [ new Sequence( left ) , new Sequence( right ) ] ;
} ;

return {
	empty : ( ) => new Sequence( empty( counter ) ) ,
	from_iterable : ( iterable ) => new Sequence( empty( counter ) ).append( iterable )
} ;

}

exports.sequence = sequence ;
