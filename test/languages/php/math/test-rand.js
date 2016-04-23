XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var rand = require('/Users/kvz/code/phpjs/src/php/math/rand.js')

describe('php', function () {
  describe('math.rand.js', function () {
    it('should pass test 1', function (done) {
      rand(1, 1);
      expected = 1
      result = rand(1, 1);
      expect(result).to.equal(expected)
      done()
    })
  })
})