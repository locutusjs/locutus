XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_reduce = require('/Users/kvz/code/phpjs/src/php/array/array_reduce.js')

describe('php', function () {
  describe('array.array_reduce.js', function () {
    it('should pass test 1', function (done) {
      array_reduce([1, 2, 3, 4, 5], function (v, w){v += w;return v;});
      expected = 15
      result = array_reduce([1, 2, 3, 4, 5], function (v, w){v += w;return v;});
      expect(result).to.equal(expected)
      done()
    })
  })
})