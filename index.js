var ast = require('mkast')
  , Collator = require('./collator');

/**
 *  Gets the link reference collation stream.
 *
 *  @function ref
 *  @param {Object} [opts] processing options.
 *  @param {Function} [cb] callback function.
 *
 *  @option {Readable} [input] input stream.
 *  @option {Writable} [output] output stream.
 *
 *  @returns an output stream.
 */
function ref(opts, cb) {

  opts = opts || {};
  opts.input = opts.input;
  opts.output = opts.output;

  var stream = new Collator();

  if(!opts.input || !opts.output) {
    return stream; 
  }

  ast.parser(opts.input)
    .pipe(stream)
    .pipe(ast.stringify())
    .pipe(opts.output);

  if(cb) {
    opts.output
      .once('error', cb)
      .once('finish', cb);
  }

  return opts.output;
}

module.exports = ref;
