XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var setcookie = require('/Users/kvz/code/phpjs/src/php/network/setcookie.js')

describe('php', function () {
  describe('network.setcookie.js', function () {
    it('should pass test 1', function (done) {
      setcookie('author_name', 'Kevin van Zonneveld');
      expected = true
      result = setcookie('author_name', 'Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
  })
})