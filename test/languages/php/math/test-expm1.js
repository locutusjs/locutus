XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var expm1 = require('/Users/kvz/code/phpjs/src/php/math/expm1.js')

describe('php', function () {
  describe('math.expm1.js', function () {
    it('should pass test 1', function (done) {
      expm1(1e-15);
      expected = 1.0000000000000007e-15
      result = expm1(1e-15);
      expect(result).to.equal(expected)
      done()
    })
  })
})