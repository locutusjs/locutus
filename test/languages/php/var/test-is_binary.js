XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_binary = require('/Users/kvz/code/phpjs/src/php/var/is_binary.js')

describe('php', function () {
  describe('var.is_binary.js', function () {
    it('should pass test 1', function (done) {
      is_binary('This could be binary as far as JavaScript knows...');
      expected = true
      result = is_binary('This could be binary as far as JavaScript knows...');
      expect(result).to.equal(expected)
      done()
    })
  })
})