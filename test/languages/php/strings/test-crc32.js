XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var crc32 = require('/Users/kvz/code/phpjs/src/php/strings/crc32.js')

describe('php', function () {
  describe('strings.crc32.js', function () {
    it('should pass test 1', function (done) {
      crc32('Kevin van Zonneveld');
      expected = 1249991249
      result = crc32('Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
  })
})