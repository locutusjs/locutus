XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var set_time_limit = require('/Users/kvz/code/phpjs/src/php/info/set_time_limit.js')

describe.skip('php.info.set_time_limit.js', function () {
  it('should pass example 1', function (done) {
    set_time_limit(4)
    var expected = undefined
    var result = set_time_limit(4)
    expect(result).to.deep.equal(expected)
    done()
  })
})