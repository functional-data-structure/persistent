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


[![License](https://img.shields.io/github/license/aureooms/js-persistent.svg)](https://raw.githubusercontent.com/aureooms/js-persistent/master/LICENSE)
[![Version](https://img.shields.io/npm/v/@aureooms/js-persistent.svg)](https://www.npmjs.org/package/@aureooms/js-persistent)
[![Build](https://img.shields.io/travis/aureooms/js-persistent/master.svg)](https://travis-ci.org/aureooms/js-persistent/branches)
[![Dependencies](https://img.shields.io/david/aureooms/js-persistent.svg)](https://david-dm.org/aureooms/js-persistent)
[![Dev dependencies](https://img.shields.io/david/dev/aureooms/js-persistent.svg)](https://david-dm.org/aureooms/js-persistent?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/js-persistent.svg)](https://github.com/aureooms/js-persistent/issues)
[![Downloads](https://img.shields.io/npm/dm/@aureooms/js-persistent.svg)](https://www.npmjs.org/package/@aureooms/js-persistent)

[![Code issues](https://img.shields.io/codeclimate/issues/aureooms/js-persistent.svg)](https://codeclimate.com/github/aureooms/js-persistent/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/aureooms/js-persistent.svg)](https://codeclimate.com/github/aureooms/js-persistent/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/aureooms/js-persistent/master.svg)](https://codecov.io/gh/aureooms/js-persistent)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/aureooms/js-persistent.svg)](https://codeclimate.com/github/aureooms/js-persistent/trends/technical_debt)
[![Documentation](http://aureooms.github.io/js-persistent/badge.svg)](http://aureooms.github.io/js-persistent/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@aureooms/js-persistent)](https://bundlephobia.com/result?p=@aureooms/js-persistent)


## Children

This package has several children:

  - [aureooms/js-fingertree](https://github.com/aureooms/js-fingertree): Finger tree data structure for JavaScript


## References

  - [Hinze and Paterson](http://staff.city.ac.uk/~ross/papers/FingerTree.pdf)

