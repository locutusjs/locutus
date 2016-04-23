XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var arsort = require('/Users/kvz/code/phpjs/src/php/array/arsort.js')

describe('php', function () {
  describe('array.arsort.js', function () {
    it('should pass test 1', function (done) {
      data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
      data = arsort(data);
      expected = data === {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}
data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
      result = data = arsort(data);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      ini_set('locutus.strictForIn', true);
      data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
      arsort(data);
      $result = data;
      expected = {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}
ini_set('locutus.strictForIn', true);
data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
arsort(data);
      result = $result = data;
      expect(result).to.equal(expected)
      done()
    })
  })
})