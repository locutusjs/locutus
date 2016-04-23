XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var vprintf = require('/Users/kvz/code/phpjs/src/php/strings/vprintf.js')

describe('php', function () {
  describe('strings.vprintf.js', function () {
    it('should pass test 1', function (done) {
      vprintf("%01.2f", 123.1);
      expected = 6
      result = vprintf("%01.2f", 123.1);
      expect(result).to.equal(expected)
      done()
    })
  })
})