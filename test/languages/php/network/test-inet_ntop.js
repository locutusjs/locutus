XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var inet_ntop = require('/Users/kvz/code/phpjs/src/php/network/inet_ntop.js')

describe('php', function () {
  describe('network.inet_ntop.js', function () {
    it('should pass test 1', function (done) {
      inet_ntop('\x7F\x00\x00\x01');
      expected = '127.0.0.1'
      result = inet_ntop('\x7F\x00\x00\x01');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      inet_ntop('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\1');
      expected = '::1'
      result = inet_ntop('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\1');
      expect(result).to.equal(expected)
      done()
    })
  })
})