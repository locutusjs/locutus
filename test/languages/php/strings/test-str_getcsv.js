XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var str_getcsv = require('/Users/kvz/code/phpjs/src/php/strings/str_getcsv.js')

describe('php.strings.str_getcsv.js', function () {
  it('should pass example 1', function (done) {
    str_getcsv('"abc","def","ghi"')
    var expected = ['abc', 'def', 'ghi']
    var result = str_getcsv('"abc","def","ghi"')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    str_getcsv('"row2""cell1","row2cell2","row2cell3"', null, null, '"')
    var expected = ['row2"cell1', 'row2cell2', 'row2cell3']
    var result = str_getcsv('"row2""cell1","row2cell2","row2cell3"', null, null, '"')
    expect(result).to.deep.equal(expected)
    done()
  })
})