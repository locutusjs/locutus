XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var sort = require('/Users/kvz/code/phpjs/src/php/array/sort.js')

describe('php', function () {
  describe('array.sort.js', function () {
    it('should pass test 1', function (done) {
      var arr = ['Kevin', 'van', 'Zonneveld']
      sort(arr);
      $result = arr;
      expected = ['Kevin', 'Zonneveld', 'van']
var arr = ['Kevin', 'van', 'Zonneveld']
sort(arr);
      result = $result = arr;
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      ini_set('locutus.strictForIn', true);
      fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
      sort(fruits);
      $result = fruits;
      expected = {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}
ini_set('locutus.strictForIn', true);
fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
sort(fruits);
      result = $result = fruits;
      expect(result).to.equal(expected)
      done()
    })
  })
})