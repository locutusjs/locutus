XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var convert_cyr_string = require('/Users/kvz/code/phpjs/src/php/strings/convert_cyr_string.js')

describe('php', function () {
  describe('strings.convert_cyr_string.js', function () {
    it('should pass test 1', function (done) {
      convert_cyr_string(String.fromCharCode(214), 'k', 'w').charCodeAt(0) === 230; // Char. 214 of KOI8-R gives equivalent number value 230 in win1251
      expected = true
      result = convert_cyr_string(String.fromCharCode(214), 'k', 'w').charCodeAt(0) === 230; // Char. 214 of KOI8-R gives equivalent number value 230 in win1251
      expect(result).to.equal(expected)
      done()
    })
  })
})