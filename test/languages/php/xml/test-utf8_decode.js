XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var utf8_decode = require('/Users/kvz/code/phpjs/src/php/xml/utf8_decode.js')

describe('php', function () {
  describe('xml.utf8_decode.js', function () {
    it('should pass test 1', function (done) {
      utf8_decode('Kevin van Zonneveld');
      expected = 'Kevin van Zonneveld'
      result = utf8_decode('Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
  })
})