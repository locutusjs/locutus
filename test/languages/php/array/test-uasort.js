XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var uasort = require('/Users/kvz/code/phpjs/src/php/array/uasort.js')

describe('php', function () {
  describe('array.uasort.js', function () {
    it('should pass test 1', function (done) {
      fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
      fruits = uasort(fruits, function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;});
      $result = fruits;
      expected = {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
fruits = uasort(fruits, function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;});
      result = $result = fruits;
      expect(result).to.equal(expected)
      done()
    })
  })
})