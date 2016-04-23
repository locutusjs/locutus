XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var doubleval = require('/Users/kvz/code/phpjs/src/php/var/doubleval.js')

describe('php', function () {
  describe('var.doubleval.js', function () {
    it('should pass test 1', function (done) {
      doubleval(186);
      expected = 186.00
      result = doubleval(186);
      expect(result).to.equal(expected)
      done()
    })
  })
})