XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var max = require('/Users/kvz/code/phpjs/src/php/math/max.js')

describe('php', function () {
  describe('math.max.js', function () {
    it('should pass test 1', function (done) {
      max(1, 3, 5, 6, 7);
      expected = 7
      result = max(1, 3, 5, 6, 7);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      max([2, 4, 5]);
      expected = 5
      result = max([2, 4, 5]);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      max(0, 'hello');
      expected = 0
      result = max(0, 'hello');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      max('hello', 0);
      expected = 'hello'
      result = max('hello', 0);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      max(-1, 'hello');
      expected = 'hello'
      result = max(-1, 'hello');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      max([2, 4, 8], [2, 5, 7]);
      expected = [2, 5, 7]
      result = max([2, 4, 8], [2, 5, 7]);
      expect(result).to.equal(expected)
      done()
    })
  })
})