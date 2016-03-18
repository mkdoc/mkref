var ref = require('../index')
  , ast = require('mkast');
ast.src('[example]: http://example.com')
  .pipe(ref())
  .pipe(ast.stringify({indent: 2}))
  .pipe(process.stdout);
