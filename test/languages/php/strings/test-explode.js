XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var explode = require('/Users/kvz/code/phpjs/src/php/strings/explode.js')

describe('php', function () {
  describe('strings.explode.js', function () {
    it('should pass test 1', function (done) {
      explode(' ', 'Kevin van Zonneveld');
      expected = {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
      result = explode(' ', 'Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
  })
})