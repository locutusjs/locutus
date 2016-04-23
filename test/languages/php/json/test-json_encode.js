XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var json_encode = require('/Users/kvz/code/phpjs/src/php/json/json_encode.js')

describe('php', function () {
  describe('json.json_encode.js', function () {
    it('should pass test 1', function (done) {
      json_encode('Kevin');
      expected = '"Kevin"'
      result = json_encode('Kevin');
      expect(result).to.equal(expected)
      done()
    })
  })
})