XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_udiff = require('/Users/kvz/code/phpjs/src/php/array/array_udiff.js')

describe('php', function () {
  describe('array.array_udiff.js', function () {
    it('should pass test 1', function (done) {
      $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
      $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
      array_udiff($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;});
      expected = {c: 'blue'}
$array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
$array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
      result = array_udiff($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;});
      expect(result).to.equal(expected)
      done()
    })
  })
})