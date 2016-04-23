XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ip2long = require('/Users/kvz/code/phpjs/src/php/network/ip2long.js')

describe('php', function () {
  describe('network.ip2long.js', function () {
    it('should pass test 1', function (done) {
      ip2long('192.0.34.166');
      expected = 3221234342
      result = ip2long('192.0.34.166');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      ip2long('0.0xABCDEF');
      expected = 11259375
      result = ip2long('0.0xABCDEF');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      ip2long('255.255.255.256');
      expected = false
      result = ip2long('255.255.255.256');
      expect(result).to.equal(expected)
      done()
    })
  })
})