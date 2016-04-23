XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ksort = require('/Users/kvz/code/phpjs/src/php/array/ksort.js')

describe('php', function () {
  describe('array.ksort.js', function () {
    it('should pass test 1', function (done) {
      data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
      data = ksort(data);
      $result = data
      expected = {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
data = ksort(data);
      result = $result = data
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      ini_set('locutus.strictForIn', true);
      data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'};
      ksort(data);
      $result = data
      expected = {1: 'Kevin', 2: 'van', 3: 'Zonneveld'}
ini_set('locutus.strictForIn', true);
data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'};
ksort(data);
      result = $result = data
      expect(result).to.equal(expected)
      done()
    })
  })
})