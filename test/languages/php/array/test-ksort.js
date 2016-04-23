XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ksort = require('/Users/kvz/code/phpjs/src/php/array/ksort.js')

describe('php.array.ksort.js', function () {
  it.skip('should pass example 1', function (done) {
    data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
    data = ksort(data)
    $result = data
    var expected = {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
data = ksort(data)
    var result = $result = data
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    ini_set('locutus.strictForIn', true)
    data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'}
    ksort(data)
    $result = data
    var expected = {1: 'Kevin', 2: 'van', 3: 'Zonneveld'}
ini_set('locutus.strictForIn', true)
data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'}
ksort(data)
    var result = $result = data
    expect(result).to.deep.equal(expected)
    done()
  })
})