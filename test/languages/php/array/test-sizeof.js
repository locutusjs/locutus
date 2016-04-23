XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var sizeof = require('/Users/kvz/code/phpjs/src/php/array/sizeof.js')

describe('php', function () {
  describe('array.sizeof.js', function () {
    it('should pass test 1', function (done) {
      sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE');
      expected = 6
      result = sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
      expected = 6
      result = sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
      expect(result).to.equal(expected)
      done()
    })
  })
})