XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var hexdec = require('/Users/kvz/code/phpjs/src/php/math/hexdec.js')

describe('php', function () {
  describe('math.hexdec.js', function () {
    it('should pass test 1', function (done) {
      hexdec('that');
      expected = 10
      result = hexdec('that');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      hexdec('a0');
      expected = 160
      result = hexdec('a0');
      expect(result).to.equal(expected)
      done()
    })
  })
})