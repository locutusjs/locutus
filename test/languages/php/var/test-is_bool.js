XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_bool = require('/Users/kvz/code/phpjs/src/php/var/is_bool.js')

describe('php', function () {
  describe('var.is_bool.js', function () {
    it('should pass test 1', function (done) {
      is_bool(false);
      expected = true
      result = is_bool(false);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      is_bool(0);
      expected = false
      result = is_bool(0);
      expect(result).to.equal(expected)
      done()
    })
  })
})