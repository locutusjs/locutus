XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var addslashes = require('/Users/kvz/code/phpjs/src/php/strings/addslashes.js')

describe('php.strings.addslashes.js', function () {
  it('should pass example 1', function (done) {
    addslashes("kevin's birthday")
    var expected = "kevin\\'s birthday"
    var result = addslashes("kevin's birthday")
    expect(result).to.deep.equal(expected)
    done()
  })
})