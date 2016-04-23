XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var prev = require('/Users/kvz/code/phpjs/src/php/array/prev.js')

describe('php', function () {
  describe('array.prev.js', function () {
    it('should pass test 1', function (done) {
      transport = ['foot', 'bike', 'car', 'plane'];
      prev(transport);
      expected = false
transport = ['foot', 'bike', 'car', 'plane'];
      result = prev(transport);
      expect(result).to.equal(expected)
      done()
    })
  })
})