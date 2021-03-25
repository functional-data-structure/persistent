
export function ordseq ( empty , key ) {

// probably needs a total order instead of a key measure
// this causes generality problems in the insert, merge, partition and delete
// methods

const OrdSeq = function ( tree ) {
	this.tree = tree ;
} ;

OrdSeq.prototype.isEmpty = function ( ) {
	return this.tree.isEmpty( ) ;
} ;

OrdSeq.prototype.measure = function ( ) {
	return this.tree.measure( ) ;
} ;

OrdSeq.prototype.min =
OrdSeq.prototype.head = function ( ) {
	return this.tree.head( ) ;
} ;

OrdSeq.prototype.tail = function ( ) {
	return new OrdSeq( this.tree.tail( ) ) ;
} ;

OrdSeq.prototype.max =
OrdSeq.prototype.last = function ( ) {
	return this.tree.last( ) ;
} ;

OrdSeq.prototype.init = function ( ) {
	return new OrdSeq( this.tree.init( ) ) ;
} ;

OrdSeq.prototype.takeUntil = function ( predicate ) {
	return new OrdSeq( this.tree.takeUntil( predicate ) ) ;
} ;

OrdSeq.prototype.dropUntil = function ( predicate ) {
	return new OrdSeq( this.tree.dropUntil( predicate ) ) ;
} ;

OrdSeq.prototype[Symbol.iterator] = function ( ) {
	return this.tree[Symbol.iterator]( ) ;
} ;

OrdSeq.prototype.split = function ( predicate ) {
	const [ left , right ] = this.tree.split( predicate ) ;
	return [ new OrdSeq( left ) , new OrdSeq( right ) ] ;
} ;

OrdSeq.prototype.partition = function ( value ) {
	const k = key.measure( value ) ;
	return this.split( ( m ) => m >= k ) ;
} ;

OrdSeq.prototype.insert = function ( value ) {
	const k = key.measure( value ) ;
	const [ left , right ] = this.tree.split( ( m ) => m >= k ) ;
	return new OrdSeq( left.push( value ).concat( right ) ) ;
} ;

OrdSeq.prototype.deleteAll = function ( value ) {
	const k = key.measure( value ) ;
	const [ l , r ] = this.tree.split( ( m ) => m >= k ) ;
	const [ _ , R ] = r.split( ( m ) => m > k ) ;
	return new OrdSeq( l.concat( R ) ) ;
} ;

OrdSeq.prototype.merge = function ( other ) {

	if ( other.isEmpty( ) ) return this ;

	const a = other.head( ) ;
	const k = key.measure( a ) ;

	const [ l , r ] = this.split( ( m ) => m > k ) ;

	return new OrdSeq( l.tree.push( a ).concat( r.merge( other.tail( ) ).tree ) ) ;

} ;

OrdSeq.prototype.insertValues = function ( values ) {

	let s = this ;

	for ( const value of values ) s = s.insert( value ) ;

	return s ;

} ;

return {
	empty : ( ) => new OrdSeq( empty( key ) ) ,
	from : ( iterable ) => new OrdSeq( empty( key ) ).insertValues( iterable )
} ;

}
