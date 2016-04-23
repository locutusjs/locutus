XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var empty = require('/Users/kvz/code/phpjs/src/php/var/empty.js')

describe('php', function () {
  describe('var.empty.js', function () {
    it('should pass test 1', function (done) {
      empty(null);
      expected = true
      result = empty(null);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      empty(undefined);
      expected = true
      result = empty(undefined);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      empty([]);
      expected = true
      result = empty([]);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      empty({});
      expected = true
      result = empty({});
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      empty({'aFunc' : function () { alert('humpty'); } });
      expected = false
      result = empty({'aFunc' : function () { alert('humpty'); } });
      expect(result).to.equal(expected)
      done()
    })
  })
})