XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var quoted_printable_encode = require('/Users/kvz/code/phpjs/src/php/strings/quoted_printable_encode.js')

describe('php', function () {
  describe('strings.quoted_printable_encode.js', function () {
    it('should pass test 1', function (done) {
      quoted_printable_encode('a=b=c');
      expected = 'a=3Db=3Dc'
      result = quoted_printable_encode('a=b=c');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      quoted_printable_encode('abc   \r\n123   \r\n');
      expected = 'abc  =20\r\n123  =20\r\n'
      result = quoted_printable_encode('abc   \r\n123   \r\n');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      quoted_printable_encode('0123456789012345678901234567890123456789012345678901234567890123456789012345');
      expected = '012345678901234567890123456789012345678901234567890123456789012345678901234=\r\n5'
      result = quoted_printable_encode('0123456789012345678901234567890123456789012345678901234567890123456789012345');
      expect(result).to.equal(expected)
      done()
    })
  })
})