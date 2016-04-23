XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var expm1 = require('/Users/kvz/code/phpjs/src/php/math/expm1.js')

describe('php.math.expm1.js', function () {
  it('should pass example 1', function (done) {
    expm1(1e-15)
    var expected = 1.0000000000000007e-15
    var result = expm1(1e-15)
    expect(result).to.deep.equal(expected)
    done()
  })
})