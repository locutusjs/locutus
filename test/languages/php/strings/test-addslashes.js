XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var addslashes = require('/Users/kvz/code/phpjs/src/php/strings/addslashes.js')

describe('php', function () {
  describe('strings.addslashes.js', function () {
    it('should pass test 1', function (done) {
      addslashes("kevin's birthday");
      expected = "kevin\\'s birthday"
      result = addslashes("kevin's birthday");
      expect(result).to.equal(expected)
      done()
    })
  })
})