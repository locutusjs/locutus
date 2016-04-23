XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var base64_decode = require('/Users/kvz/code/phpjs/src/php/url/base64_decode.js')

describe('php', function () {
  describe('url.base64_decode.js', function () {
    it('should pass test 1', function (done) {
      base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
      expected = 'Kevin van Zonneveld'
      result = base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      base64_decode('YQ==');
      expected = 'a'
      result = base64_decode('YQ==');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      base64_decode('4pyTIMOgIGxhIG1vZGU=');
      expected = '✓ à la mode'
      result = base64_decode('4pyTIMOgIGxhIG1vZGU=');
      expect(result).to.equal(expected)
      done()
    })
  })
})