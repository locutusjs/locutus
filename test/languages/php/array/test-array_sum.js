XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_sum = require('/Users/kvz/code/phpjs/src/php/array/array_sum.js')

describe('php', function () {
  describe('array.array_sum.js', function () {
    it('should pass test 1', function (done) {
      array_sum([4, 9, 182.6]);
      expected = 195.6
      result = array_sum([4, 9, 182.6]);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      total = []; index = 0.1; for (y=0; y < 12; y++){total[y] = y + index;}
      array_sum(total);
      expected = 67.2
total = []; index = 0.1; for (y=0; y < 12; y++){total[y] = y + index;}
      result = array_sum(total);
      expect(result).to.equal(expected)
      done()
    })
  })
})