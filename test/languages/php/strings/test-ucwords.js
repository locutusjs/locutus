XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ucwords = require('/Users/kvz/code/phpjs/src/php/strings/ucwords.js')

describe('php', function () {
  describe('strings.ucwords.js', function () {
    it('should pass test 1', function (done) {
      ucwords('kevin van  zonneveld');
      expected = 'Kevin Van  Zonneveld'
      result = ucwords('kevin van  zonneveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      ucwords('HELLO WORLD');
      expected = 'HELLO WORLD'
      result = ucwords('HELLO WORLD');
      expect(result).to.equal(expected)
      done()
    })
  })
})