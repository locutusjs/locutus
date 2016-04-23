XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var rsort = require('/Users/kvz/code/phpjs/src/php/array/rsort.js')

describe('php', function () {
  describe('array.rsort.js', function () {
    it('should pass test 1', function (done) {
      $arr = ['Kevin', 'van', 'Zonneveld'];
      rsort($arr);
      $results = $arr;
      expected = ['van', 'Zonneveld', 'Kevin']
$arr = ['Kevin', 'van', 'Zonneveld'];
rsort($arr);
      result = $results = $arr;
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      ini_set('locutus.strictForIn', true);
      fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
      rsort(fruits);
      $result = fruits;
      expected = {0: 'orange', 1: 'lemon', 2: 'banana', 3: 'apple'}
ini_set('locutus.strictForIn', true);
fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
rsort(fruits);
      result = $result = fruits;
      expect(result).to.equal(expected)
      done()
    })
  })
})