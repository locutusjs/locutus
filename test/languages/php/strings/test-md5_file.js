XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var md5_file = require('/Users/kvz/code/phpjs/src/php/strings/md5_file.js')

describe.skip('php.strings.md5_file.js', function () {
  it('should pass example 1', function (done) {
    md5_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    var expected = '202cb962ac59075b964b07152d234b70'
    var result = md5_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    expect(result).to.deep.equal(expected)
    done()
  })
})