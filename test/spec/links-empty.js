var expect = require('chai').expect
  , fs = require('fs')
  , mkast = require('mkast')
  , Node = mkast.Node
  , parser = new mkast.Parser()
  , mkref = require('../../index')
  , utils = require('../util');

describe('mkref:', function() {

  it('should not append document with no link refs', function(done) {
    var source = 'test/fixtures/links-empty.md'
      , target = 'target/links-empty.json.log'
      , data = parser.parse('' + fs.readFileSync(source))

    // mock file for correct relative path
    // mkcat normally injects this info
    data.file = source;

    var input = mkast.serialize(data)
      , output = fs.createWriteStream(target)
      , opts = {input: input, output: output};
    
    mkref(opts);

    output.once('finish', function() {
      var result = utils.result(target);

      // open document
      expect(result[0].type).to.eql(Node.DOCUMENT);
      // mock document paragraph
      expect(result[1].type).to.eql(Node.PARAGRAPH);
      // eof main document
      expect(result[2].type).to.eql(Node.EOF);

      // assert on no additional data in the stream
      expect(result[3]).to.eql(undefined);

      done();
    })
  });

});
