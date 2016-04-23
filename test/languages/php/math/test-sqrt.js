XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var sqrt = require('/Users/kvz/code/phpjs/src/php/math/sqrt.js')

describe('php', function () {
  describe('math.sqrt.js', function () {
    it('should pass test 1', function (done) {
      sqrt(8723321.4);
      expected = 2953.5269424875746
      result = sqrt(8723321.4);
      expect(result).to.equal(expected)
      done()
    })
  })
})