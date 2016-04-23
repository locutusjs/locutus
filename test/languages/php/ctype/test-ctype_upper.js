XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ctype_upper = require('/Users/kvz/code/phpjs/src/php/ctype/ctype_upper.js')

describe('php', function () {
  describe('ctype.ctype_upper.js', function () {
    it('should pass test 1', function (done) {
      ctype_upper('AZ');
      expected = true
      result = ctype_upper('AZ');
      expect(result).to.equal(expected)
      done()
    })
  })
})