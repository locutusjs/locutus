XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ctype_lower = require('/Users/kvz/code/phpjs/src/php/ctype/ctype_lower.js')

describe('php', function () {
  describe('ctype.ctype_lower.js', function () {
    it('should pass test 1', function (done) {
      ctype_lower('abc');
      expected = true
      result = ctype_lower('abc');
      expect(result).to.equal(expected)
      done()
    })
  })
})