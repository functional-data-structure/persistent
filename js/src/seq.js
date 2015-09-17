
function seq ( empty , size ) {

const Seq = function ( tree ) {
	this.tree = tree ;
} ;

Seq.prototype.empty = function ( ) {
	return this.tree.empty( ) ;
} ;

Seq.prototype.measure =
Seq.prototype.len = function ( ) {
	return this.tree.measure( ) ;
} ;

Seq.prototype.head = function ( ) {
	return this.tree.head( ) ;
} ;

Seq.prototype.tail = function ( ) {
	return new Seq( this.tree.tail( ) ) ;
} ;

Seq.prototype.last = function ( ) {
	return this.tree.last( ) ;
} ;

Seq.prototype.init = function ( ) {
	return new Seq( this.tree.init( ) ) ;
} ;

Seq.prototype.cons = function ( value ) {
	return new Seq( this.tree.cons( value ) ) ;
} ;

Seq.prototype.push = function ( value ) {
	return new Seq( this.tree.push( value ) ) ;
} ;

Seq.prototype.append = function ( iterable ) {
	return new Seq( this.tree.append( iterable ) ) ;
} ;

Seq.prototype.prepend = function ( iterable ) {
	return new Seq( this.tree.prepend( iterable ) ) ;
} ;

Seq.prototype.concat = function ( other ) {
	return new Seq( this.tree.concat( other.tree ) ) ;
} ;

Seq.prototype.takeUntil = function ( predicate ) {
	return new Seq( this.tree.takeUntil( predicate ) ) ;
} ;

Seq.prototype.dropUntil = function ( predicate ) {
	return new Seq( this.tree.dropUntil( predicate ) ) ;
} ;

Seq.prototype.set = function ( index , value ) {

	if ( index < 0 || index >= this.len( ) ) throw new Error( `wrong index '${index}'` ) ;

	const split = this.tree.splitTree( ( m ) => m > index , size.zero( ) ) ;

	return new Seq( split.left.push( value ).concat( split.right ) ) ;

} ;

Seq.prototype.get = function ( index ) {

	if ( index < 0 || index >= this.len( ) ) throw new Error( `wrong index '${index}'` ) ;

	return this.tree.splitTree( ( m ) => m > index , size.zero( ) ).middle ;

} ;


Seq.prototype[Symbol.iterator] = function ( ) {
	return this.tree[Symbol.iterator]( ) ;
} ;

Seq.prototype.split = function ( predicate ) {
	const [ left , right ] = this.tree.split( predicate ) ;
	return [ new Seq( left ) , new Seq( right ) ] ;
} ;

Seq.prototype.splitAt = function ( index ) {
	return this.split( ( m ) => m > index ) ;
} ;

return {
	empty : ( ) => new Seq( empty( size ) ) ,
	from : ( iterable ) => new Seq( empty( size ) ).append( iterable )
} ;

}

exports.seq = seq ;
