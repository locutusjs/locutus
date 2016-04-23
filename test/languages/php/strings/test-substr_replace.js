XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var substr_replace = require('/Users/kvz/code/phpjs/src/php/strings/substr_replace.js')

describe('php', function () {
  describe('strings.substr_replace.js', function () {
    it('should pass test 1', function (done) {
      substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0);
      expected = 'bob'
      result = substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      $var = 'ABCDEFGH:/MNRPQR/';
      substr_replace($var, 'bob', 0, $var.length);
      expected = 'bob'
$var = 'ABCDEFGH:/MNRPQR/';
      result = substr_replace($var, 'bob', 0, $var.length);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0);
      expected = 'bobABCDEFGH:/MNRPQR/'
      result = substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1);
      expected = 'ABCDEFGH:/bob/'
      result = substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1);
      expected = 'ABCDEFGH:/bob/'
      result = substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)
      expected = 'ABCDEFGH://'
      result = substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)
      expect(result).to.equal(expected)
      done()
    })
  })
})