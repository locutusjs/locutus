XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var soundex = require('/Users/kvz/code/phpjs/src/php/strings/soundex.js')

describe('php', function () {
  describe('strings.soundex.js', function () {
    it('should pass test 1', function (done) {
      soundex('Kevin');
      expected = 'K150'
      result = soundex('Kevin');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      soundex('Ellery');
      expected = 'E460'
      result = soundex('Ellery');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      soundex('Euler');
      expected = 'E460'
      result = soundex('Euler');
      expect(result).to.equal(expected)
      done()
    })
  })
})