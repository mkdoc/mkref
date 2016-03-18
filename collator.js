var through = require('through3')
  , Node = require('mkast').Node
  , attach = require('mkast/lib/attach');

/**
 *  Collates link references.
 *
 *  @module {constructor} AstCollator
 *  @param {Object} [opts] stream options.
 */
function AstCollator(opts) {
  opts = opts || {};
  this.refs = [];
}

/**
 *  Stream transform.
 *
 *  @private {function} transform
 *  @member AstCollator
 *
 *  @param {Array} node input AST node.
 *  @param {String} encoding character encoding.
 *  @param {Function} callback function.
 */
function transform(chunk, encoding, cb) {

  if(Node.is(chunk, Node.DOCUMENT) && Array.isArray(chunk.refs)) {
    this.refs = this.refs.concat(chunk.refs);
  }

  this.push(chunk);
  cb();
}

function flush(cb) {
  if(this.refs.length) {
    var doc = Node.createDocument()
      , para = Node.createNode(Node.PARAGRAPH);

    this.refs.forEach(function(ref) {
      para.appendChild(attach(ref));
    })

    // NOTE: do not append paragraph, push to the stream
    this.push(doc);
    this.push(para);
    this.push(Node.createNode(Node.EOF));
  }
  cb();
}

module.exports = through.transform(transform, flush, {ctor: AstCollator})

