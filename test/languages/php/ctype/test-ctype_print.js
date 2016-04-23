XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ctype_print = require('/Users/kvz/code/phpjs/src/php/ctype/ctype_print.js')

describe('php', function () {
  describe('ctype.ctype_print.js', function () {
    it('should pass test 1', function (done) {
      ctype_print('AbC!#12');
      expected = true
      result = ctype_print('AbC!#12');
      expect(result).to.equal(expected)
      done()
    })
  })
})