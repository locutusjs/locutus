XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var bcadd = require('/Users/kvz/code/phpjs/src/php/bc/bcadd.js')

describe('php', function () {
  describe('bc.bcadd.js', function () {
    it('should pass test 1', function (done) {
      bcadd(1, 2);
      expected = 3
      result = bcadd(1, 2);
      expect(result).to.equal(expected)
      done()
    })
  })
})