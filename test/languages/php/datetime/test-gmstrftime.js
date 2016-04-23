XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var gmstrftime = require('/Users/kvz/code/phpjs/src/php/datetime/gmstrftime.js')

describe('php', function () {
  describe('datetime.gmstrftime.js', function () {
    it('should pass test 1', function (done) {
      gmstrftime("%A", 1062462400);
      expected = 'Tuesday'
      result = gmstrftime("%A", 1062462400);
      expect(result).to.equal(expected)
      done()
    })
  })
})