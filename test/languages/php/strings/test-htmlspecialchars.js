XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var htmlspecialchars = require('/Users/kvz/code/phpjs/src/php/strings/htmlspecialchars.js')

describe('php', function () {
  describe('strings.htmlspecialchars.js', function () {
    it('should pass test 1', function (done) {
      htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES');
      expected = '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
      result = htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES']);
      expected = 'ab"c&#039;d'
      result = htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES']);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      htmlspecialchars('my "&entity;" is still here', null, null, false);
      expected = 'my &quot;&entity;&quot; is still here'
      result = htmlspecialchars('my "&entity;" is still here', null, null, false);
      expect(result).to.equal(expected)
      done()
    })
  })
})