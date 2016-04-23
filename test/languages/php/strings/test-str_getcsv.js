XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var str_getcsv = require('/Users/kvz/code/phpjs/src/php/strings/str_getcsv.js')

describe('php', function () {
  describe('strings.str_getcsv.js', function () {
    it('should pass test 1', function (done) {
      str_getcsv('"abc","def","ghi"');
      expected = ['abc', 'def', 'ghi']
      result = str_getcsv('"abc","def","ghi"');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      str_getcsv('"row2""cell1","row2cell2","row2cell3"', null, null, '"');
      expected = ['row2"cell1', 'row2cell2', 'row2cell3']
      result = str_getcsv('"row2""cell1","row2cell2","row2cell3"', null, null, '"');
      expect(result).to.equal(expected)
      done()
    })
  })
})