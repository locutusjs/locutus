XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var stristr = require('/Users/kvz/code/phpjs/src/php/strings/stristr.js')

describe('php', function () {
  describe('strings.stristr.js', function () {
    it('should pass test 1', function (done) {
      stristr('Kevin van Zonneveld', 'Van');
      expected = 'van Zonneveld'
      result = stristr('Kevin van Zonneveld', 'Van');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      stristr('Kevin van Zonneveld', 'VAN', true);
      expected = 'Kevin '
      result = stristr('Kevin van Zonneveld', 'VAN', true);
      expect(result).to.equal(expected)
      done()
    })
  })
})