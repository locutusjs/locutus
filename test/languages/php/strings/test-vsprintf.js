XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var vsprintf = require('/Users/kvz/code/phpjs/src/php/strings/vsprintf.js')

describe('php', function () {
  describe('strings.vsprintf.js', function () {
    it('should pass test 1', function (done) {
      vsprintf('%04d-%02d-%02d', [1988, 8, 1]);
      expected = '1988-08-01'
      result = vsprintf('%04d-%02d-%02d', [1988, 8, 1]);
      expect(result).to.equal(expected)
      done()
    })
  })
})