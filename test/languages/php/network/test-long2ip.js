XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var long2ip = require('/Users/kvz/code/phpjs/src/php/network/long2ip.js')

describe('php', function () {
  describe('network.long2ip.js', function () {
    it('should pass test 1', function (done) {
      long2ip( 3221234342 );
      expected = '192.0.34.166'
      result = long2ip( 3221234342 );
      expect(result).to.equal(expected)
      done()
    })
  })
})