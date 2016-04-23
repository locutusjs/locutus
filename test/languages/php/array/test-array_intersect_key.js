XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_intersect_key = require('/Users/kvz/code/phpjs/src/php/array/array_intersect_key.js')

describe('php', function () {
  describe('array.array_intersect_key.js', function () {
    it('should pass test 1', function (done) {
      $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
      $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
      array_intersect_key($array1, $array2)
      expected = {0: 'red', a: 'green'}
$array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
$array2 = {a: 'green', 0: 'yellow', 1: 'red'}
      result = array_intersect_key($array1, $array2)
      expect(result).to.equal(expected)
      done()
    })
  })
})