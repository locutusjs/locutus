XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_unicode = require('/Users/kvz/code/phpjs/src/php/var/is_unicode.js')

describe('php.var.is_unicode.js', function () {
  it('should pass example 1', function (done) {
    is_unicode('We the peoples of the United Nations...!')
    var expected = true
    var result = is_unicode('We the peoples of the United Nations...!')
    expect(result).to.deep.equal(expected)
    done()
  })
})