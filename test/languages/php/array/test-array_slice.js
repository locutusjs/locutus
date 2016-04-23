XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_slice = require('/Users/kvz/code/phpjs/src/php/array/array_slice.js')

describe('php.array.array_slice.js', function () {
  it('should pass example 1', function (done) {
    array_slice(["a", "b", "c", "d", "e"], 2, -1)
    var expected = [ 'c', 'd' ]
    var result = array_slice(["a", "b", "c", "d", "e"], 2, -1)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    array_slice(["a", "b", "c", "d", "e"], 2, -1, true)
    var expected = {2: 'c', 3: 'd'}
    var result = array_slice(["a", "b", "c", "d", "e"], 2, -1, true)
    expect(result).to.deep.equal(expected)
    done()
  })
})