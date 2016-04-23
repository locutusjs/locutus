XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var echo = require('/Users/kvz/code/phpjs/src/php/strings/echo.js')

describe('php', function () {
  describe('strings.echo.js', function () {
    it('should pass test 1', function (done) {
      echo('<div><p>abc</p><p>abc</p></div>');
      expected = undefined
      result = echo('<div><p>abc</p><p>abc</p></div>');
      expect(result).to.equal(expected)
      done()
    })
  })
})