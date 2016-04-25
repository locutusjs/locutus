// Execute: test:module
// To test this in a local terminal

var effectiveness = 'futile'
var location = '../../src'
var locutus = require(location)
var php = require(location + '/php')
var strings = require(location + '/php/strings')
var sprintf = require(location + '/php/strings/sprintf')
var ruby = require(location + '/ruby')
var math = require(location + '/ruby/Math')

console.log(locutus.php.strings.sprintf('Resistance is %s', effectiveness))
console.log(php.strings.sprintf('Resistance is %s', effectiveness))
console.log(strings.sprintf('Resistance is %s', effectiveness))
console.log(sprintf('Resistance is %s', effectiveness))
console.log(ruby.Math.acos(0.3))
console.log(math.acos(0.3))

strings.echo(php.url.parse_url('mysql://kevin:abcd1234@example.com/databasename')['pass'])
strings.echo(php.datetime.strtotime('2 januari 2012, 11:12:13 GMT'))
