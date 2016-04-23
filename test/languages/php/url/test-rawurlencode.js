XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var rawurlencode = require('/Users/kvz/code/phpjs/src/php/url/rawurlencode.js')

describe('php', function () {
  describe('url.rawurlencode.js', function () {
    it('should pass test 1', function (done) {
      rawurlencode('Kevin van Zonneveld!');
      expected = 'Kevin%20van%20Zonneveld%21'
      result = rawurlencode('Kevin van Zonneveld!');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      rawurlencode('http://kevin.vanzonneveld.net/');
      expected = 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
      result = rawurlencode('http://kevin.vanzonneveld.net/');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      rawurlencode('http://www.google.nl/search?q=Locutus&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
      expected = 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
      result = rawurlencode('http://www.google.nl/search?q=Locutus&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
      expect(result).to.equal(expected)
      done()
    })
  })
})