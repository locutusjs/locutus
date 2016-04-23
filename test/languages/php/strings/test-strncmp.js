XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strncmp = require('/Users/kvz/code/phpjs/src/php/strings/strncmp.js')

describe('php', function () {
  describe('strings.strncmp.js', function () {
    it('should pass test 1', function (done) {
      strncmp('aaa', 'aab', 2);
      expected = 0
      result = strncmp('aaa', 'aab', 2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strncmp('aaa', 'aab', 3 );
      expected = -1
      result = strncmp('aaa', 'aab', 3 );
      expect(result).to.equal(expected)
      done()
    })
  })
})