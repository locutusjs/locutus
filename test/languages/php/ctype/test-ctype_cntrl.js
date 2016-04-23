XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ctype_cntrl = require('/Users/kvz/code/phpjs/src/php/ctype/ctype_cntrl.js')

describe('php', function () {
  describe('ctype.ctype_cntrl.js', function () {
    it('should pass test 1', function (done) {
      ctype_cntrl('\u0020');
      expected = false
      result = ctype_cntrl('\u0020');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      ctype_cntrl('\u001F');
      expected = true
      result = ctype_cntrl('\u001F');
      expect(result).to.equal(expected)
      done()
    })
  })
})