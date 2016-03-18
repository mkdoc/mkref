var ref = require('../index')
  , ast = require('mkast')
  , walk = ast.walk();
walk
  .pipe(ref())
  .pipe(ast.stringify({indent: 2}))
  .pipe(process.stdout);
walk.end(ast.parse('[example]: http://example.com'));
