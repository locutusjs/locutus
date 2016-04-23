XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ceil = require('/Users/kvz/code/phpjs/src/php/math/ceil.js')

describe('php', function () {
  describe('math.ceil.js', function () {
    it('should pass test 1', function (done) {
      ceil(8723321.4);
      expected = 8723322
      result = ceil(8723321.4);
      expect(result).to.equal(expected)
      done()
    })
  })
})