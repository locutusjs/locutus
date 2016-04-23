XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var intval = require('/Users/kvz/code/phpjs/src/php/var/intval.js')

describe('php', function () {
  describe('var.intval.js', function () {
    it('should pass test 1', function (done) {
      intval('Kevin van Zonneveld');
      expected = 0
      result = intval('Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      intval(4.2);
      expected = 4
      result = intval(4.2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      intval(42, 8);
      expected = 42
      result = intval(42, 8);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      intval('09');
      expected = 9
      result = intval('09');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      intval('1e', 16);
      expected = 30
      result = intval('1e', 16);
      expect(result).to.equal(expected)
      done()
    })
  })
})