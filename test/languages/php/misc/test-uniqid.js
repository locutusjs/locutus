XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var uniqid = require('/Users/kvz/code/phpjs/src/php/misc/uniqid.js')

describe.skip('php.misc.uniqid.js', function () {
  it('should pass example 1', function (done) {
    uniqid()
    var expected = 'a30285b160c14'
    var result = uniqid()
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    uniqid('foo')
    var expected = 'fooa30285b1cd361'
    var result = uniqid('foo')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    uniqid('bar', true)
    var expected = 'bara20285b23dfd1.31879087'
    var result = uniqid('bar', true)
    expect(result).to.deep.equal(expected)
    done()
  })
})