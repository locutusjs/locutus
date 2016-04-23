XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strcspn = require('/Users/kvz/code/phpjs/src/php/strings/strcspn.js')

describe('php', function () {
  describe('strings.strcspn.js', function () {
    it('should pass test 1', function (done) {
      strcspn('abcdefg123', '1234567890');
      expected = 7
      result = strcspn('abcdefg123', '1234567890');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strcspn('123abc', '1234567890');
      expected = 3
      result = strcspn('123abc', '1234567890');
      expect(result).to.equal(expected)
      done()
    })
  })
})