XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var base_convert = require('/Users/kvz/code/phpjs/src/php/math/base_convert.js')

describe('php', function () {
  describe('math.base_convert.js', function () {
    it('should pass test 1', function (done) {
      base_convert('A37334', 16, 2);
      expected = '101000110111001100110100'
      result = base_convert('A37334', 16, 2);
      expect(result).to.equal(expected)
      done()
    })
  })
})