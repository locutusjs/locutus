XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_numeric = require('/Users/kvz/code/phpjs/src/php/var/is_numeric.js')

describe('php', function () {
  describe('var.is_numeric.js', function () {
    it('should pass test 1', function (done) {
      is_numeric(186.31);
      expected = true
      result = is_numeric(186.31);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      is_numeric('Kevin van Zonneveld');
      expected = false
      result = is_numeric('Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      is_numeric(' +186.31e2');
      expected = true
      result = is_numeric(' +186.31e2');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      is_numeric('');
      expected = false
      result = is_numeric('');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      is_numeric([]);
      expected = false
      result = is_numeric([]);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      is_numeric('1 ');
      expected = false
      result = is_numeric('1 ');
      expect(result).to.equal(expected)
      done()
    })
  })
})