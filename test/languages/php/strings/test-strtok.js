XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strtok = require('/Users/kvz/code/phpjs/src/php/strings/strtok.js')

describe('php.strings.strtok.js', function () {
  it('should pass example 1', function (done) {
    $string = "\t\t\t\nThis is\tan example\nstring\n";
    $tok = strtok($string, " \n\t");
    $b = '';
    while ($tok !== false) {$b += "Word="+$tok+"\n"; $tok = strtok(" \n\t");}
    $b
    var expected = "Word=This\nWord=is\nWord=an\nWord=example\nWord=string\n"
$string = "\t\t\t\nThis is\tan example\nstring\n";
$tok = strtok($string, " \n\t");
$b = '';
while ($tok !== false) {$b += "Word="+$tok+"\n"; $tok = strtok(" \n\t");}
    var result = $b
    expect(result).to.deep.equal(expected)
    done()
  })
})