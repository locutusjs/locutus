XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var range = require('/Users/kvz/code/phpjs/src/php/array/range.js')

describe('php', function () {
  describe('array.range.js', function () {
    it('should pass test 1', function (done) {
      range ( 0, 12 );
      expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      result = range ( 0, 12 );
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      range( 0, 100, 10 );
      expected = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      result = range( 0, 100, 10 );
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      range( 'a', 'i' );
      expected = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
      result = range( 'a', 'i' );
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      range( 'c', 'a' );
      expected = ['c', 'b', 'a']
      result = range( 'c', 'a' );
      expect(result).to.equal(expected)
      done()
    })
  })
})