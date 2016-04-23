XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_finite = require('/Users/kvz/code/phpjs/src/php/math/is_finite.js')

describe('php', function () {
  describe('math.is_finite.js', function () {
    it('should pass test 1', function (done) {
      is_finite(Infinity);
      expected = false
      result = is_finite(Infinity);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      is_finite(-Infinity);
      expected = false
      result = is_finite(-Infinity);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      is_finite(0);
      expected = true
      result = is_finite(0);
      expect(result).to.equal(expected)
      done()
    })
  })
})