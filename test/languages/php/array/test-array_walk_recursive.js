XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_walk_recursive = require('/Users/kvz/code/phpjs/src/php/array/array_walk_recursive.js')

describe('php', function () {
  describe('array.array_walk_recursive.js', function () {
    it('should pass test 1', function (done) {
      array_walk_recursive ({'a': 'b', 'c': {'d': 'e'}}, 'void', 'userdata');
      expected = true
      result = array_walk_recursive ({'a': 'b', 'c': {'d': 'e'}}, 'void', 'userdata');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      array_walk_recursive ('a', 'void', 'userdata');
      expected = false
      result = array_walk_recursive ('a', 'void', 'userdata');
      expect(result).to.equal(expected)
      done()
    })
  })
})