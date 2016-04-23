XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var idate = require('/Users/kvz/code/phpjs/src/php/datetime/idate.js')

describe('php.datetime.idate.js', function () {
  it('should pass example 1', function (done) {
    idate('y', 1255633200);
    var expected = 9
    var result = idate('y', 1255633200);
    expect(result).to.deep.equal(expected)
    done()
  })
})