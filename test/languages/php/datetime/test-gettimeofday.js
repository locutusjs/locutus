XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var gettimeofday = require('/Users/kvz/code/phpjs/src/php/datetime/gettimeofday.js')

describe('php', function () {
  describe('datetime.gettimeofday.js', function () {
    it('should pass test 1', function (done) {
      gettimeofday();
      expected = {sec: 12, usec: 153000, minuteswest: -480, dsttime: 0}
      result = gettimeofday();
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      gettimeofday(true);
      expected = 1238748978.49
      result = gettimeofday(true);
      expect(result).to.equal(expected)
      done()
    })
  })
})