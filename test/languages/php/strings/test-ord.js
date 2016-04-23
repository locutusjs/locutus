XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ord = require('/Users/kvz/code/phpjs/src/php/strings/ord.js')

describe('php', function () {
  describe('strings.ord.js', function () {
    it('should pass test 1', function (done) {
      ord('K');
      expected = 75
      result = ord('K');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      ord('\uD800\uDC00'); // surrogate pair to create a single Unicode character
      expected = 65536
      result = ord('\uD800\uDC00'); // surrogate pair to create a single Unicode character
      expect(result).to.equal(expected)
      done()
    })
  })
})