XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strrev = require('/Users/kvz/code/phpjs/src/php/strings/strrev.js')

describe('php.strings.strrev.js', function () {
  it('should pass example 1', function (done) {
    strrev('Kevin van Zonneveld')
    var expected = 'dlevennoZ nav niveK'
    var result = strrev('Kevin van Zonneveld')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    strrev('a\u0301haB') === 'Baha\u0301'; // combining
    var expected = true
    var result = strrev('a\u0301haB') === 'Baha\u0301'; // combining
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    strrev('A\uD87E\uDC04Z') === 'Z\uD87E\uDC04A'; // surrogates
    var expected = true
    var result = strrev('A\uD87E\uDC04Z') === 'Z\uD87E\uDC04A'; // surrogates
    expect(result).to.deep.equal(expected)
    done()
  })
})