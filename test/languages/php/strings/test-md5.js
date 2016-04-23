XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var md5 = require('/Users/kvz/code/phpjs/src/php/strings/md5.js')

describe('php', function () {
  describe('strings.md5.js', function () {
    it('should pass test 1', function (done) {
      md5('Kevin van Zonneveld');
      expected = '6e658d4bfcb59cc13f96c14450ac40b9'
      result = md5('Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
  })
})