XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var _locutus_shared_bc = require('/Users/kvz/code/phpjs/src/php/_locutus_shared/_locutus_shared_bc.js')

describe.skip('php._locutus_shared._locutus_shared_bc.js', function () {
  it('should pass example 1', function (done) {
    _locutus_shared_bc()
    var expected = {}
    var result = _locutus_shared_bc()
    expect(result).to.deep.equal(expected)
    done()
  })
})