XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_null = require('/Users/kvz/code/phpjs/src/php/var/is_null.js')

describe('php.var.is_null.js', function () {
  it('should pass example 1', function (done) {
    is_null('23');
    var expected = false
    var result = is_null('23');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    is_null(null);
    var expected = true
    var result = is_null(null);
    expect(result).to.deep.equal(expected)
    done()
  })
})