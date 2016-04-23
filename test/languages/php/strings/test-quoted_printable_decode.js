XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var quoted_printable_decode = require('/Users/kvz/code/phpjs/src/php/strings/quoted_printable_decode.js')

describe('php', function () {
  describe('strings.quoted_printable_decode.js', function () {
    it('should pass test 1', function (done) {
      quoted_printable_decode('a=3Db=3Dc');
      expected = 'a=b=c'
      result = quoted_printable_decode('a=3Db=3Dc');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      quoted_printable_decode('abc  =20\r\n123  =20\r\n');
      expected = 'abc   \r\n123   \r\n'
      result = quoted_printable_decode('abc  =20\r\n123  =20\r\n');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      quoted_printable_decode('012345678901234567890123456789012345678901234567890123456789012345678901234=\r\n56789');
      expected = '01234567890123456789012345678901234567890123456789012345678901234567890123456789'
      result = quoted_printable_decode('012345678901234567890123456789012345678901234567890123456789012345678901234=\r\n56789');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      quoted_printable_decode("Lorem ipsum dolor sit amet=23, consectetur adipisicing elit");
      expected = 'Lorem ipsum dolor sit amet#, consectetur adipisicing elit'
      result = quoted_printable_decode("Lorem ipsum dolor sit amet=23, consectetur adipisicing elit");
      expect(result).to.equal(expected)
      done()
    })
  })
})