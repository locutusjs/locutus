XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ctype_digit = require('/Users/kvz/code/phpjs/src/php/ctype/ctype_digit.js')

describe('php', function () {
  describe('ctype.ctype_digit.js', function () {
    it('should pass test 1', function (done) {
      ctype_digit('150');
      expected = true
      result = ctype_digit('150');
      expect(result).to.equal(expected)
      done()
    })
  })
})