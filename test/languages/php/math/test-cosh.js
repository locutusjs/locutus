XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var cosh = require('/Users/kvz/code/phpjs/src/php/math/cosh.js')

describe('php', function () {
  describe('math.cosh.js', function () {
    it('should pass test 1', function (done) {
      cosh(-0.18127180117607017);
      expected = 1.0164747716114113
      result = cosh(-0.18127180117607017);
      expect(result).to.equal(expected)
      done()
    })
  })
})