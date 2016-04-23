XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var nl_langinfo = require('/Users/kvz/code/phpjs/src/php/strings/nl_langinfo.js')

describe('php', function () {
  describe('strings.nl_langinfo.js', function () {
    it('should pass test 1', function (done) {
      nl_langinfo('DAY_1');
      expected = 'Sunday'
      result = nl_langinfo('DAY_1');
      expect(result).to.equal(expected)
      done()
    })
  })
})