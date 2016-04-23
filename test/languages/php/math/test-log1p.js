XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var log1p = require('/Users/kvz/code/phpjs/src/php/math/log1p.js')

describe('php', function () {
  describe('math.log1p.js', function () {
    it('should pass test 1', function (done) {
      log1p(1e-15);
      expected = 9.999999999999995e-16
      result = log1p(1e-15);
      expect(result).to.equal(expected)
      done()
    })
  })
})