
export function seq ( empty , size ) {

const Seq = function ( tree ) {
	this.tree = tree ;
} ;

Seq.prototype.isEmpty = function ( ) {
	return this.tree.isEmpty( ) ;
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

Seq.prototype.insert = function ( index , value ) {

	if ( index < 0 || index >= this.len( ) ) throw new Error( `wrong index '${index}'` ) ;

	const [prefix, rest] = this.tree.split( ( m ) => m > index ) ;
	return new Seq(prefix.push(value).concat(rest)) ;

} ;

Seq.prototype.remove = function ( index ) {

	if ( index < 0 || index >= this.len( ) ) throw new Error( `wrong index '${index}'` ) ;

	const { left , right } = this.tree.splitTree( ( m ) => m > index , size.zero( ) ) ;
	return new Seq(left.concat(right)) ;

} ;

Seq.prototype.slice = function ( start = 0 , end = this.len( ) ) {

	if ( start < -this.len( ) || start > this.len( ) ) throw new Error( `wrong start '${start}'` ) ;
	if ( end < -this.len( ) || end > this.len( ) ) throw new Error( `wrong end '${end}'` ) ;

	if ( start < 0 ) start += this.len( ) ;
	if ( end < 0 ) end += this.len( ) ;

	const [ prefix , rest ] = this.tree.split( ( m ) => m > start ) ;
	const [ slice , suffix ] = rest.split( ( m ) => m > end - start ) ;
	return new Seq(slice);

} ;

Seq.prototype.splice = function ( start , deleteCount , ...items ) {

	const length = this.len( ) ;

	if ( start < -length || start >= length ) throw new Error( `wrong start '${start}'` ) ;

	if ( start < 0 ) start += length ;
	else if ( start === length ) {
		return [ new Seq(this.tree.append(items)) , new Seq(empty(size)) ] ;
	}

	const split = this.tree.splitTree( ( m ) => m > start , size.zero( ) ) ;

	if (deleteCount === 1) {
		if (items.length === 0) {
			return [ new Seq(split.left.concat(split.right)) , new Seq(empty(size).push(split.middle)) ] ;
		}
		else {
			return [ new Seq(split.left.append(items).concat(split.right)) , new Seq(empty(size).push(split.middle)) ] ;
		}
	}

	const prefix = split.left ;
	const rest = split.right.cons(split.middle) ;

	if (deleteCount === 0) {
		return [ new Seq(prefix.append(items).concat(rest)) , new Seq(empty(size)) ] ;
	}
	if (deleteCount === undefined) {
		return [ new Seq(prefix.append(items)) , new Seq(rest) ] ;
	}
	const [ deleted , suffix ] = rest.split( ( m ) => m > deleteCount ) ;
	return [ new Seq(prefix.append(items).concat(suffix)) , new Seq(deleted) ] ;

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
