# Link References

[![Build Status](https://travis-ci.org/mkdoc/mkref.svg?v=3)](https://travis-ci.org/mkdoc/mkref)
[![npm version](http://img.shields.io/npm/v/mkref.svg?v=3)](https://npmjs.org/package/mkref)
[![Coverage Status](https://coveralls.io/repos/mkdoc/mkref/badge.svg?branch=master&service=github&v=3)](https://coveralls.io/github/mkdoc/mkref?branch=master)

> Collect link references

Collates link references from all documents in the stream and flushes a paragraph with the link references at the end of the stream.

## Install

```
npm i mkref --save
```

For the command line interface install [mkdoc][] globally (`npm i -g mkdoc`).

## Usage

Create the stream and write a [commonmark][] document:

```javascript
var ref = require('mkref')
  , ast = require('mkast')
  , walk = ast.walk();
walk
  .pipe(ref())
  .pipe(ast.stringify({indent: 2}))
  .pipe(process.stdout);
walk.end(ast.parse('[example]: http://example.com'));
```

## API

### ref

```javascript
ref([opts][, cb])
```

Gets the link reference collation stream.

Returns an output stream.

* `opts` Object processing options.
* `cb` Function callback function.

#### Options

* `input` Readable input stream.
* `output` Writable output stream.

## License

MIT

Generated by [mkdoc](https://github.com/mkdoc/mkdoc).

[mkdoc]: https://github.com/mkdoc/mkdoc
[mkparse]: https://github.com/mkdoc/mkparse
[commonmark]: http://commonmark.org
[jshint]: http://jshint.com
[jscs]: http://jscs.info

