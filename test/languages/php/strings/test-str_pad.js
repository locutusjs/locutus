XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var str_pad = require('/Users/kvz/code/phpjs/src/php/strings/str_pad.js')

describe('php.strings.str_pad.js', function () {
  it('should pass example 1', function (done) {
    str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
    var expected = '-=-=-=-=-=-Kevin van Zonneveld'
    var result = str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
    var expected = '------Kevin van Zonneveld-----'
    var result = str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
    expect(result).to.deep.equal(expected)
    done()
  })
})