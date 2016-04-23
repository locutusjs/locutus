XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var preg_quote = require('/Users/kvz/code/phpjs/src/php/pcre/preg_quote.js')

describe('php', function () {
  describe('pcre.preg_quote.js', function () {
    it('should pass test 1', function (done) {
      preg_quote("$40");
      expected = '\\$40'
      result = preg_quote("$40");
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      preg_quote("*RRRING* Hello?");
      expected = '\\*RRRING\\* Hello\\?'
      result = preg_quote("*RRRING* Hello?");
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      preg_quote("\\.+*?[^]$(){}=!<>|:");
      expected = '\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:'
      result = preg_quote("\\.+*?[^]$(){}=!<>|:");
      expect(result).to.equal(expected)
      done()
    })
  })
})