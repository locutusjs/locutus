XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var vsprintf = require('/Users/kvz/code/phpjs/src/php/strings/vsprintf.js')

describe('php.strings.vsprintf.js', function () {
  it('should pass example 1', function (done) {
    vsprintf('%04d-%02d-%02d', [1988, 8, 1])
    var expected = '1988-08-01'
    var result = vsprintf('%04d-%02d-%02d', [1988, 8, 1])
    expect(result).to.deep.equal(expected)
    done()
  })
})