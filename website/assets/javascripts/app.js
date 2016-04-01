var path = require('path');
var fs   = require('fs');
process.chdir(__dirname);

console.log([
  // Non-bower dependencies
  'dep/ender.js',
  'dep/octopress.js',
  // Bower dependencies
  '../bower/jquery/dist/jquery.js',
  '../bower/underscore/underscore.js'
  // '../bower/prism/prism.js',
  // '../bower/prism/components/prism-bash.js',
  // '../bower/prism/components/prism-coffeescript.js',
  // '../bower/prism/components/prism-go.js',
  // '../bower/prism/components/prism-markup.js',
  // '../bower/prism/components/prism-php.js',
  // '../bower/prism/components/prism-ruby.js',
].map(function (str) {
  var relative = path.resolve(str);

  // Throws error if not exist:
  fs.accessSync(relative, fs.F_OK);
  return relative;
}).join(' '));
