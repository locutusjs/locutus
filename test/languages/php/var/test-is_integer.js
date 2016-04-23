XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_integer = require('/Users/kvz/code/phpjs/src/php/var/is_integer.js')

describe('php', function () {
  describe('var.is_integer.js', function () {
    it('should pass test 1', function (done) {
      is_integer(186.31);
      expected = false
      result = is_integer(186.31);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      is_integer(12);
      expected = true
      result = is_integer(12);
      expect(result).to.equal(expected)
      done()
    })
  })
})