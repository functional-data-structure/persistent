:evergreen_tree:
[@functional-data-structure/persistent](https://functional-data-structure.github.io/persistent)
==

Persistent data structures code bricks for JavaScript. Parent is [js-data-structures](https://github.com/make-github-pseudonymous-again/js-data-structures).

```js
let Seq = persistent.seq( fingertree.empty , LEN ) ;
let Heap = persistent.heap( fingertree.empty , MAX ) ;
let OrdSeq = persistent.ordseq( fingertree.empty , KEY ) ;
let IndOrdSeq = persistent.indordseq( fingertree.empty , KEY , LEN , KEY_LEN ) ;
let IntervalTree = persistent.intervaltree( fingertree.empty , INTERVAL ) ;
```


[![License](https://img.shields.io/github/license/functional-data-structure/persistent.svg)](https://raw.githubusercontent.com/functional-data-structure/persistent/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@functional-data-structure/persistent.svg)](https://www.npmjs.org/package/@functional-data-structure/persistent)
[![Tests](https://img.shields.io/github/workflow/status/functional-data-structure/persistent/ci:cover?event=push&label=tests)](https://github.com/functional-data-structure/persistent/actions/workflows/ci:cover.yml?query=branch:main)
[![Dependencies](https://img.shields.io/librariesio/github/functional-data-structure/persistent.svg)](https://github.com/functional-data-structure/persistent/network/dependencies)
[![GitHub issues](https://img.shields.io/github/issues/functional-data-structure/persistent.svg)](https://github.com/functional-data-structure/persistent/issues)
[![Downloads](https://img.shields.io/npm/dm/@functional-data-structure/persistent.svg)](https://www.npmjs.org/package/@functional-data-structure/persistent)

[![Code issues](https://img.shields.io/codeclimate/issues/functional-data-structure/persistent.svg)](https://codeclimate.com/github/functional-data-structure/persistent/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/functional-data-structure/persistent.svg)](https://codeclimate.com/github/functional-data-structure/persistent/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/functional-data-structure/persistent/main.svg)](https://codecov.io/gh/functional-data-structure/persistent)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/functional-data-structure/persistent.svg)](https://codeclimate.com/github/functional-data-structure/persistent/trends/technical_debt)
[![Documentation](https://functional-data-structure.github.io/persistent/badge.svg)](https://functional-data-structure.github.io/persistent/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@functional-data-structure/persistent)](https://bundlephobia.com/result?p=@functional-data-structure/persistent)


## :baby: Children

This package has one child:

  - :cactus: [@functional-data-structure/finger-tree](https://github.com/functional-data-structure/finger-tree): Finger tree data structure for JavaScript


## :scroll: References

  - [Hinze and Paterson](http://staff.city.ac.uk/~ross/papers/FingerTree.pdf)

