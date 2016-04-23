XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var atan2 = require('/Users/kvz/code/phpjs/src/php/math/atan2.js')

describe('php.math.atan2.js', function () {
  it('should pass example 1', function (done) {
    atan2(1, 1)
    var expected = 0.7853981633974483
    var result = atan2(1, 1)
    expect(result).to.deep.equal(expected)
    done()
  })
})