XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var reset = require('/Users/kvz/code/phpjs/src/php/array/reset.js')

describe('php', function () {
  describe('array.reset.js', function () {
    it('should pass test 1', function (done) {
      reset({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
      expected = 'Kevin'
      result = reset({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
      expect(result).to.equal(expected)
      done()
    })
  })
})