XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var base64_encode = require('/Users/kvz/code/phpjs/src/php/url/base64_encode.js')

describe('php', function () {
  describe('url.base64_encode.js', function () {
    it('should pass test 1', function (done) {
      base64_encode('Kevin van Zonneveld');
      expected = 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
      result = base64_encode('Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      base64_encode('a');
      expected = 'YQ=='
      result = base64_encode('a');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      base64_encode('✓ à la mode');
      expected = '4pyTIMOgIGxhIG1vZGU='
      result = base64_encode('✓ à la mode');
      expect(result).to.equal(expected)
      done()
    })
  })
})