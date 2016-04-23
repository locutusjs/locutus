XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var each = require('/Users/kvz/code/phpjs/src/php/array/each.js')

describe('php', function () {
  describe('array.each.js', function () {
    it('should pass test 1', function (done) {
      each({a: "apple", b: "balloon"});
      expected = {0: "a", 1: "apple", key: "a", value: "apple"}
      result = each({a: "apple", b: "balloon"});
      expect(result).to.equal(expected)
      done()
    })
  })
})