```js
import { Measures } from 'aureooms-js-measure' ;
import { empty } from 'aureooms-js-fingertree' ;
import persistent from 'aureooms-js-persistent' ;

let Seq = persistent.seq( empty , Measures.LEN ) ;
let Heap = persistent.heap( empty , Measures.MAX ) ;
let OrdSeq = persistent.ordseq( empty , Measures.KEY ) ;
let IndOrdSeq = persistent.indordseq( empty , Measures.KEY , Measures.LEN , Measures.KEY_LEN ) ;
let IntervalTree = persistent.intervaltree( empty , Measures.INTERVAL ) ;

let seq = Seq.from( 'abc' ) ;
seq.get( 1 ) ; // 'b'

let heap = Heap.from( [ 1 , 3 , 2 ] ) ;
heap.extractMax( ) ; // [ 3 , Heap{1,2} ]

let ordseq = OrdSeq.from( 'abracadabra' ) ;
[ ...ordseq ] ; // aaaaabbcdrr

let indordseq = IndOrdSeq.from( 'abracadabra' ) ;
[ ...indordseq ] ; // aaaaabbcdrr
indordseq.get( 7 ) ; // 'c'

let intervaltree = IntervalTree.from( [ [ 1 , 5 ] , [ 4 , 9 ] ] ) ;
intervaltree.intervalSearch( [ -7 , 3 ] ) ; // [ 1 , 5 ]
intervaltree.intervalSearch( [ 7 , 12 ] ) ; // [ 4 , 9 ]
intervaltree.intervalSearch( [ 11 , 12 ] ) ; // null
```
