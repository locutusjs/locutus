XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var quoted_printable_encode = require('/Users/kvz/code/phpjs/src/php/strings/quoted_printable_encode.js')

describe('php.strings.quoted_printable_encode.js', function () {
  it('should pass example 1', function (done) {
    quoted_printable_encode('a=b=c');
    var expected = 'a=3Db=3Dc'
    var result = quoted_printable_encode('a=b=c');
    expect(result).to.deep.equal(expected)
    done()
  })
  it.skip('should pass example 2', function (done) {
    quoted_printable_encode('abc   \r\n123   \r\n');
    var expected = 'abc  =20\r\n123  =20\r\n'
    var result = quoted_printable_encode('abc   \r\n123   \r\n');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    quoted_printable_encode('0123456789012345678901234567890123456789012345678901234567890123456789012345');
    var expected = '012345678901234567890123456789012345678901234567890123456789012345678901234=\r\n5'
    var result = quoted_printable_encode('0123456789012345678901234567890123456789012345678901234567890123456789012345');
    expect(result).to.deep.equal(expected)
    done()
  })
})