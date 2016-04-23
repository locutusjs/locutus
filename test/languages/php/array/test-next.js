XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var next = require('/Users/kvz/code/phpjs/src/php/array/next.js')

describe('php', function () {
  describe('array.next.js', function () {
    it('should pass test 1', function (done) {
      transport = ['foot', 'bike', 'car', 'plane'];
      next(transport);
      next(transport);
      expected = 'car'
transport = ['foot', 'bike', 'car', 'plane'];
next(transport);
      result = next(transport);
      expect(result).to.equal(expected)
      done()
    })
  })
})