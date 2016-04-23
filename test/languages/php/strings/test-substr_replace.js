XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var substr_replace = require('/Users/kvz/code/phpjs/src/php/strings/substr_replace.js')

describe('php.strings.substr_replace.js', function () {
  it('should pass example 1', function (done) {
    substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0);
    var expected = 'bob'
    var result = substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    $var = 'ABCDEFGH:/MNRPQR/';
    substr_replace($var, 'bob', 0, $var.length);
    var expected = 'bob'
$var = 'ABCDEFGH:/MNRPQR/';
    var result = substr_replace($var, 'bob', 0, $var.length);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0);
    var expected = 'bobABCDEFGH:/MNRPQR/'
    var result = substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1);
    var expected = 'ABCDEFGH:/bob/'
    var result = substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 5', function (done) {
    substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1);
    var expected = 'ABCDEFGH:/bob/'
    var result = substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 6', function (done) {
    substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)
    var expected = 'ABCDEFGH://'
    var result = substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)
    expect(result).to.deep.equal(expected)
    done()
  })
})