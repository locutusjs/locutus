XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var asort = require('/Users/kvz/code/phpjs/src/php/array/asort.js')

describe('php', function () {
  describe('array.asort.js', function () {
    it('should pass test 1', function (done) {
      data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
      data = asort(data);
      $result = data
      expected = {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
data = asort(data);
      result = $result = data
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      ini_set('locutus.strictForIn', true);
      data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
      asort(data);
      $result = data
      expected = {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
ini_set('locutus.strictForIn', true);
data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
asort(data);
      result = $result = data
      expect(result).to.equal(expected)
      done()
    })
  })
})