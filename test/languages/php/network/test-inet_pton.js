XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var inet_pton = require('/Users/kvz/code/phpjs/src/php/network/inet_pton.js')

describe('php', function () {
  describe('network.inet_pton.js', function () {
    it('should pass test 1', function (done) {
      inet_pton('::');
      expected = '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'
      result = inet_pton('::');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      inet_pton('127.0.0.1');
      expected = '\x7F\x00\x00\x01'
      result = inet_pton('127.0.0.1');
      expect(result).to.equal(expected)
      done()
    })
  })
})