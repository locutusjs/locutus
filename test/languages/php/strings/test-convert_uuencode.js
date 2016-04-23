XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var convert_uuencode = require('/Users/kvz/code/phpjs/src/php/strings/convert_uuencode.js')

describe('php', function () {
  describe('strings.convert_uuencode.js', function () {
    it('should pass test 1', function (done) {
      convert_uuencode("test\ntext text\r\n");
      expected = "0=&5S=`IT97AT('1E>'0-\"@``"
      result = convert_uuencode("test\ntext text\r\n");
      expect(result).to.equal(expected)
      done()
    })
  })
})