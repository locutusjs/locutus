XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strripos = require('/Users/kvz/code/phpjs/src/php/strings/strripos.js')

describe('php', function () {
  describe('strings.strripos.js', function () {
    it('should pass test 1', function (done) {
      strripos('Kevin van Zonneveld', 'E');
      expected = 16
      result = strripos('Kevin van Zonneveld', 'E');
      expect(result).to.equal(expected)
      done()
    })
  })
})