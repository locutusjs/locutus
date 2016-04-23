XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var getenv = require('/Users/kvz/code/phpjs/src/php/info/getenv.js')

describe('php.info.getenv.js', function () {
  it('should pass example 1', function (done) {
    getenv('LC_ALL');
    var expected = false
    var result = getenv('LC_ALL');
    expect(result).to.deep.equal(expected)
    done()
  })
})