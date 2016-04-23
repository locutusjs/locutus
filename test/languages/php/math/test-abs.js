XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var abs = require('/Users/kvz/code/phpjs/src/php/math/abs.js')

describe('php', function () {
  describe('math.abs.js', function () {
    it('should pass test 1', function (done) {
      abs(4.2);
      expected = 4.2
      result = abs(4.2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      abs(-4.2);
      expected = 4.2
      result = abs(-4.2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      abs(-5);
      expected = 5
      result = abs(-5);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      abs('_argos');
      expected = 0
      result = abs('_argos');
      expect(result).to.equal(expected)
      done()
    })
  })
})