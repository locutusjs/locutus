XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var assert_options = require('/Users/kvz/code/phpjs/src/php/info/assert_options.js')

describe('php', function () {
  describe('info.assert_options.js', function () {
    it('should pass test 1', function (done) {
      assert_options('ASSERT_CALLBACK');
      expected = null
      result = assert_options('ASSERT_CALLBACK');
      expect(result).to.equal(expected)
      done()
    })
  })
})