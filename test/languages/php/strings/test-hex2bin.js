XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var hex2bin = require('/Users/kvz/code/phpjs/src/php/strings/hex2bin.js')

describe('php.strings.hex2bin.js', function () {
  it('should pass example 1', function (done) {
    hex2bin('44696d61');
    var expected = 'Dima'
    var result = hex2bin('44696d61');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    hex2bin('00');
    var expected = '\x00'
    var result = hex2bin('00');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    hex2bin('2f1q')
    var expected = false
    var result = hex2bin('2f1q')
    expect(result).to.deep.equal(expected)
    done()
  })
})