XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var trim = require('/Users/kvz/code/phpjs/src/php/strings/trim.js')

describe('php.strings.trim.js', function () {
  it('should pass example 1', function (done) {
    trim('    Kevin van Zonneveld    ');
    var expected = 'Kevin van Zonneveld'
    var result = trim('    Kevin van Zonneveld    ');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    trim('Hello World', 'Hdle');
    var expected = 'o Wor'
    var result = trim('Hello World', 'Hdle');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    trim(16, 1);
    var expected = '6'
    var result = trim(16, 1);
    expect(result).to.deep.equal(expected)
    done()
  })
})