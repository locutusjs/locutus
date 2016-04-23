XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strrchr = require('/Users/kvz/code/phpjs/src/php/strings/strrchr.js')

describe('php', function () {
  describe('strings.strrchr.js', function () {
    it('should pass test 1', function (done) {
      strrchr("Line 1\nLine 2\nLine 3", 10).substr(1)
      expected = 'Line 3'
      result = strrchr("Line 1\nLine 2\nLine 3", 10).substr(1)
      expect(result).to.equal(expected)
      done()
    })
  })
})