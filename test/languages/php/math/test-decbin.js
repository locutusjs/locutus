XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var decbin = require('/Users/kvz/code/phpjs/src/php/math/decbin.js')

describe('php', function () {
  describe('math.decbin.js', function () {
    it('should pass test 1', function (done) {
      decbin(12);
      expected = '1100'
      result = decbin(12);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      decbin(26);
      expected = '11010'
      result = decbin(26);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      decbin('26');
      expected = '11010'
      result = decbin('26');
      expect(result).to.equal(expected)
      done()
    })
  })
})