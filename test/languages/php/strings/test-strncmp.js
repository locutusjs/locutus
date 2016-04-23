XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strncmp = require('/Users/kvz/code/phpjs/src/php/strings/strncmp.js')

describe('php.strings.strncmp.js', function () {
  it('should pass example 1', function (done) {
    strncmp('aaa', 'aab', 2);
    var expected = 0
    var result = strncmp('aaa', 'aab', 2);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    strncmp('aaa', 'aab', 3 );
    var expected = -1
    var result = strncmp('aaa', 'aab', 3 );
    expect(result).to.deep.equal(expected)
    done()
  })
})