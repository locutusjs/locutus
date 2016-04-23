XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_resource = require('/Users/kvz/code/phpjs/src/php/var/is_resource.js')

describe('php.var.is_resource.js', function () {
  it('should pass example 1', function (done) {
    is_resource('a')
    var expected = false
    var result = is_resource('a')
    expect(result).to.deep.equal(expected)
    done()
  })
})