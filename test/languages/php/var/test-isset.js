XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var isset = require('/Users/kvz/code/phpjs/src/php/var/isset.js')

describe('php', function () {
  describe('var.isset.js', function () {
    it('should pass test 1', function (done) {
      isset( undefined, true);
      expected = false
      result = isset( undefined, true);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      isset( 'Kevin van Zonneveld' );
      expected = true
      result = isset( 'Kevin van Zonneveld' );
      expect(result).to.equal(expected)
      done()
    })
  })
})