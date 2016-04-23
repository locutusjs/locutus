XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var chunk_split = require('/Users/kvz/code/phpjs/src/php/strings/chunk_split.js')

describe('php', function () {
  describe('strings.chunk_split.js', function () {
    it('should pass test 1', function (done) {
      chunk_split('Hello world!', 1, '*');
      expected = 'H*e*l*l*o* *w*o*r*l*d*!*'
      result = chunk_split('Hello world!', 1, '*');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      chunk_split('Hello world!', 10, '*');
      expected = 'Hello worl*d!*'
      result = chunk_split('Hello world!', 10, '*');
      expect(result).to.equal(expected)
      done()
    })
  })
})