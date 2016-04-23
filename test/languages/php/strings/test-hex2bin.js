XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var hex2bin = require('/Users/kvz/code/phpjs/src/php/strings/hex2bin.js')

describe('php', function () {
  describe('strings.hex2bin.js', function () {
    it('should pass test 1', function (done) {
      hex2bin('44696d61');
      expected = 'Dima'
      result = hex2bin('44696d61');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      hex2bin('00');
      expected = '\x00'
      result = hex2bin('00');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      hex2bin('2f1q')
      expected = false
      result = hex2bin('2f1q')
      expect(result).to.equal(expected)
      done()
    })
  })
})