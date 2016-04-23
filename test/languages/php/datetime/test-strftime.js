XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strftime = require('/Users/kvz/code/phpjs/src/php/datetime/strftime.js')

describe('php', function () {
  describe('datetime.strftime.js', function () {
    it('should pass test 1', function (done) {
      strftime("%A", 1062462400); // Return value will depend on date and locale
      expected = 'Tuesday'
      result = strftime("%A", 1062462400); // Return value will depend on date and locale
      expect(result).to.equal(expected)
      done()
    })
  })
})