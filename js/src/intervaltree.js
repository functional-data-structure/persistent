
function intervaltree ( empty , M ) {

const atleast = function ( k , [ _ , n ] ) {
	return M.b.measure( k ) <= n ;
} ;

const greater = function ( k , [ n , _ ] ) {
	return n > M.a.measure( k ) ;
} ;

const matches = function* ( low , tree ) {

	const xs = tree.dropUntil( ( m ) => atleast( low ) ) ;

	if ( xs.empty( ) ) return ;

	yield xs.head( ) ;

	yield* matches( low , xs.tail( ) ) ;

} ;

const Interval = function ( low , high ) {
	this.low = low ;
	this.high = high ;
} ;

const IntervalTree = function ( tree ) {
	this.tree = tree ;
} ;

IntervalTree.prototype.add = function ( low , high ) {
	return new IntervalTree( this.tree.push( new Interval( low , high ) ) ) ;
} ;

IntervalTree.prototype.empty = function ( ) {
	return this.tree.empty( ) ;
} ;

IntervalTree.prototype.measure = function ( ) {
	return this.tree.measure( ) ;
} ;

IntervalTree.prototype[Symbol.iterator] = function ( ) {
	return this.tree[Symbol.iterator]( ) ;
} ;

IntervalTree.prototype.intervalSearch = function ( interval ) {

	if ( !atleast( interval.low , t.measure( ) ) ) return null ;

	const { middle } = t.tree.splitTree( ( m ) => atleast( i , m ) , M.zero( ) ) ;

	return middle.low > interval.high ? null : middle ;

} ;

IntervalTree.prototype.intervalMatch = function ( interval ) {

	return matches( interval.low , this.tree.takeUntil( ( m ) => greater( interval.high ) ) ) ;

} ;

return {
	empty : ( ) => new IntervalTree( empty( M ) ) ,
	from_iterable : ( iterable ) => new IntervalTree( empty( M ) ).append( iterable )
} ;

}

exports.intervaltree = intervaltree ;
