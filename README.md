# Link References

[![Build Status](https://travis-ci.org/mkdoc/mkref.svg?v=3)](https://travis-ci.org/mkdoc/mkref)
[![npm version](http://img.shields.io/npm/v/mkref.svg?v=3)](https://npmjs.org/package/mkref)
[![Coverage Status](https://coveralls.io/repos/mkdoc/mkref/badge.svg?branch=master&service=github&v=3)](https://coveralls.io/github/mkdoc/mkref?branch=master)

> Collect link references

Collates link references from all documents in the stream and flushes a paragraph with the
link references at the end of the stream.

## Install

```
npm i mkref --save
```

For the command line interface install [mkdoc][] globally (`npm i -g mkdoc`).

## Usage

```javascript
var mkref = require('mkref');
mkref(); // read from process.stdin, write to process.stdout
```

## API

### gen

```javascript
gen([opts][, cb])
```

Append or prepend a message string.

The message string is parsed as markdown and written to the end of the
document unless `prepend` is given.

The document node itself is omitted; it's content nodes are written to
the stream.

Returns an output stream.

* `opts` Object processing options.
* `cb` Function callback function.

#### Options

* `input` Readable input stream.
* `output` Writable output stream.
* `message` String generator message.
* `prepend` Boolean prepend message to the stream.

## License

MIT

