
export function indordseq ( empty , key , size , measure ) {

// probably needs a total order instead of a measure
// this causes generality problems in the insert, merge, partition and delete
// methods

const IndOrdSeq = function ( tree ) {
	this.tree = tree ;
} ;

IndOrdSeq.prototype.empty = function ( ) {
	return this.tree.empty( ) ;
} ;

IndOrdSeq.prototype.measure = function ( ) {
	return this.tree.measure( ) ;
} ;

IndOrdSeq.prototype.min =
IndOrdSeq.prototype.head = function ( ) {
	return this.tree.head( ) ;
} ;

IndOrdSeq.prototype.tail = function ( ) {
	return new IndOrdSeq( this.tree.tail( ) ) ;
} ;

IndOrdSeq.prototype.max =
IndOrdSeq.prototype.last = function ( ) {
	return this.tree.last( ) ;
} ;

IndOrdSeq.prototype.init = function ( ) {
	return new IndOrdSeq( this.tree.init( ) ) ;
} ;

IndOrdSeq.prototype.takeUntil = function ( predicate ) {
	return new IndOrdSeq( this.tree.takeUntil( predicate ) ) ;
} ;

IndOrdSeq.prototype.dropUntil = function ( predicate ) {
	return new IndOrdSeq( this.tree.dropUntil( predicate ) ) ;
} ;

IndOrdSeq.prototype[Symbol.iterator] = function ( ) {
	return this.tree[Symbol.iterator]( ) ;
} ;

IndOrdSeq.prototype.split = function ( predicate ) {
	const [ left , right ] = this.tree.split( predicate ) ;
	return [ new IndOrdSeq( left ) , new IndOrdSeq( right ) ] ;
} ;

IndOrdSeq.prototype.partition = function ( value ) {
	const k = key.measure( value ) ;
	return this.split( m => m[0] >= k ) ;
} ;

IndOrdSeq.prototype.insert = function ( value ) {
	const k = key.measure( value ) ;
	const [ left , right ] = this.tree.split( m => m[0] >= k ) ;
	return new IndOrdSeq( left.push( value ).concat( right ) ) ;
} ;

IndOrdSeq.prototype.deleteAll = function ( value ) {
	const k = key.measure( value ) ;
	const [ l , r ] = this.tree.split( m => m[0] >= k ) ;
	const [ _ , R ] = r.split( m => m[0] > k ) ;
	return new IndOrdSeq( l.concat( R ) ) ;
} ;

IndOrdSeq.prototype.merge = function ( other ) {

	if ( other.empty( ) ) return this ;

	const a = other.head( ) ;
	const k = key.measure( a ) ;

	const [ l , r ] = this.split( m => m[0] > k ) ;

	return new IndOrdSeq( l.tree.push( a ).concat( r.merge( other.tail( ) ).tree ) ) ;

} ;

IndOrdSeq.prototype.insertValues = function ( values ) {

	let s = this ;

	for ( const value of values ) s = s.insert( value ) ;

	return s ;

} ;

IndOrdSeq.prototype.len = function ( ) {
	return this.tree.measure( )[1] ;
} ;

IndOrdSeq.prototype.get = function ( index ) {

	if ( index < 0 || index >= this.len( ) ) throw new Error( `wrong index '${index}'` ) ;

	return this.tree.splitTree( m => m[1] > index , size.zero( ) ).middle ;

} ;

IndOrdSeq.prototype.splitAt = function ( index ) {
	return this.split( m => m[1] > index ) ;
} ;

return {
	empty : ( ) => new IndOrdSeq( empty( measure ) ) ,
	from : ( iterable ) => new IndOrdSeq( empty( measure ) ).insertValues( iterable )
} ;

}
