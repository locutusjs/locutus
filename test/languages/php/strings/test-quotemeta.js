XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var quotemeta = require('/Users/kvz/code/phpjs/src/php/strings/quotemeta.js')

describe('php.strings.quotemeta.js', function () {
  it('should pass example 1', function (done) {
    quotemeta(". + * ? ^ ( $ )")
    var expected = '\\. \\+ \\* \\? \\^ \\( \\$ \\)'
    var result = quotemeta(". + * ? ^ ( $ )")
    expect(result).to.deep.equal(expected)
    done()
  })
})