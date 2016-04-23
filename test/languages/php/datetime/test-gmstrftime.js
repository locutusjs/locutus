XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var gmstrftime = require('/Users/kvz/code/phpjs/src/php/datetime/gmstrftime.js')

describe('php.datetime.gmstrftime.js', function () {
  it('should pass example 1', function (done) {
    gmstrftime("%A", 1062462400)
    var expected = 'Tuesday'
    var result = gmstrftime("%A", 1062462400)
    expect(result).to.deep.equal(expected)
    done()
  })
})