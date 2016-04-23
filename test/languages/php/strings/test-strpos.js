XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strpos = require('/Users/kvz/code/phpjs/src/php/strings/strpos.js')

describe('php', function () {
  describe('strings.strpos.js', function () {
    it('should pass test 1', function (done) {
      strpos('Kevin van Zonneveld', 'e', 5);
      expected = 14
      result = strpos('Kevin van Zonneveld', 'e', 5);
      expect(result).to.equal(expected)
      done()
    })
  })
})