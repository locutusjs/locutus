// Execute: npm run test:browser
// To test this in a local webbrowser with an empty index.html
var sprintf = require('../../src/php/strings/sprintf')
var echo = require('../../src/php/strings/echo')
echo(sprintf('Hey %s', 'you'))
