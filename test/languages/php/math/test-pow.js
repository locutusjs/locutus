XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var pow = require('/Users/kvz/code/phpjs/src/php/math/pow.js')

describe('php.math.pow.js', function () {
  it('should pass example 1', function (done) {
    pow(8723321.4, 7);
    var expected = 3.8439091680778995e+48
    var result = pow(8723321.4, 7);
    expect(result).to.deep.equal(expected)
    done()
  })
})