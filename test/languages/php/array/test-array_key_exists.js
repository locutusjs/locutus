XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_key_exists = require('/Users/kvz/code/phpjs/src/php/array/array_key_exists.js')

describe('php', function () {
  describe('array.array_key_exists.js', function () {
    it('should pass test 1', function (done) {
      array_key_exists('kevin', {'kevin': 'van Zonneveld'});
      expected = true
      result = array_key_exists('kevin', {'kevin': 'van Zonneveld'});
      expect(result).to.equal(expected)
      done()
    })
  })
})