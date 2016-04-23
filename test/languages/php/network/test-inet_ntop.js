XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var inet_ntop = require('/Users/kvz/code/phpjs/src/php/network/inet_ntop.js')

describe('php.network.inet_ntop.js', function () {
  it('should pass example 1', function (done) {
    inet_ntop('\x7F\x00\x00\x01');
    var expected = '127.0.0.1'
    var result = inet_ntop('\x7F\x00\x00\x01');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    inet_ntop('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\1');
    var expected = '::1'
    var result = inet_ntop('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\1');
    expect(result).to.deep.equal(expected)
    done()
  })
})