XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_rand = require('/Users/kvz/code/phpjs/src/php/array/array_rand.js')

describe('php', function () {
  describe('array.array_rand.js', function () {
    it('should pass test 1', function (done) {
      array_rand( ['Kevin'], 1 );
      expected = 0
      result = array_rand( ['Kevin'], 1 );
      expect(result).to.equal(expected)
      done()
    })
  })
})