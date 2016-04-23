XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_push = require('/Users/kvz/code/phpjs/src/php/array/array_push.js')

describe('php', function () {
  describe('array.array_push.js', function () {
    it('should pass test 1', function (done) {
      array_push(['kevin','van'], 'zonneveld');
      expected = 3
      result = array_push(['kevin','van'], 'zonneveld');
      expect(result).to.equal(expected)
      done()
    })
  })
})