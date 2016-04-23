XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_merge = require('/Users/kvz/code/phpjs/src/php/array/array_merge.js')

describe('php', function () {
  describe('array.array_merge.js', function () {
    it('should pass test 1', function (done) {
      arr1 = {"color": "red", 0: 2, 1: 4}
      arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
      array_merge(arr1, arr2)
      expected = {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
arr1 = {"color": "red", 0: 2, 1: 4}
arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
      result = array_merge(arr1, arr2)
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      arr1 = []
      arr2 = {1: "data"}
      array_merge(arr1, arr2)
      expected = {0: "data"}
arr1 = []
arr2 = {1: "data"}
      result = array_merge(arr1, arr2)
      expect(result).to.equal(expected)
      done()
    })
  })
})