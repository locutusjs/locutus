XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_unicode = require('/Users/kvz/code/phpjs/src/php/var/is_unicode.js')

describe('php', function () {
  describe('var.is_unicode.js', function () {
    it('should pass test 1', function (done) {
      is_unicode('We the peoples of the United Nations...!');
      expected = true
      result = is_unicode('We the peoples of the United Nations...!');
      expect(result).to.equal(expected)
      done()
    })
  })
})