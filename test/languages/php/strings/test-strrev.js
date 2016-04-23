XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strrev = require('/Users/kvz/code/phpjs/src/php/strings/strrev.js')

describe('php', function () {
  describe('strings.strrev.js', function () {
    it('should pass test 1', function (done) {
      strrev('Kevin van Zonneveld');
      expected = 'dlevennoZ nav niveK'
      result = strrev('Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strrev('a\u0301haB') === 'Baha\u0301'; // combining
      expected = true
      result = strrev('a\u0301haB') === 'Baha\u0301'; // combining
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      strrev('A\uD87E\uDC04Z') === 'Z\uD87E\uDC04A'; // surrogates
      expected = true
      result = strrev('A\uD87E\uDC04Z') === 'Z\uD87E\uDC04A'; // surrogates
      expect(result).to.equal(expected)
      done()
    })
  })
})