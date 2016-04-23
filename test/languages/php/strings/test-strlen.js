XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strlen = require('/Users/kvz/code/phpjs/src/php/strings/strlen.js')

describe('php', function () {
  describe('strings.strlen.js', function () {
    it('should pass test 1', function (done) {
      strlen('Kevin van Zonneveld');
      expected = 19
      result = strlen('Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      ini_set('unicode.semantics', 'on');
      strlen('A\ud87e\udc04Z');
      expected = 3
ini_set('unicode.semantics', 'on');
      result = strlen('A\ud87e\udc04Z');
      expect(result).to.equal(expected)
      done()
    })
  })
})