XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_diff_uassoc = require('/Users/kvz/code/phpjs/src/php/array/array_diff_uassoc.js')

describe('php', function () {
  describe('array.array_diff_uassoc.js', function () {
    it('should pass test 1', function (done) {
      $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
      $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
      array_diff_uassoc($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); });
      expected = {b: 'brown', c: 'blue', 0: 'red'}
$array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
$array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
      result = array_diff_uassoc($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); });
      expect(result).to.equal(expected)
      done()
    })
  })
})