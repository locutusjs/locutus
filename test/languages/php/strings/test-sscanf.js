XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var sscanf = require('/Users/kvz/code/phpjs/src/php/strings/sscanf.js')

describe('php.strings.sscanf.js', function () {
  it('should pass example 1', function (done) {
    sscanf('SN/2350001', 'SN/%d');
    var expected = [2350001]
    var result = sscanf('SN/2350001', 'SN/%d');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var myVar; // Will be set by function
    sscanf('SN/2350001', 'SN/%d', 'myVar');
    var expected = 1
var myVar; // Will be set by function
    var result = sscanf('SN/2350001', 'SN/%d', 'myVar');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    sscanf("10--20", "%2$d--%1$d"); // Must escape '$' in PHP, but not JS
    var expected = [20, 10]
    var result = sscanf("10--20", "%2$d--%1$d"); // Must escape '$' in PHP, but not JS
    expect(result).to.deep.equal(expected)
    done()
  })
})