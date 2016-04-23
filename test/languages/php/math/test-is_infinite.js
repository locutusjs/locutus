XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_infinite = require('/Users/kvz/code/phpjs/src/php/math/is_infinite.js')

describe('php', function () {
  describe('math.is_infinite.js', function () {
    it('should pass test 1', function (done) {
      is_infinite(Infinity);
      expected = true
      result = is_infinite(Infinity);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      is_infinite(-Infinity);
      expected = true
      result = is_infinite(-Infinity);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      is_infinite(0);
      expected = false
      result = is_infinite(0);
      expect(result).to.equal(expected)
      done()
    })
  })
})