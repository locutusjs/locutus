XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var mktime = require('/Users/kvz/code/phpjs/src/php/datetime/mktime.js')

describe('php', function () {
  describe('datetime.mktime.js', function () {
    it('should pass test 1', function (done) {
      mktime(14, 10, 2, 2, 1, 2008);
      expected = 1201875002
      result = mktime(14, 10, 2, 2, 1, 2008);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      mktime(0, 0, 0, 0, 1, 2008);
      expected = 1196467200
      result = mktime(0, 0, 0, 0, 1, 2008);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      make = mktime();
      td = new Date();
      real = Math.floor(td.getTime() / 1000);
      diff = (real - make);
      diff < 5
      expected = true
make = mktime();
td = new Date();
real = Math.floor(td.getTime() / 1000);
diff = (real - make);
      result = diff < 5
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      mktime(0, 0, 0, 13, 1, 1997)
      expected = 883612800
      result = mktime(0, 0, 0, 13, 1, 1997)
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      mktime(0, 0, 0, 1, 1, 1998)
      expected = 883612800
      result = mktime(0, 0, 0, 1, 1, 1998)
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      mktime(0, 0, 0, 1, 1, 98)
      expected = 883612800
      result = mktime(0, 0, 0, 1, 1, 98)
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 7', function (done) {
      mktime(23, 59, 59, 13, 0, 2010)
      expected = 1293839999
      result = mktime(23, 59, 59, 13, 0, 2010)
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 8', function (done) {
      mktime(0, 0, -1, 1, 1, 1970)
      expected = -1
      result = mktime(0, 0, -1, 1, 1, 1970)
      expect(result).to.equal(expected)
      done()
    })
  })
})