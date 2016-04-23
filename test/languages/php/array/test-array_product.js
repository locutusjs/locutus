XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_product = require('/Users/kvz/code/phpjs/src/php/array/array_product.js')

describe('php', function () {
  describe('array.array_product.js', function () {
    it('should pass test 1', function (done) {
      array_product([ 2, 4, 6, 8 ]);
      expected = 384
      result = array_product([ 2, 4, 6, 8 ]);
      expect(result).to.equal(expected)
      done()
    })
  })
})