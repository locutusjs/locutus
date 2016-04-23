XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var end = require('/Users/kvz/code/phpjs/src/php/array/end.js')

describe('php', function () {
  describe('array.end.js', function () {
    it('should pass test 1', function (done) {
      end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
      expected = 'Zonneveld'
      result = end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      end(['Kevin', 'van', 'Zonneveld']);
      expected = 'Zonneveld'
      result = end(['Kevin', 'van', 'Zonneveld']);
      expect(result).to.equal(expected)
      done()
    })
  })
})