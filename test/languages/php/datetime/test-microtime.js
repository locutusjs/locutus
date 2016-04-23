XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var microtime = require('/Users/kvz/code/phpjs/src/php/datetime/microtime.js')

describe('php', function () {
  describe('datetime.microtime.js', function () {
    it('should pass test 1', function (done) {
      timeStamp = microtime(true);
      timeStamp > 1000000000 && timeStamp < 2000000000
      expected = true
timeStamp = microtime(true);
      result = timeStamp > 1000000000 && timeStamp < 2000000000
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      /^0\.[0-9]{1,6} [0-9]{10,10}$/.test(microtime())
      expected = true
      result = /^0\.[0-9]{1,6} [0-9]{10,10}$/.test(microtime())
      expect(result).to.equal(expected)
      done()
    })
  })
})