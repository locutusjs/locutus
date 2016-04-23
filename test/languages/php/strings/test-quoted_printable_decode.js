XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var quoted_printable_decode = require('/Users/kvz/code/phpjs/src/php/strings/quoted_printable_decode.js')

describe('php.strings.quoted_printable_decode.js', function () {
  it('should pass example 1', function (done) {
    quoted_printable_decode('a=3Db=3Dc');
    var expected = 'a=b=c'
    var result = quoted_printable_decode('a=3Db=3Dc');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    quoted_printable_decode('abc  =20\r\n123  =20\r\n');
    var expected = 'abc   \r\n123   \r\n'
    var result = quoted_printable_decode('abc  =20\r\n123  =20\r\n');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    quoted_printable_decode('012345678901234567890123456789012345678901234567890123456789012345678901234=\r\n56789');
    var expected = '01234567890123456789012345678901234567890123456789012345678901234567890123456789'
    var result = quoted_printable_decode('012345678901234567890123456789012345678901234567890123456789012345678901234=\r\n56789');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    quoted_printable_decode("Lorem ipsum dolor sit amet=23, consectetur adipisicing elit");
    var expected = 'Lorem ipsum dolor sit amet#, consectetur adipisicing elit'
    var result = quoted_printable_decode("Lorem ipsum dolor sit amet=23, consectetur adipisicing elit");
    expect(result).to.deep.equal(expected)
    done()
  })
})