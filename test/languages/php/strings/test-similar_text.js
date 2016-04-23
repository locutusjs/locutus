XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var similar_text = require('/Users/kvz/code/phpjs/src/php/strings/similar_text.js')

describe('php', function () {
  describe('strings.similar_text.js', function () {
    it('should pass test 1', function (done) {
      similar_text('Hello World!', 'Hello locutus!');
      expected = 8
      result = similar_text('Hello World!', 'Hello locutus!');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      similar_text('Hello World!', null);
      expected = 0
      result = similar_text('Hello World!', null);
      expect(result).to.equal(expected)
      done()
    })
  })
})