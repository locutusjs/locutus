XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var printf = require('/Users/kvz/code/phpjs/src/php/strings/printf.js')

describe('php', function () {
  describe('strings.printf.js', function () {
    it('should pass test 1', function (done) {
      printf("%01.2f", 123.1);
      expected = 6
      result = printf("%01.2f", 123.1);
      expect(result).to.equal(expected)
      done()
    })
  })
})