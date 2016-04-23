XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strval = require('/Users/kvz/code/phpjs/src/php/var/strval.js')

describe('php', function () {
  describe('var.strval.js', function () {
    it('should pass test 1', function (done) {
      strval({red: 1, green: 2, blue: 3, white: 4});
      expected = 'Object'
      result = strval({red: 1, green: 2, blue: 3, white: 4});
      expect(result).to.equal(expected)
      done()
    })
  })
})