XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_values = require('/Users/kvz/code/phpjs/src/php/array/array_values.js')

describe('php', function () {
  describe('array.array_values.js', function () {
    it('should pass test 1', function (done) {
      array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
      expected = {0: 'Kevin', 1: 'van Zonneveld'}
      result = array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
      expect(result).to.equal(expected)
      done()
    })
  })
})