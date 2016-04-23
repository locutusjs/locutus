XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_reverse = require('/Users/kvz/code/phpjs/src/php/array/array_reverse.js')

describe('php', function () {
  describe('array.array_reverse.js', function () {
    it('should pass test 1', function (done) {
      array_reverse( [ 'php', '4.0', ['green', 'red'] ], true);
      expected = { 2: ['green', 'red'], 1: 4, 0: 'php'}
      result = array_reverse( [ 'php', '4.0', ['green', 'red'] ], true);
      expect(result).to.equal(expected)
      done()
    })
  })
})