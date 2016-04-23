XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var lcfirst = require('/Users/kvz/code/phpjs/src/php/strings/lcfirst.js')

describe('php.strings.lcfirst.js', function () {
  it('should pass example 1', function (done) {
    lcfirst('Kevin Van Zonneveld')
    var expected = 'kevin Van Zonneveld'
    var result = lcfirst('Kevin Van Zonneveld')
    expect(result).to.deep.equal(expected)
    done()
  })
})