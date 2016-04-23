XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var str_pad = require('/Users/kvz/code/phpjs/src/php/strings/str_pad.js')

describe('php', function () {
  describe('strings.str_pad.js', function () {
    it('should pass test 1', function (done) {
      str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
      expected = '-=-=-=-=-=-Kevin van Zonneveld'
      result = str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
      expected = '------Kevin van Zonneveld-----'
      result = str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
      expect(result).to.equal(expected)
      done()
    })
  })
})