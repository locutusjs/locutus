var path = require('path');
var fs   = require('fs');
process.chdir(__dirname);

console.log([
  // Non-bower dependencies
  'deps/modernizr-2.0.js'
].map(function (str) {
  var relative = path.resolve(str);

  // Throws error if not exist:
  fs.accessSync(relative, fs.F_OK);
  return relative;
}).join(' '));
