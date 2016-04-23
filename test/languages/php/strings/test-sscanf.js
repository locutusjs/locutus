XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var sscanf = require('/Users/kvz/code/phpjs/src/php/strings/sscanf.js')

describe('php', function () {
  describe('strings.sscanf.js', function () {
    it('should pass test 1', function (done) {
      sscanf('SN/2350001', 'SN/%d');
      expected = [2350001]
      result = sscanf('SN/2350001', 'SN/%d');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      var myVar; // Will be set by function
      sscanf('SN/2350001', 'SN/%d', 'myVar');
      expected = 1
var myVar; // Will be set by function
      result = sscanf('SN/2350001', 'SN/%d', 'myVar');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      sscanf("10--20", "%2$d--%1$d"); // Must escape '$' in PHP, but not JS
      expected = [20, 10]
      result = sscanf("10--20", "%2$d--%1$d"); // Must escape '$' in PHP, but not JS
      expect(result).to.equal(expected)
      done()
    })
  })
})