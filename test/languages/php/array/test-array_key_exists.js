XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_key_exists = require('/Users/kvz/code/phpjs/src/php/array/array_key_exists.js')

describe('php.array.array_key_exists.js', function () {
  it('should pass example 1', function (done) {
    array_key_exists('kevin', {'kevin': 'van Zonneveld'})
    var expected = true
    var result = array_key_exists('kevin', {'kevin': 'van Zonneveld'})
    expect(result).to.deep.equal(expected)
    done()
  })
})