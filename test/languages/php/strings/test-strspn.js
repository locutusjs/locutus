XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strspn = require('/Users/kvz/code/phpjs/src/php/strings/strspn.js')

describe('php', function () {
  describe('strings.strspn.js', function () {
    it('should pass test 1', function (done) {
      strspn('42 is the answer, what is the question ...', '1234567890');
      expected = 2
      result = strspn('42 is the answer, what is the question ...', '1234567890');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strspn('foo', 'o', 1, 2);
      expected = 2
      result = strspn('foo', 'o', 1, 2);
      expect(result).to.equal(expected)
      done()
    })
  })
})