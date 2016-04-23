XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strtolower = require('/Users/kvz/code/phpjs/src/php/strings/strtolower.js')

describe('php', function () {
  describe('strings.strtolower.js', function () {
    it('should pass test 1', function (done) {
      strtolower('Kevin van Zonneveld');
      expected = 'kevin van zonneveld'
      result = strtolower('Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
  })
})