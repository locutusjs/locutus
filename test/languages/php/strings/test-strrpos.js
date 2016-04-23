XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strrpos = require('/Users/kvz/code/phpjs/src/php/strings/strrpos.js')

describe('php', function () {
  describe('strings.strrpos.js', function () {
    it('should pass test 1', function (done) {
      strrpos('Kevin van Zonneveld', 'e');
      expected = 16
      result = strrpos('Kevin van Zonneveld', 'e');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strrpos('somepage.com', '.', false);
      expected = 8
      result = strrpos('somepage.com', '.', false);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      strrpos('baa', 'a', 3);
      expected = false
      result = strrpos('baa', 'a', 3);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      strrpos('baa', 'a', 2);
      expected = 2
      result = strrpos('baa', 'a', 2);
      expect(result).to.equal(expected)
      done()
    })
  })
})