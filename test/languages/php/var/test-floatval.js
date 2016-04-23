XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var floatval = require('/Users/kvz/code/phpjs/src/php/var/floatval.js')

describe('php.var.floatval.js', function () {
  it('should pass example 1', function (done) {
    floatval('150.03_page-section');
    var expected = 150.03
    var result = floatval('150.03_page-section');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    floatval('page: 3');
    floatval('-50 + 8');
    var expected = 0
-50
floatval('page: 3');
    var result = floatval('-50 + 8');
    expect(result).to.deep.equal(expected)
    done()
  })
})