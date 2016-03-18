var ref = require('../index')
  , ast = require('mkast')
  , walk = ast.walk()
  , stream = ref();
walk
  .pipe(stream)
  .pipe(ref.serialize({indent: 2}))
  .pipe(process.stdout);
walk.end(ast.parse('[example]: http://example.com'));
