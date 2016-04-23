XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var getenv = require('/Users/kvz/code/phpjs/src/php/info/getenv.js')

describe('php', function () {
  describe('info.getenv.js', function () {
    it('should pass test 1', function (done) {
      getenv('LC_ALL');
      expected = false
      result = getenv('LC_ALL');
      expect(result).to.equal(expected)
      done()
    })
  })
})