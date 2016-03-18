var mkast = require('mkast')
  , Collator = require('./collator')
  , Serialize = require('mkast/lib/serialize');

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

  var stream = new Collator()
    , serialize = new Serialize();

  if(!opts.input || !opts.output) {
    return stream; 
  }

  // pass through stream, we append or prepend
  mkast.parser(opts.input)
    .pipe(stream)
    .pipe(serialize)
    .pipe(opts.output);

  if(cb) {
    opts.output
      .once('error', cb)
      .once('finish', cb);
  }

  return opts.output;
}

module.exports = ref;
