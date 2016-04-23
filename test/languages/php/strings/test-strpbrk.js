XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strpbrk = require('/Users/kvz/code/phpjs/src/php/strings/strpbrk.js')

describe('php', function () {
  describe('strings.strpbrk.js', function () {
    it('should pass test 1', function (done) {
      strpbrk('This is a Simple text.', 'is');
      expected = 'is is a Simple text.'
      result = strpbrk('This is a Simple text.', 'is');
      expect(result).to.equal(expected)
      done()
    })
  })
})