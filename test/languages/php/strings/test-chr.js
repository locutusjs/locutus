XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var chr = require('/Users/kvz/code/phpjs/src/php/strings/chr.js')

describe('php', function () {
  describe('strings.chr.js', function () {
    it('should pass test 1', function (done) {
      chr(75) === 'K';
      chr(65536) === '\uD800\uDC00';
      expected = true
true
chr(75) === 'K';
      result = chr(65536) === '\uD800\uDC00';
      expect(result).to.equal(expected)
      done()
    })
  })
})