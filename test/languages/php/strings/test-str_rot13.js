XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var str_rot13 = require('/Users/kvz/code/phpjs/src/php/strings/str_rot13.js')

describe('php', function () {
  describe('strings.str_rot13.js', function () {
    it('should pass test 1', function (done) {
      str_rot13('Kevin van Zonneveld');
      expected = 'Xriva ina Mbaariryq'
      result = str_rot13('Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      str_rot13('Xriva ina Mbaariryq');
      expected = 'Kevin van Zonneveld'
      result = str_rot13('Xriva ina Mbaariryq');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      str_rot13(33);
      expected = '33'
      result = str_rot13(33);
      expect(result).to.equal(expected)
      done()
    })
  })
})