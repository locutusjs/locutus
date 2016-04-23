XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var bindec = require('/Users/kvz/code/phpjs/src/php/math/bindec.js')

describe('php', function () {
  describe('math.bindec.js', function () {
    it('should pass test 1', function (done) {
      bindec('110011');
      expected = 51
      result = bindec('110011');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      bindec('000110011');
      expected = 51
      result = bindec('000110011');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      bindec('111');
      expected = 7
      result = bindec('111');
      expect(result).to.equal(expected)
      done()
    })
  })
})