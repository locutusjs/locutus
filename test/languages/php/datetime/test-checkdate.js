XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var checkdate = require('/Users/kvz/code/phpjs/src/php/datetime/checkdate.js')

describe('php', function () {
  describe('datetime.checkdate.js', function () {
    it('should pass test 1', function (done) {
      checkdate(12, 31, 2000);
      expected = true
      result = checkdate(12, 31, 2000);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      checkdate(2, 29, 2001);
      expected = false
      result = checkdate(2, 29, 2001);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      checkdate(3, 31, 2008);
      expected = true
      result = checkdate(3, 31, 2008);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      checkdate(1, 390, 2000);
      expected = false
      result = checkdate(1, 390, 2000);
      expect(result).to.equal(expected)
      done()
    })
  })
})