XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var str_split = require('/Users/kvz/code/phpjs/src/php/strings/str_split.js')

describe('php', function () {
  describe('strings.str_split.js', function () {
    it('should pass test 1', function (done) {
      str_split('Hello Friend', 3);
      expected = ['Hel', 'lo ', 'Fri', 'end']
      result = str_split('Hello Friend', 3);
      expect(result).to.equal(expected)
      done()
    })
  })
})