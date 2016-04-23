XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var substr_count = require('/Users/kvz/code/phpjs/src/php/strings/substr_count.js')

describe('php', function () {
  describe('strings.substr_count.js', function () {
    it('should pass test 1', function (done) {
      substr_count('Kevin van Zonneveld', 'e');
      expected = 3
      result = substr_count('Kevin van Zonneveld', 'e');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      substr_count('Kevin van Zonneveld', 'K', 1);
      expected = 0
      result = substr_count('Kevin van Zonneveld', 'K', 1);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      substr_count('Kevin van Zonneveld', 'Z', 0, 10);
      expected = false
      result = substr_count('Kevin van Zonneveld', 'Z', 0, 10);
      expect(result).to.equal(expected)
      done()
    })
  })
})