XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var min = require('/Users/kvz/code/phpjs/src/php/math/min.js')

describe('php', function () {
  describe('math.min.js', function () {
    it('should pass test 1', function (done) {
      min(1, 3, 5, 6, 7);
      expected = 1
      result = min(1, 3, 5, 6, 7);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      min([2, 4, 5]);
      expected = 2
      result = min([2, 4, 5]);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      min(0, 'hello');
      expected = 0
      result = min(0, 'hello');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      min('hello', 0);
      expected = 'hello'
      result = min('hello', 0);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      min(-1, 'hello');
      expected = -1
      result = min(-1, 'hello');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      min([2, 4, 8], [2, 5, 7]);
      expected = [2, 4, 8]
      result = min([2, 4, 8], [2, 5, 7]);
      expect(result).to.equal(expected)
      done()
    })
  })
})