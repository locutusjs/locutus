XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var bcscale = require('/Users/kvz/code/phpjs/src/php/bc/bcscale.js')

describe('php', function () {
  describe('bc.bcscale.js', function () {
    it('should pass test 1', function (done) {
      bcscale(1);
      expected = 3
      result = bcscale(1);
      expect(result).to.equal(expected)
      done()
    })
  })
})