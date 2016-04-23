XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_null = require('/Users/kvz/code/phpjs/src/php/var/is_null.js')

describe('php', function () {
  describe('var.is_null.js', function () {
    it('should pass test 1', function (done) {
      is_null('23');
      expected = false
      result = is_null('23');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      is_null(null);
      expected = true
      result = is_null(null);
      expect(result).to.equal(expected)
      done()
    })
  })
})