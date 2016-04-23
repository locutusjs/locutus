XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strcmp = require('/Users/kvz/code/phpjs/src/php/strings/strcmp.js')

describe('php', function () {
  describe('strings.strcmp.js', function () {
    it('should pass test 1', function (done) {
      strcmp( 'waldo', 'owald' );
      expected = 1
      result = strcmp( 'waldo', 'owald' );
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strcmp( 'owald', 'waldo' );
      expected = -1
      result = strcmp( 'owald', 'waldo' );
      expect(result).to.equal(expected)
      done()
    })
  })
})