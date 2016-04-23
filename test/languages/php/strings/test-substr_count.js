XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var substr_count = require('/Users/kvz/code/phpjs/src/php/strings/substr_count.js')

describe('php.strings.substr_count.js', function () {
  it('should pass example 1', function (done) {
    substr_count('Kevin van Zonneveld', 'e');
    var expected = 3
    var result = substr_count('Kevin van Zonneveld', 'e');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    substr_count('Kevin van Zonneveld', 'K', 1);
    var expected = 0
    var result = substr_count('Kevin van Zonneveld', 'K', 1);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    substr_count('Kevin van Zonneveld', 'Z', 0, 10);
    var expected = false
    var result = substr_count('Kevin van Zonneveld', 'Z', 0, 10);
    expect(result).to.deep.equal(expected)
    done()
  })
})