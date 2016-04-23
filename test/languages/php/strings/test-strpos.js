XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strpos = require('/Users/kvz/code/phpjs/src/php/strings/strpos.js')

describe('php.strings.strpos.js', function () {
  it('should pass example 1', function (done) {
    strpos('Kevin van Zonneveld', 'e', 5);
    var expected = 14
    var result = strpos('Kevin van Zonneveld', 'e', 5);
    expect(result).to.deep.equal(expected)
    done()
  })
})