XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var atan2 = require('/Users/kvz/code/phpjs/src/php/math/atan2.js')

describe('php', function () {
  describe('math.atan2.js', function () {
    it('should pass test 1', function (done) {
      atan2(1, 1);
      expected = 0.7853981633974483
      result = atan2(1, 1);
      expect(result).to.equal(expected)
      done()
    })
  })
})