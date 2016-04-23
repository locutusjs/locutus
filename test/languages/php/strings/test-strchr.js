XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strchr = require('/Users/kvz/code/phpjs/src/php/strings/strchr.js')

describe('php', function () {
  describe('strings.strchr.js', function () {
    it('should pass test 1', function (done) {
      strchr('Kevin van Zonneveld', 'van');
      expected = 'van Zonneveld'
      result = strchr('Kevin van Zonneveld', 'van');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strchr('Kevin van Zonneveld', 'van', true);
      expected = 'Kevin '
      result = strchr('Kevin van Zonneveld', 'van', true);
      expect(result).to.equal(expected)
      done()
    })
  })
})