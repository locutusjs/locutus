XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var call_user_func = require('/Users/kvz/code/phpjs/src/php/funchand/call_user_func.js')

describe('php', function () {
  describe('funchand.call_user_func.js', function () {
    it('should pass test 1', function (done) {
      call_user_func('isNaN', 'a');
      expected = true
      result = call_user_func('isNaN', 'a');
      expect(result).to.equal(expected)
      done()
    })
  })
})