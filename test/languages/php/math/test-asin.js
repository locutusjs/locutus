XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var asin = require('/Users/kvz/code/phpjs/src/php/math/asin.js')

describe('php', function () {
  describe('math.asin.js', function () {
    it('should pass test 1', function (done) {
      (asin(0.3) + '').substr(0, 17);
      expected = "0.304692654015397"
      result = (asin(0.3) + '').substr(0, 17);
      expect(result).to.equal(expected)
      done()
    })
  })
})