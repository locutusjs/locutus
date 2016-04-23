XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_merge = require('/Users/kvz/code/phpjs/src/php/array/array_merge.js')

describe('php.array.array_merge.js', function () {
  it('should pass example 1', function (done) {
    arr1 = {"color": "red", 0: 2, 1: 4}
    arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
    array_merge(arr1, arr2)
    var expected = {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
arr1 = {"color": "red", 0: 2, 1: 4}
arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
    var result = array_merge(arr1, arr2)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    arr1 = []
    arr2 = {1: "data"}
    array_merge(arr1, arr2)
    var expected = {0: "data"}
arr1 = []
arr2 = {1: "data"}
    var result = array_merge(arr1, arr2)
    expect(result).to.deep.equal(expected)
    done()
  })
})