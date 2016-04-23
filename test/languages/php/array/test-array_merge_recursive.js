XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_merge_recursive = require('/Users/kvz/code/phpjs/src/php/array/array_merge_recursive.js')

describe('php', function () {
  describe('array.array_merge_recursive.js', function () {
    it('should pass test 1', function (done) {
      arr1 = {'color': {'favourite': 'read'}, 0: 5}
      arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}}
      array_merge_recursive(arr1, arr2)
      expected = {'color': {'favorite': {0: 'red', 1: 'green'}, 0: 'blue'}, 1: 5, 1: 10}
arr1 = {'color': {'favourite': 'read'}, 0: 5}
arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}}
      result = array_merge_recursive(arr1, arr2)
      expect(result).to.equal(expected)
      done()
    })
  })
})