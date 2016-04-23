XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var cos = require('/Users/kvz/code/phpjs/src/php/math/cos.js')

describe('php', function () {
  describe('math.cos.js', function () {
    it('should pass test 1', function (done) {
      Math.ceil(cos(8723321.4) * 10000000);
      expected = -1812718
      result = Math.ceil(cos(8723321.4) * 10000000);
      expect(result).to.equal(expected)
      done()
    })
  })
})