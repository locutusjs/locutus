XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_nan = require('/Users/kvz/code/phpjs/src/php/math/is_nan.js')

describe('php', function () {
  describe('math.is_nan.js', function () {
    it('should pass test 1', function (done) {
      is_nan(NaN);
      expected = true
      result = is_nan(NaN);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      is_nan(0);
      expected = false
      result = is_nan(0);
      expect(result).to.equal(expected)
      done()
    })
  })
})