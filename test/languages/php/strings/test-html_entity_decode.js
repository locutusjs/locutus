XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var html_entity_decode = require('/Users/kvz/code/phpjs/src/php/strings/html_entity_decode.js')

describe('php', function () {
  describe('strings.html_entity_decode.js', function () {
    it('should pass test 1', function (done) {
      html_entity_decode('Kevin &amp; van Zonneveld');
      expected = 'Kevin & van Zonneveld'
      result = html_entity_decode('Kevin &amp; van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      html_entity_decode('&amp;lt;');
      expected = '&lt;'
      result = html_entity_decode('&amp;lt;');
      expect(result).to.equal(expected)
      done()
    })
  })
})