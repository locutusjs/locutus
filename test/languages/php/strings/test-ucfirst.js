XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ucfirst = require('/Users/kvz/code/phpjs/src/php/strings/ucfirst.js')

describe('php', function () {
  describe('strings.ucfirst.js', function () {
    it('should pass test 1', function (done) {
      ucfirst('kevin van zonneveld');
      expected = 'Kevin van zonneveld'
      result = ucfirst('kevin van zonneveld');
      expect(result).to.equal(expected)
      done()
    })
  })
})