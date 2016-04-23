XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var utf8_decode = require('/Users/kvz/code/phpjs/src/php/xml/utf8_decode.js')

describe('php.xml.utf8_decode.js', function () {
  it('should pass example 1', function (done) {
    utf8_decode('Kevin van Zonneveld')
    var expected = 'Kevin van Zonneveld'
    var result = utf8_decode('Kevin van Zonneveld')
    expect(result).to.deep.equal(expected)
    done()
  })
})