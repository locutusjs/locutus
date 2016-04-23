XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var getrandmax = require('/Users/kvz/code/phpjs/src/php/math/getrandmax.js')

describe('php', function () {
  describe('math.getrandmax.js', function () {
    it('should pass test 1', function (done) {
      getrandmax();
      expected = 2147483647
      result = getrandmax();
      expect(result).to.equal(expected)
      done()
    })
  })
})