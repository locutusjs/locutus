XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var exp = require('/Users/kvz/code/phpjs/src/php/math/exp.js')

describe('php', function () {
  describe('math.exp.js', function () {
    it('should pass test 1', function (done) {
      exp(0.3);
      expected = 1.3498588075760032
      result = exp(0.3);
      expect(result).to.equal(expected)
      done()
    })
  })
})