XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var idate = require('/Users/kvz/code/phpjs/src/php/datetime/idate.js')

describe('php', function () {
  describe('datetime.idate.js', function () {
    it('should pass test 1', function (done) {
      idate('y', 1255633200);
      expected = 9
      result = idate('y', 1255633200);
      expect(result).to.equal(expected)
      done()
    })
  })
})