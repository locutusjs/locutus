XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var range = require('/Users/kvz/code/phpjs/src/php/array/range.js')

describe('php.array.range.js', function () {
  it('should pass example 1', function (done) {
    range ( 0, 12 );
    var expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    var result = range ( 0, 12 );
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    range( 0, 100, 10 );
    var expected = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    var result = range( 0, 100, 10 );
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    range( 'a', 'i' );
    var expected = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    var result = range( 'a', 'i' );
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    range( 'c', 'a' );
    var expected = ['c', 'b', 'a']
    var result = range( 'c', 'a' );
    expect(result).to.deep.equal(expected)
    done()
  })
})