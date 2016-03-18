var ref = require('../index')
  , commonmark = require('commonmark')
  , parser = new commonmark.Parser()
  , stream = ref();
stream.end(parser.parse('[example]: http://example.com'));
