XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var uksort = require('/Users/kvz/code/phpjs/src/php/array/uksort.js')

describe('php', function () {
  describe('array.uksort.js', function () {
    it('should pass test 1', function (done) {
      data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
      data = uksort(data, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); });
      $result = data
      expected = {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
data = uksort(data, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); });
      result = $result = data
      expect(result).to.equal(expected)
      done()
    })
  })
})