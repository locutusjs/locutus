XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var levenshtein = require('/Users/kvz/code/phpjs/src/php/strings/levenshtein.js')

describe('php', function () {
  describe('strings.levenshtein.js', function () {
    it('should pass test 1', function (done) {
      levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld');
      expected = 3
      result = levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      levenshtein("carrrot", "carrots");
      expected = 2
      result = levenshtein("carrrot", "carrots");
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      levenshtein("carrrot", "carrots", 2, 3, 4);
      expected = 6
      result = levenshtein("carrrot", "carrots", 2, 3, 4);
      expect(result).to.equal(expected)
      done()
    })
  })
})