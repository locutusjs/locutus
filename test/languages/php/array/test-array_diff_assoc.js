XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_diff_assoc = require('/Users/kvz/code/phpjs/src/php/array/array_diff_assoc.js')

describe('php', function () {
  describe('array.array_diff_assoc.js', function () {
    it('should pass test 1', function (done) {
      array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'});
      expected = {1: 'van', 2: 'Zonneveld'}
      result = array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'});
      expect(result).to.equal(expected)
      done()
    })
  })
})