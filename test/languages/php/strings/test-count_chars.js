XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var count_chars = require('/Users/kvz/code/phpjs/src/php/strings/count_chars.js')

describe('php', function () {
  describe('strings.count_chars.js', function () {
    it('should pass test 1', function (done) {
      count_chars("Hello World!", 3);
      expected = " !HWdelor"
      result = count_chars("Hello World!", 3);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      count_chars("Hello World!", 1);
      expected = {32:1,33:1,72:1,87:1,100:1,101:1,108:3,111:2,114:1}
      result = count_chars("Hello World!", 1);
      expect(result).to.equal(expected)
      done()
    })
  })
})