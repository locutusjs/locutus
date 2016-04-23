XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var sha1 = require('/Users/kvz/code/phpjs/src/php/strings/sha1.js')

describe('php.strings.sha1.js', function () {
  it('should pass example 1', function (done) {
    sha1('Kevin van Zonneveld')
    var expected = '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'
    var result = sha1('Kevin van Zonneveld')
    expect(result).to.deep.equal(expected)
    done()
  })
})