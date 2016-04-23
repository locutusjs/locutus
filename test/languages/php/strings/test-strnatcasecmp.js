XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strnatcasecmp = require('/Users/kvz/code/phpjs/src/php/strings/strnatcasecmp.js')

describe('php', function () {
  describe('strings.strnatcasecmp.js', function () {
    it('should pass test 1', function (done) {
      strnatcasecmp(10, 1);
      strnatcasecmp('1', '10');
      expected = 1
-1
strnatcasecmp(10, 1);
      result = strnatcasecmp('1', '10');
      expect(result).to.equal(expected)
      done()
    })
  })
})