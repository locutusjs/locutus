XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var version_compare = require('/Users/kvz/code/phpjs/src/php/info/version_compare.js')

describe('php', function () {
  describe('info.version_compare.js', function () {
    it('should pass test 1', function (done) {
      version_compare('8.2.5rc', '8.2.5a');
      expected = 1
      result = version_compare('8.2.5rc', '8.2.5a');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      version_compare('8.2.50', '8.2.52', '<');
      expected = true
      result = version_compare('8.2.50', '8.2.52', '<');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      version_compare('5.3.0-dev', '5.3.0');
      expected = -1
      result = version_compare('5.3.0-dev', '5.3.0');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      version_compare('4.1.0.52','4.01.0.51');
      expected = 1
      result = version_compare('4.1.0.52','4.01.0.51');
      expect(result).to.equal(expected)
      done()
    })
  })
})