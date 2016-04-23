XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_reverse = require('/Users/kvz/code/phpjs/src/php/array/array_reverse.js')

describe('php.array.array_reverse.js', function () {
  it('should pass example 1', function (done) {
    array_reverse( [ 'php', '4.0', ['green', 'red'] ], true)
    var expected = { 2: ['green', 'red'], 1: '4.0', 0: 'php'}
    var result = array_reverse( [ 'php', '4.0', ['green', 'red'] ], true)
    expect(result).to.deep.equal(expected)
    done()
  })
})