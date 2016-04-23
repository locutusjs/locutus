XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_slice = require('/Users/kvz/code/phpjs/src/php/array/array_slice.js')

describe('php', function () {
  describe('array.array_slice.js', function () {
    it('should pass test 1', function (done) {
      array_slice(["a", "b", "c", "d", "e"], 2, -1);
      expected = {0: 'c', 1: 'd'}
      result = array_slice(["a", "b", "c", "d", "e"], 2, -1);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      array_slice(["a", "b", "c", "d", "e"], 2, -1, true);
      expected = {2: 'c', 3: 'd'}
      result = array_slice(["a", "b", "c", "d", "e"], 2, -1, true);
      expect(result).to.equal(expected)
      done()
    })
  })
})