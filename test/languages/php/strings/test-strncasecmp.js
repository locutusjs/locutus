XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strncasecmp = require('/Users/kvz/code/phpjs/src/php/strings/strncasecmp.js')

describe('php', function () {
  describe('strings.strncasecmp.js', function () {
    it('should pass test 1', function (done) {
      strncasecmp('Price 12.9', 'Price 12.15', 2);
      expected = 0
      result = strncasecmp('Price 12.9', 'Price 12.15', 2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strncasecmp('Price 12.09', 'Price 12.15', 10);
      expected = -1
      result = strncasecmp('Price 12.09', 'Price 12.15', 10);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      strncasecmp('Price 12.90', 'Price 12.15', 30);
      expected = 8
      result = strncasecmp('Price 12.90', 'Price 12.15', 30);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      strncasecmp('Version 12.9', 'Version 12.15', 20);
      expected = 8
      result = strncasecmp('Version 12.9', 'Version 12.15', 20);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      strncasecmp('Version 12.15', 'Version 12.9', 20);
      expected = -8
      result = strncasecmp('Version 12.15', 'Version 12.9', 20);
      expect(result).to.equal(expected)
      done()
    })
  })
})