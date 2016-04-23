XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var pack = require('/Users/kvz/code/phpjs/src/php/misc/pack.js')

describe('php', function () {
  describe('misc.pack.js', function () {
    it('should pass test 1', function (done) {
      pack('nvc*', 0x1234, 0x5678, 65, 66);
      expected = '4xVAB'
      result = pack('nvc*', 0x1234, 0x5678, 65, 66);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      pack('H4', '2345')
      expected = '#E'
      result = pack('H4', '2345')
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      pack('H*', 'D5')
      expected = 'Õ'
      result = pack('H*', 'D5')
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      pack('d', -100.876)
      expected = "\u0000\u0000\u0000\u0000\u00008YÀ"
      result = pack('d', -100.876)
      expect(result).to.equal(expected)
      done()
    })
  })
})