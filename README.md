[js-persistent](http://aureooms.github.io/js-persistent)
==

Persistent data structures code bricks for JavaScript. Parent is [aureooms/js-data-structures](https://github.com/aureooms/js-data-structures).

```js
let Seq = persistent.seq( fingertree.empty , LEN ) ;
let Heap = persistent.heap( fingertree.empty , MAX ) ;
let OrdSeq = persistent.ordseq( fingertree.empty , KEY ) ;
let IndOrdSeq = persistent.indordseq( fingertree.empty , KEY , LEN , KEY_LEN ) ;
let IntervalTree = persistent.intervaltree( fingertree.empty , INTERVAL ) ;
```


[![NPM license](http://img.shields.io/npm/l/aureooms-js-persistent.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-persistent/master/LICENSE)
[![NPM version](http://img.shields.io/npm/v/aureooms-js-persistent.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-persistent)
[![Build Status](http://img.shields.io/travis/aureooms/js-persistent.svg?style=flat)](https://travis-ci.org/aureooms/js-persistent)
[![Coverage Status](http://img.shields.io/coveralls/aureooms/js-persistent.svg?style=flat)](https://coveralls.io/r/aureooms/js-persistent)
[![Dependencies Status](http://img.shields.io/david/aureooms/js-persistent.svg?style=flat)](https://david-dm.org/aureooms/js-persistent#info=dependencies)
[![devDependencies Status](http://img.shields.io/david/dev/aureooms/js-persistent.svg?style=flat)](https://david-dm.org/aureooms/js-persistent#info=devDependencies)
[![Code Climate](http://img.shields.io/codeclimate/github/aureooms/js-persistent.svg?style=flat)](https://codeclimate.com/github/aureooms/js-persistent)
[![NPM downloads per month](http://img.shields.io/npm/dm/aureooms-js-persistent.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-persistent)
[![GitHub issues](http://img.shields.io/github/issues/aureooms/js-persistent.svg?style=flat)](https://github.com/aureooms/js-persistent/issues)
[![Documentation](https://aureooms.github.io/js-persistent/badge.svg)](https://aureooms.github.io/js-persistent/source.html)


Can be managed through [jspm](https://github.com/jspm/jspm-cli)
and [npm](https://github.com/npm/npm).


## Children

This package has several children:

  - [aureooms/js-fingertree](https://github.com/aureooms/js-fingertree): Finger tree data structure for JavaScript

## Use

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

## References

  - [Hinze and Paterson](http://staff.city.ac.uk/~ross/papers/FingerTree.pdf)

