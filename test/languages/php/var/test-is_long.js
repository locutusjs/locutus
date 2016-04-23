XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_long = require('/Users/kvz/code/phpjs/src/php/var/is_long.js')

describe('php.var.is_long.js', function () {
  it('should pass example 1', function (done) {
    is_long(186.31);
    var expected = true
    var result = is_long(186.31);
    expect(result).to.deep.equal(expected)
    done()
  })
})