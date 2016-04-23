XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var gmmktime = require('/Users/kvz/code/phpjs/src/php/datetime/gmmktime.js')

describe('php', function () {
  describe('datetime.gmmktime.js', function () {
    it('should pass test 1', function (done) {
      gmmktime(14, 10, 2, 2, 1, 2008);
      expected = 1201875002
      result = gmmktime(14, 10, 2, 2, 1, 2008);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      gmmktime(0, 0, -1, 1, 1, 1970);
      expected = -1
      result = gmmktime(0, 0, -1, 1, 1, 1970);
      expect(result).to.equal(expected)
      done()
    })
  })
})