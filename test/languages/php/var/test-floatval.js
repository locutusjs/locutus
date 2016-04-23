XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var floatval = require('/Users/kvz/code/phpjs/src/php/var/floatval.js')

describe('php', function () {
  describe('var.floatval.js', function () {
    it('should pass test 1', function (done) {
      floatval('150.03_page-section');
      expected = 150.03
      result = floatval('150.03_page-section');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      floatval('page: 3');
      floatval('-50 + 8');
      expected = 0
-50
floatval('page: 3');
      result = floatval('-50 + 8');
      expect(result).to.equal(expected)
      done()
    })
  })
})