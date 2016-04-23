XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var substr_compare = require('/Users/kvz/code/phpjs/src/php/strings/substr_compare.js')

describe('php', function () {
  describe('strings.substr_compare.js', function () {
    it('should pass test 1', function (done) {
      substr_compare("abcde", "bc", 1, 2);
      expected = 0
      result = substr_compare("abcde", "bc", 1, 2);
      expect(result).to.equal(expected)
      done()
    })
  })
})