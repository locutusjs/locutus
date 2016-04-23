XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var trim = require('/Users/kvz/code/phpjs/src/php/strings/trim.js')

describe('php', function () {
  describe('strings.trim.js', function () {
    it('should pass test 1', function (done) {
      trim('    Kevin van Zonneveld    ');
      expected = 'Kevin van Zonneveld'
      result = trim('    Kevin van Zonneveld    ');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      trim('Hello World', 'Hdle');
      expected = 'o Wor'
      result = trim('Hello World', 'Hdle');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      trim(16, 1);
      expected = 6
      result = trim(16, 1);
      expect(result).to.equal(expected)
      done()
    })
  })
})