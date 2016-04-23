XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var str_shuffle = require('/Users/kvz/code/phpjs/src/php/strings/str_shuffle.js')

describe('php', function () {
  describe('strings.str_shuffle.js', function () {
    it('should pass test 1', function (done) {
      shuffled = str_shuffle("abcdef");
      shuffled.length
      expected = 6
shuffled = str_shuffle("abcdef");
      result = shuffled.length
      expect(result).to.equal(expected)
      done()
    })
  })
})