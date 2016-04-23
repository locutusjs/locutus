XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var sprintf = require('/Users/kvz/code/phpjs/src/php/strings/sprintf.js')

describe('php', function () {
  describe('strings.sprintf.js', function () {
    it('should pass test 1', function (done) {
      sprintf("%01.2f", 123.1);
      expected = 123.10
      result = sprintf("%01.2f", 123.1);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      sprintf("[%10s]", 'monkey');
      expected = '[    monkey]'
      result = sprintf("[%10s]", 'monkey');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      sprintf("[%'#10s]", 'monkey');
      expected = '[####monkey]'
      result = sprintf("[%'#10s]", 'monkey');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      sprintf("%d", 123456789012345);
      expected = '123456789012345'
      result = sprintf("%d", 123456789012345);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      sprintf('%-03s', 'E');
      expected = 'E00'
      result = sprintf('%-03s', 'E');
      expect(result).to.equal(expected)
      done()
    })
  })
})