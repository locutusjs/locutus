XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_fill = require('/Users/kvz/code/phpjs/src/php/array/array_fill.js')

describe('php', function () {
  describe('array.array_fill.js', function () {
    it('should pass test 1', function (done) {
      array_fill(5, 6, 'banana');
      expected = { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }
      result = array_fill(5, 6, 'banana');
      expect(result).to.equal(expected)
      done()
    })
  })
})