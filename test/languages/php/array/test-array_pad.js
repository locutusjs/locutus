XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_pad = require('/Users/kvz/code/phpjs/src/php/array/array_pad.js')

describe('php', function () {
  describe('array.array_pad.js', function () {
    it('should pass test 1', function (done) {
      array_pad([ 7, 8, 9 ], 2, 'a');
      expected = [ 7, 8, 9]
      result = array_pad([ 7, 8, 9 ], 2, 'a');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      array_pad([ 7, 8, 9 ], 5, 'a');
      expected = [ 7, 8, 9, 'a', 'a']
      result = array_pad([ 7, 8, 9 ], 5, 'a');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      array_pad([ 7, 8, 9 ], 5, 2);
      expected = [ 7, 8, 9, 2, 2]
      result = array_pad([ 7, 8, 9 ], 5, 2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      array_pad([ 7, 8, 9 ], -5, 'a');
      expected = [ 'a', 'a', 7, 8, 9 ]
      result = array_pad([ 7, 8, 9 ], -5, 'a');
      expect(result).to.equal(expected)
      done()
    })
  })
})