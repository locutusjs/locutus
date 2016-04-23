XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var time = require('/Users/kvz/code/phpjs/src/php/datetime/time.js')

describe('php', function () {
  describe('datetime.time.js', function () {
    it('should pass test 1', function (done) {
      timeStamp = time();
      timeStamp > 1000000000 && timeStamp < 2000000000
      expected = true
timeStamp = time();
      result = timeStamp > 1000000000 && timeStamp < 2000000000
      expect(result).to.equal(expected)
      done()
    })
  })
})