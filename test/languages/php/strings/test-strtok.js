XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strtok = require('/Users/kvz/code/phpjs/src/php/strings/strtok.js')

describe('php', function () {
  describe('strings.strtok.js', function () {
    it('should pass test 1', function (done) {
      $string = "\t\t\t\nThis is\tan example\nstring\n";
      $tok = strtok($string, " \n\t");
      $b = '';
      while ($tok !== false) {$b += "Word="+$tok+"\n"; $tok = strtok(" \n\t");}
      $b
      expected = "Word=This\nWord=is\nWord=an\nWord=example\nWord=string\n"
$string = "\t\t\t\nThis is\tan example\nstring\n";
$tok = strtok($string, " \n\t");
$b = '';
while ($tok !== false) {$b += "Word="+$tok+"\n"; $tok = strtok(" \n\t");}
      result = $b
      expect(result).to.equal(expected)
      done()
    })
  })
})