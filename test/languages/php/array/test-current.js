XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var current = require('/Users/kvz/code/phpjs/src/php/array/current.js')

describe('php', function () {
  describe('array.current.js', function () {
    it('should pass test 1', function (done) {
      transport = ['foot', 'bike', 'car', 'plane'];
      current(transport);
      expected = 'foot'
transport = ['foot', 'bike', 'car', 'plane'];
      result = current(transport);
      expect(result).to.equal(expected)
      done()
    })
  })
})