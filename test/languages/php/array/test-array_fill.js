XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_fill = require('/Users/kvz/code/phpjs/src/php/array/array_fill.js')

describe('php.array.array_fill.js', function () {
  it('should pass example 1', function (done) {
    array_fill(5, 6, 'banana');
    var expected = { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }
    var result = array_fill(5, 6, 'banana');
    expect(result).to.deep.equal(expected)
    done()
  })
})