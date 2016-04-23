XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var htmlentities = require('/Users/kvz/code/phpjs/src/php/strings/htmlentities.js')

describe('php', function () {
  describe('strings.htmlentities.js', function () {
    it('should pass test 1', function (done) {
      htmlentities('Kevin & van Zonneveld');
      expected = 'Kevin &amp; van Zonneveld'
      result = htmlentities('Kevin & van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      htmlentities("foo'bar","ENT_QUOTES");
      expected = 'foo&#039;bar'
      result = htmlentities("foo'bar","ENT_QUOTES");
      expect(result).to.equal(expected)
      done()
    })
  })
})