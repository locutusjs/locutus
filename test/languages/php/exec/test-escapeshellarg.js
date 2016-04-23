XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var escapeshellarg = require('/Users/kvz/code/phpjs/src/php/exec/escapeshellarg.js')

describe('php', function () {
  describe('exec.escapeshellarg.js', function () {
    it('should pass test 1', function (done) {
      escapeshellarg("kevin's birthday");
      expected = "'kevin\\'s birthday'"
      result = escapeshellarg("kevin's birthday");
      expect(result).to.equal(expected)
      done()
    })
  })
})