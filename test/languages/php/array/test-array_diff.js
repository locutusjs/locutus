XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_diff = require('/Users/kvz/code/phpjs/src/php/array/array_diff.js')

describe('php', function () {
  describe('array.array_diff.js', function () {
    it('should pass test 1', function (done) {
      array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld']);
      expected = {0:'Kevin'}
      result = array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld']);
      expect(result).to.equal(expected)
      done()
    })
  })
})