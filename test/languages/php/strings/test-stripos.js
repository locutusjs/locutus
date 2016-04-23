XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var stripos = require('/Users/kvz/code/phpjs/src/php/strings/stripos.js')

describe('php', function () {
  describe('strings.stripos.js', function () {
    it('should pass test 1', function (done) {
      stripos('ABC', 'a');
      expected = 0
      result = stripos('ABC', 'a');
      expect(result).to.equal(expected)
      done()
    })
  })
})