XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var octdec = require('/Users/kvz/code/phpjs/src/php/math/octdec.js')

describe('php', function () {
  describe('math.octdec.js', function () {
    it('should pass test 1', function (done) {
      octdec('77');
      expected = 63
      result = octdec('77');
      expect(result).to.equal(expected)
      done()
    })
  })
})