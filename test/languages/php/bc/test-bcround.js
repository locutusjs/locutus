XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var bcround = require('/Users/kvz/code/phpjs/src/php/bc/bcround.js')

describe('php', function () {
  describe('bc.bcround.js', function () {
    it('should pass test 1', function (done) {
      bcround(1, 2);
      expected = 3
      result = bcround(1, 2);
      expect(result).to.equal(expected)
      done()
    })
  })
})