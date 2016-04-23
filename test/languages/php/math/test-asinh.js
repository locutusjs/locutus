XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var asinh = require('/Users/kvz/code/phpjs/src/php/math/asinh.js')

describe('php.math.asinh.js', function () {
  it('should pass example 1', function (done) {
    asinh(8723321.4)
    var expected = 16.67465779841863
    var result = asinh(8723321.4)
    expect(result).to.deep.equal(expected)
    done()
  })
})