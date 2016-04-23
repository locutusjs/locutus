XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var log10 = require('/Users/kvz/code/phpjs/src/php/math/log10.js')

describe('php', function () {
  describe('math.log10.js', function () {
    it('should pass test 1', function (done) {
      log10(10);
      expected = 1
      result = log10(10);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      log10(1);
      expected = 0
      result = log10(1);
      expect(result).to.equal(expected)
      done()
    })
  })
})