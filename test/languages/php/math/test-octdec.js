XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var octdec = require('/Users/kvz/code/phpjs/src/php/math/octdec.js')

describe('php.math.octdec.js', function () {
  it('should pass example 1', function (done) {
    octdec('77');
    var expected = 63
    var result = octdec('77');
    expect(result).to.deep.equal(expected)
    done()
  })
})