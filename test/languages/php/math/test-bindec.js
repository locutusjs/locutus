XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var bindec = require('/Users/kvz/code/phpjs/src/php/math/bindec.js')

describe('php.math.bindec.js', function () {
  it('should pass example 1', function (done) {
    bindec('110011');
    var expected = 51
    var result = bindec('110011');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    bindec('000110011');
    var expected = 51
    var result = bindec('000110011');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    bindec('111');
    var expected = 7
    var result = bindec('111');
    expect(result).to.deep.equal(expected)
    done()
  })
})