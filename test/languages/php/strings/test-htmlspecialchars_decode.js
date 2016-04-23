XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var htmlspecialchars_decode = require('/Users/kvz/code/phpjs/src/php/strings/htmlspecialchars_decode.js')

describe('php', function () {
  describe('strings.htmlspecialchars_decode.js', function () {
    it('should pass test 1', function (done) {
      htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
      expected = '<p>this -> &quot;</p>'
      result = htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      htmlspecialchars_decode("&amp;quot;");
      expected = '&quot;'
      result = htmlspecialchars_decode("&amp;quot;");
      expect(result).to.equal(expected)
      done()
    })
  })
})