[js-persistent](http://aureooms.github.io/js-persistent)
==

Persistent data structures code bricks for JavaScript. Parent is [aureooms/js-data-structures](https://github.com/aureooms/js-data-structures).

[![NPM license](http://img.shields.io/npm/l/aureooms-js-persistent.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-persistent/master/LICENSE)
[![NPM version](http://img.shields.io/npm/v/aureooms-js-persistent.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-persistent)
[![Bower version](http://img.shields.io/bower/v/aureooms-js-persistent.svg?style=flat)](http://bower.io/search/?q=aureooms-js-persistent)
[![Build Status](http://img.shields.io/travis/aureooms/js-persistent.svg?style=flat)](https://travis-ci.org/aureooms/js-persistent)
[![Coverage Status](http://img.shields.io/coveralls/aureooms/js-persistent.svg?style=flat)](https://coveralls.io/r/aureooms/js-persistent)
[![Dependencies Status](http://img.shields.io/david/aureooms/js-persistent.svg?style=flat)](https://david-dm.org/aureooms/js-persistent#info=dependencies)
[![devDependencies Status](http://img.shields.io/david/dev/aureooms/js-persistent.svg?style=flat)](https://david-dm.org/aureooms/js-persistent#info=devDependencies)
[![Code Climate](http://img.shields.io/codeclimate/github/aureooms/js-persistent.svg?style=flat)](https://codeclimate.com/github/aureooms/js-persistent)
[![NPM downloads per month](http://img.shields.io/npm/dm/aureooms-js-persistent.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-persistent)
[![GitHub issues](http://img.shields.io/github/issues/aureooms/js-persistent.svg?style=flat)](https://github.com/aureooms/js-persistent/issues)
[![Inline docs](http://inch-ci.org/github/aureooms/js-persistent.svg?branch=master&style=shields)](http://inch-ci.org/github/aureooms/js-persistent)

Can be managed through [jspm](https://github.com/jspm/jspm-cli),
[duo](https://github.com/duojs/duo),
[component](https://github.com/componentjs/component),
[bower](https://github.com/bower/bower),
[ender](https://github.com/ender-js/Ender),
[jam](https://github.com/caolan/jam),
[spm](https://github.com/spmjs/spm),
and [npm](https://github.com/npm/npm).

## Install

### jspm
```terminal
jspm install github:aureooms/js-persistent
# or
jspm install npm:aureooms-js-persistent
```
### duo
No install step needed for duo!

### component
```terminal
component install aureooms/js-persistent
```

### bower
```terminal
bower install aureooms-js-persistent
```

### ender
```terminal
ender add aureooms-js-persistent
```

### jam
```terminal
jam install aureooms-js-persistent
```

### spm
```terminal
spm install aureooms-js-persistent --save
```

### npm
```terminal
npm install aureooms-js-persistent --save
```

## Require
### jspm
```js
let persistent = require( "github:aureooms/js-persistent" ) ;
// or
import persistent from 'aureooms-js-persistent' ;
```
### duo
```js
let persistent = require( "aureooms/js-persistent" ) ;
```

### component, ender, spm, npm
```js
let persistent = require( "aureooms-js-persistent" ) ;
```

### bower
The script tag exposes the global variable `persistent`.
```html
<script src="bower_components/aureooms-js-persistent/js/dist/persistent.min.js"></script>
```
Alternatively, you can use any tool mentioned [here](http://bower.io/docs/tools/).

### jam
```js
require( [ "aureooms-js-persistent" ] , function ( persistent ) { ... } ) ;
```

## Children

This package has several children:

  - [aureooms/js-fingertree](https://github.com/aureooms/js-fingertree): finger trees code bricks for JavaScript

## Use

```js
let measure = require( 'aureooms-js-measure' ) ;
let fingertree = require( 'aureooms-js-fingertree' ) ;

let Seq = persistent.seq( fingertree.empty , measure.Measures.SIZE ) ;
let Heap = persistent.heap( fingertree.empty , measure.Measures.PRIO ) ;
let OrdSeq = persistent.ordseq( fingertree.empty , measure.Measures.KEY ) ;
let IntervalTree = persistent.intervaltree( fingertree.empty , measure.Measures.INTERVAL ) ;

let seq = Seq.from( 'abc' ) ;
seq.get( 1 ) ; // 'a'

let heap = Heap.from( [ 1 , 3 , 2 ] ) ;
heap.extractMax( ) ; // [ 3 , Heap{1,2} ]

let ordseq = OrdSeq.from( 'abracadabra' ) ;
[ ...ordseq ] ; // aaaaabbcdrr

let intervaltree = IntervalTree.from( [ [ 1 , 5 ] , [ 4 , 9 ] ] ) ;
intervaltree.intervalSearch( [ -7 , 3 ] ) ; // [ 1 , 5 ]
intervaltree.intervalSearch( [ 7 , 12 ] ) ; // [ 4 , 9 ]
intervaltree.intervalSearch( [ 11 , 12 ] ) ; // null
```

## References

  - [Hinze and Paterson](http://staff.city.ac.uk/~ross/papers/FingerTree.pdf)
