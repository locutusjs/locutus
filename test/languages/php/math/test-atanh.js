XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var atanh = require('/Users/kvz/code/phpjs/src/php/math/atanh.js')

describe('php', function () {
  describe('math.atanh.js', function () {
    it('should pass test 1', function (done) {
      atanh(0.3);
      expected = 0.3095196042031118
      result = atanh(0.3);
      expect(result).to.equal(expected)
      done()
    })
  })
})