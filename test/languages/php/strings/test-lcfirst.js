XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var lcfirst = require('/Users/kvz/code/phpjs/src/php/strings/lcfirst.js')

describe('php', function () {
  describe('strings.lcfirst.js', function () {
    it('should pass test 1', function (done) {
      lcfirst('Kevin Van Zonneveld');
      expected = 'kevin Van Zonneveld'
      result = lcfirst('Kevin Van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
  })
})