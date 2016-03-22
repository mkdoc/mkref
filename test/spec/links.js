var expect = require('chai').expect
  , fs = require('fs')
  , mkast = require('mkast')
  , Node = mkast.Node
  , parser = new mkast.Parser()
  , mkref = require('../../index')
  , utils = require('../util');

describe('mkref:', function() {
  
  it('should return stream with no options', function(done) {
    var stream = mkref();
    expect(stream).to.be.an('object');
    done();
  });

  it('should append link references to stream', function(done) {
    var source = 'test/fixtures/links.md'
      , target = 'target/links.json.log'
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

      // link reference document + paragraph
      expect(result[3].type).to.eql(Node.DOCUMENT);
      expect(result[4].type).to.eql(Node.PARAGRAPH);
      expect(result[4].firstChild.type).to.eql(Node.LINK);
      expect(result[4].firstChild.linkType).to.eql('ref');
      expect(result[4].firstChild.firstChild.literal).to.eql('example');
      expect(result[4].firstChild.destination).to.eql('http://example.com');
      expect(result[5].type).to.eql(Node.EOF);

      done();
    })
  });

});
