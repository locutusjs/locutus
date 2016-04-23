XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var decoct = require('/Users/kvz/code/phpjs/src/php/math/decoct.js')

describe('php', function () {
  describe('math.decoct.js', function () {
    it('should pass test 1', function (done) {
      decoct(15);
      expected = '17'
      result = decoct(15);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      decoct(264);
      expected = '410'
      result = decoct(264);
      expect(result).to.equal(expected)
      done()
    })
  })
})