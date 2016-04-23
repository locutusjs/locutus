XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var stripslashes = require('/Users/kvz/code/phpjs/src/php/strings/stripslashes.js')

describe('php', function () {
  describe('strings.stripslashes.js', function () {
    it('should pass test 1', function (done) {
      stripslashes('Kevin\'s code');
      expected = "Kevin's code"
      result = stripslashes('Kevin\'s code');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      stripslashes('Kevin\\\'s code');
      expected = "Kevin\'s code"
      result = stripslashes('Kevin\\\'s code');
      expect(result).to.equal(expected)
      done()
    })
  })
})