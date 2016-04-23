XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var chunk_split = require('/Users/kvz/code/phpjs/src/php/strings/chunk_split.js')

describe('php.strings.chunk_split.js', function () {
  it('should pass example 1', function (done) {
    chunk_split('Hello world!', 1, '*');
    var expected = 'H*e*l*l*o* *w*o*r*l*d*!*'
    var result = chunk_split('Hello world!', 1, '*');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    chunk_split('Hello world!', 10, '*');
    var expected = 'Hello worl*d!*'
    var result = chunk_split('Hello world!', 10, '*');
    expect(result).to.deep.equal(expected)
    done()
  })
})