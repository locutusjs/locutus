XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var count = require('/Users/kvz/code/phpjs/src/php/array/count.js')

describe('php', function () {
  describe('array.count.js', function () {
    it('should pass test 1', function (done) {
      count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
      expected = 6
      result = count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
      expected = 6
      result = count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
      expect(result).to.equal(expected)
      done()
    })
  })
})