XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_combine = require('/Users/kvz/code/phpjs/src/php/array/array_combine.js')

describe('php', function () {
  describe('array.array_combine.js', function () {
    it('should pass test 1', function (done) {
      array_combine([0,1,2], ['kevin','van','zonneveld']);
      expected = {0: 'kevin', 1: 'van', 2: 'zonneveld'}
      result = array_combine([0,1,2], ['kevin','van','zonneveld']);
      expect(result).to.equal(expected)
      done()
    })
  })
})