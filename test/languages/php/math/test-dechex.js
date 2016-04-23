XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var dechex = require('/Users/kvz/code/phpjs/src/php/math/dechex.js')

describe('php', function () {
  describe('math.dechex.js', function () {
    it('should pass test 1', function (done) {
      dechex(10);
      expected = 'a'
      result = dechex(10);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      dechex(47);
      expected = '2f'
      result = dechex(47);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      dechex(-1415723993);
      expected = 'ab9dc427'
      result = dechex(-1415723993);
      expect(result).to.equal(expected)
      done()
    })
  })
})