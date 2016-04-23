XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var hypot = require('/Users/kvz/code/phpjs/src/php/math/hypot.js')

describe('php', function () {
  describe('math.hypot.js', function () {
    it('should pass test 1', function (done) {
      hypot(3, 4);
      expected = 5
      result = hypot(3, 4);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      hypot([], 'a');
      expected = null
      result = hypot([], 'a');
      expect(result).to.equal(expected)
      done()
    })
  })
})