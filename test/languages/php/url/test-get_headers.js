XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var get_headers = require('/Users/kvz/code/phpjs/src/php/url/get_headers.js')

describe.skip('php.url.get_headers.js', function () {
  it('should pass example 1', function (done) {
    get_headers('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm')[0];
    var expected = 'Date: Wed, 13 May 2009 23:53:11 GMT'
    var result = get_headers('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm')[0];
    expect(result).to.deep.equal(expected)
    done()
  })
})