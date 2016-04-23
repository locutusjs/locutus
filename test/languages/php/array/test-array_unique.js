XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_unique = require('/Users/kvz/code/phpjs/src/php/array/array_unique.js')

describe('php', function () {
  describe('array.array_unique.js', function () {
    it('should pass test 1', function (done) {
      array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
      expected = {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
      result = array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'});
      expected = {a: 'green', 0: 'red', 1: 'blue'}
      result = array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'});
      expect(result).to.equal(expected)
      done()
    })
  })
})