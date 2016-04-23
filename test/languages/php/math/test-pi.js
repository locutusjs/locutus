XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var pi = require('/Users/kvz/code/phpjs/src/php/math/pi.js')

describe('php.math.pi.js', function () {
  it('should pass example 1', function (done) {
    pi(8723321.4);
    var expected = 3.141592653589793
    var result = pi(8723321.4);
    expect(result).to.deep.equal(expected)
    done()
  })
})