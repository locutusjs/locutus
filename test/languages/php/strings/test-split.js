XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var split = require('/Users/kvz/code/phpjs/src/php/strings/split.js')

describe('php', function () {
  describe('strings.split.js', function () {
    it('should pass test 1', function (done) {
      split(' ', 'Kevin van Zonneveld');
      expected = {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
      result = split(' ', 'Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
  })
})