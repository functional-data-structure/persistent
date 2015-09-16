
function heap ( empty , max ) {

let Heap = function ( tree ) {
	this.tree = tree ;
} ;

Heap.prototype.empty = function ( ) {
	return this.tree.empty( ) ;
} ;

Heap.prototype.maxKey =
Heap.prototype.measure = function ( ) {
	return this.tree.measure( ) ;
} ;

Heap.prototype.insert =
Heap.prototype.push = function ( value ) {
	return new Heap( this.tree.push( value ) ) ;
} ;

Heap.prototype.extractMax = function ( ) {
	const ub = this.measure( ) ;
	const split = this.tree.splitTree( ( m ) => m >= ub ) ;
	return [ split.middle , new Heap( split.left.concat( split.right ) ) ] ;
} ;

return {
	empty : ( ) => new Heap( empty( max ) ) ,
	from_iterable : ( iterable ) => new Heap( empty( max ) ).append( iterable )
} ;

}

exports.heap = heap ;
