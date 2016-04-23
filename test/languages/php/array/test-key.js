XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var key = require('/Users/kvz/code/phpjs/src/php/array/key.js')

describe('php.array.key.js', function () {
  it('should pass example 1', function (done) {
    array = {fruit1: 'apple', 'fruit2': 'orange'}
    key(array)
    var expected = 'fruit1'
array = {fruit1: 'apple', 'fruit2': 'orange'}
    var result = key(array)
    expect(result).to.deep.equal(expected)
    done()
  })
})