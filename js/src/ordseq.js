
function ordseq ( empty , key ) {

const OrdSeq = function ( tree ) {
	this.tree = tree ;
} ;

OrdSeq.prototype.empty = function ( ) {
	return this.tree.empty( ) ;
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

OrdSeq.prototype.key =
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

	if ( other.empty( ) ) return this ;

	const a = other.head( ) ;
	const k = key.measure( a ) ;

	const [ l , r ] = this.split( ( m ) => m > k ) ;

	return new OrdSeq( l.tree.push( a ).concat( r.merge( other.tail( ) ).tree ) ) ;

} ;

return {
	empty : ( ) => new OrdSeq( empty( key ) ) ,
	from_iterable : ( iterable ) => new OrdSeq( empty( key ) ).append( iterable )
} ;

}

exports.ordseq = ordseq ;
