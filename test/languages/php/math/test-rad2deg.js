XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var rad2deg = require('/Users/kvz/code/phpjs/src/php/math/rad2deg.js')

describe('php', function () {
  describe('math.rad2deg.js', function () {
    it('should pass test 1', function (done) {
      rad2deg(3.141592653589793);
      expected = 180
      result = rad2deg(3.141592653589793);
      expect(result).to.equal(expected)
      done()
    })
  })
})