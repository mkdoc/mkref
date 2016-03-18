var mkref = require('../index')
  , commonmark = require('commonmark')
  , parser = new commonmark.Parser()
  , stream = mkref();
stream.end(parser.parse('[example]: http://example.com'));
