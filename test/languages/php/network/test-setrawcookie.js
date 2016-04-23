XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var setrawcookie = require('/Users/kvz/code/phpjs/src/php/network/setrawcookie.js')

describe('php', function () {
  describe('network.setrawcookie.js', function () {
    it('should pass test 1', function (done) {
      setrawcookie('author_name', 'Kevin van Zonneveld');
      expected = true
      result = setrawcookie('author_name', 'Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
  })
})