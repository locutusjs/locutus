XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var sql_regcase = require('/Users/kvz/code/phpjs/src/php/pcre/sql_regcase.js')

describe('php', function () {
  describe('pcre.sql_regcase.js', function () {
    it('should pass test 1', function (done) {
      sql_regcase('Foo - bar.');
      expected = '[Ff][Oo][Oo] - [Bb][Aa][Rr].'
      result = sql_regcase('Foo - bar.');
      expect(result).to.equal(expected)
      done()
    })
  })
})