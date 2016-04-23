XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var bin2hex = require('/Users/kvz/code/phpjs/src/php/strings/bin2hex.js')

describe('php', function () {
  describe('strings.bin2hex.js', function () {
    it('should pass test 1', function (done) {
      bin2hex('Kev');
      expected = '4b6576'
      result = bin2hex('Kev');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      bin2hex(String.fromCharCode(0x00));
      expected = '00'
      result = bin2hex(String.fromCharCode(0x00));
      expect(result).to.equal(expected)
      done()
    })
  })
})