
export function intervaltree ( empty , M ) {

const atleast = function ( k , [ _ , n ] ) {
	return k <= n ;
} ;

const greater = function ( k , [ n , _ ] ) {
	return n > k ;
} ;

const matches = function* ( low , tree ) {

	const xs = tree.dropUntil( ( m ) => atleast( low , m ) ) ;

	if ( xs.empty( ) ) return ;

	yield xs.head( ) ;

	yield* matches( low , xs.tail( ) ) ;

} ;

const IntervalTree = function ( tree ) {
	this.tree = tree ;
} ;

IntervalTree.prototype.empty = function ( ) {
	return this.tree.empty( ) ;
} ;

IntervalTree.prototype.measure = function ( ) {
	return this.tree.measure( ) ;
} ;

IntervalTree.prototype.head = function ( ) {
	return this.tree.head( ) ;
} ;

IntervalTree.prototype.tail = function ( ) {
	return new IntervalTree( this.tree.tail( ) ) ;
} ;

IntervalTree.prototype.last = function ( ) {
	return this.tree.last( ) ;
} ;

IntervalTree.prototype.init = function ( ) {
	return new IntervalTree( this.tree.init( ) ) ;
} ;

IntervalTree.prototype.takeUntil = function ( predicate ) {
	return new IntervalTree( this.tree.takeUntil( predicate ) ) ;
} ;

IntervalTree.prototype.dropUntil = function ( predicate ) {
	return new IntervalTree( this.tree.dropUntil( predicate ) ) ;
} ;

IntervalTree.prototype.split = function ( predicate ) {
	const [ left , right ] = this.tree.split( predicate ) ;
	return [ new IntervalTree( left ) , new IntervalTree( right ) ] ;
} ;

IntervalTree.prototype[Symbol.iterator] = function ( ) {
	return this.tree[Symbol.iterator]( ) ;
} ;

IntervalTree.prototype.insert = function ( interval ) {
	const k = M.measure( interval )[0] ;
	const [ left , right ] = this.tree.split( ( m ) => m[0] >= k ) ;
	return new IntervalTree( left.push( interval ).concat( right ) ) ;
} ;

IntervalTree.prototype.merge = function ( other ) {

	if ( other.empty( ) ) return this ;

	const a = other.head( ) ;
	const k = M.measure( a )[0] ;

	const [ l , r ] = this.split( ( m ) => m[0] > k ) ;

	return new IntervalTree( l.tree.push( a ).concat( r.merge( other.tail( ) ).tree ) ) ;

} ;

IntervalTree.prototype.insertValues = function ( values ) {

	let s = this ;

	for ( const value of values ) s = s.insert( value ) ;

	return s ;

} ;

IntervalTree.prototype.intervalSearch = function ( interval ) {

	if ( !atleast( interval[0] , this.measure( ) ) ) return null ;

	const k = M.measure( interval )[0] ;

	const { middle } = this.tree.splitTree( ( m ) => atleast( k , m ) , M.zero( ) ) ;

	return middle[0] > interval[1] ? null : middle ;

} ;

IntervalTree.prototype.intervalMatch = function ( interval ) {

	const k = M.measure( interval )[1] ;
	return matches( interval[0] , this.tree.takeUntil( ( m ) => greater( k , m ) ) ) ;

} ;


return {
	empty : ( ) => new IntervalTree( empty( M ) ) ,
	from : ( iterable ) => new IntervalTree( empty( M ) ).insertValues( iterable )
} ;

}
