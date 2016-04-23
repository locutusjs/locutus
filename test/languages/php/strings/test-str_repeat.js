XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var str_repeat = require('/Users/kvz/code/phpjs/src/php/strings/str_repeat.js')

describe('php', function () {
  describe('strings.str_repeat.js', function () {
    it('should pass test 1', function (done) {
      str_repeat('-=', 10);
      expected = '-=-=-=-=-=-=-=-=-=-='
      result = str_repeat('-=', 10);
      expect(result).to.equal(expected)
      done()
    })
  })
})