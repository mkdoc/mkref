var through = require('through3')
  , Node = require('mkast').Node;

/**
 *  Collates link references and appends a document to the stream with a 
 *  paragraph containing the link references.
 *
 *  Each link reference in the paragraph has a type of `link` so the renderer 
 *  will be invoked and adds an `_linkType` field so that the renderer can 
 *  distinguish the type of link.
 *
 *  @module {constructor} LinkReferences
 *  @param {Object} [opts] stream options.
 */
function LinkReferences(opts) {
  opts = opts || {};
  this.refs = [];
}

/**
 *  Stream transform.
 *
 *  @private {function} transform
 *  @member LinkReferences
 *
 *  @param {Array} node input AST node.
 *  @param {String} encoding character encoding.
 *  @param {Function} callback function.
 */
function transform(chunk, encoding, cb) {
  if(Node.is(chunk, Node.DOCUMENT) && chunk.refmap) {
    this.refs.push(chunk.refmap);
  }
  this.push(chunk);
  cb();
}

function flush(cb) {
  var i
    , k
    , links = []
    , link;

  //console.error('got refs %s', this.refs.length);

  for(i = 0;i < this.refs.length;i++) {
    for(k in this.refs[i]) {
      link = 
        Node.createNode(
          Node.LINK, {
            _label: k, 
            _destination: this.refs[i][k].destination,
            _title: this.refs[i][k].title,
            _linkType: 'ref'
          }
        );
      link.appendChild(Node.createNode(Node.TEXT, {literal: k}))
      links.push(link);
    } 
  }

  if(links.length) {
    var doc = Node.createDocument()
      , para = Node.createNode(Node.PARAGRAPH);

    doc._linkRefs = true;

    links.forEach(function(ref) {
      para.appendChild(ref);
    })

    // NOTE: do not append paragraph, push to the stream
    this.push(doc);
    this.push(para);
    this.push(Node.createNode(Node.EOF, {_linkRefs: true}));
  }
  cb();
}

module.exports = through.transform(transform, flush, {ctor: LinkReferences})

