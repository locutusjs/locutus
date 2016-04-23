XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strtoupper = require('/Users/kvz/code/phpjs/src/php/strings/strtoupper.js')

describe('php', function () {
  describe('strings.strtoupper.js', function () {
    it('should pass test 1', function (done) {
      strtoupper('Kevin van Zonneveld');
      expected = 'KEVIN VAN ZONNEVELD'
      result = strtoupper('Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
  })
})