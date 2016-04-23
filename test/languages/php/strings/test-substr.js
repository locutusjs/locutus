XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var substr = require('/Users/kvz/code/phpjs/src/php/strings/substr.js')

describe('php', function () {
  describe('strings.substr.js', function () {
    it('should pass test 1', function (done) {
      substr('abcdef', 0, -1);
      expected = 'abcde'
      result = substr('abcdef', 0, -1);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      substr(2, 0, -6);
      expected = false
      result = substr(2, 0, -6);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      ini_set('unicode.semantics',  'on');
      substr('a\uD801\uDC00', 0, -1);
      expected = 'a'
ini_set('unicode.semantics',  'on');
      result = substr('a\uD801\uDC00', 0, -1);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      ini_set('unicode.semantics',  'on');
      substr('a\uD801\uDC00', 0, 2);
      expected = 'a\uD801\uDC00'
ini_set('unicode.semantics',  'on');
      result = substr('a\uD801\uDC00', 0, 2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      ini_set('unicode.semantics',  'on');
      substr('a\uD801\uDC00', -1, 1);
      expected = '\uD801\uDC00'
ini_set('unicode.semantics',  'on');
      result = substr('a\uD801\uDC00', -1, 1);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      ini_set('unicode.semantics',  'on');
      substr('a\uD801\uDC00z\uD801\uDC00', -3, 2);
      expected = '\uD801\uDC00z'
ini_set('unicode.semantics',  'on');
      result = substr('a\uD801\uDC00z\uD801\uDC00', -3, 2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 7', function (done) {
      ini_set('unicode.semantics',  'on');
      substr('a\uD801\uDC00z\uD801\uDC00', -3, -1)
      expected = '\uD801\uDC00z'
ini_set('unicode.semantics',  'on');
      result = substr('a\uD801\uDC00z\uD801\uDC00', -3, -1)
      expect(result).to.equal(expected)
      done()
    })
  })
})