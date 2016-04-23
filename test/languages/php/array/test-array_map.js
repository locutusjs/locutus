XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_map = require('/Users/kvz/code/phpjs/src/php/array/array_map.js')

describe('php', function () {
  describe('array.array_map.js', function () {
    it('should pass test 1', function (done) {
      array_map( function (a){return (a * a * a)}, [1, 2, 3, 4, 5] );
      expected = [ 1, 8, 27, 64, 125 ]
      result = array_map( function (a){return (a * a * a)}, [1, 2, 3, 4, 5] );
      expect(result).to.equal(expected)
      done()
    })
  })
})