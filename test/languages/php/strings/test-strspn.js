XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strspn = require('/Users/kvz/code/phpjs/src/php/strings/strspn.js')

describe('php.strings.strspn.js', function () {
  it('should pass example 1', function (done) {
    strspn('42 is the answer, what is the question ...', '1234567890')
    var expected = 2
    var result = strspn('42 is the answer, what is the question ...', '1234567890')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    strspn('foo', 'o', 1, 2)
    var expected = 2
    var result = strspn('foo', 'o', 1, 2)
    expect(result).to.deep.equal(expected)
    done()
  })
})