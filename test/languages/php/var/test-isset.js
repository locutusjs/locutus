XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var isset = require('/Users/kvz/code/phpjs/src/php/var/isset.js')

describe('php.var.isset.js', function () {
  it('should pass example 1', function (done) {
    isset( undefined, true)
    var expected = false
    var result = isset( undefined, true)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    isset( 'Kevin van Zonneveld' )
    var expected = true
    var result = isset( 'Kevin van Zonneveld' )
    expect(result).to.deep.equal(expected)
    done()
  })
})