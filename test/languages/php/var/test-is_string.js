XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_string = require('/Users/kvz/code/phpjs/src/php/var/is_string.js')

describe('php', function () {
  describe('var.is_string.js', function () {
    it('should pass test 1', function (done) {
      is_string('23');
      expected = true
      result = is_string('23');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      is_string(23.5);
      expected = false
      result = is_string(23.5);
      expect(result).to.equal(expected)
      done()
    })
  })
})