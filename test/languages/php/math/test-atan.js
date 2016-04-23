XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var atan = require('/Users/kvz/code/phpjs/src/php/math/atan.js')

describe('php', function () {
  describe('math.atan.js', function () {
    it('should pass test 1', function (done) {
      atan(8723321.4);
      expected = 1.5707962121596615
      result = atan(8723321.4);
      expect(result).to.equal(expected)
      done()
    })
  })
})