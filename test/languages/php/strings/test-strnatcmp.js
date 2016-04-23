XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strnatcmp = require('/Users/kvz/code/phpjs/src/php/strings/strnatcmp.js')

describe('php', function () {
  describe('strings.strnatcmp.js', function () {
    it('should pass test 1', function (done) {
      strnatcmp('Price 12.9', 'Price 12.15');
      expected = 1
      result = strnatcmp('Price 12.9', 'Price 12.15');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strnatcmp('Price 12.09', 'Price 12.15');
      expected = -1
      result = strnatcmp('Price 12.09', 'Price 12.15');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      strnatcmp('Price 12.90', 'Price 12.15');
      expected = 1
      result = strnatcmp('Price 12.90', 'Price 12.15');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      strnatcmp('Version 12.9', 'Version 12.15', true);
      expected = -6
      result = strnatcmp('Version 12.9', 'Version 12.15', true);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      strnatcmp('Version 12.15', 'Version 12.9', true);
      expected = 6
      result = strnatcmp('Version 12.15', 'Version 12.9', true);
      expect(result).to.equal(expected)
      done()
    })
  })
})