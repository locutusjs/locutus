XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var var_export = require('/Users/kvz/code/phpjs/src/php/var/var_export.js')

describe('php', function () {
  describe('var.var_export.js', function () {
    it('should pass test 1', function (done) {
      var_export(null);
      expected = null
      result = var_export(null);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true);
      expected = "array (\n  0 => 'Kevin',\n  1 => 'van',\n  2 => 'Zonneveld'\n)"
      result = var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      data = 'Kevin';
      var_export(data, true);
      expected = "'Kevin'"
data = 'Kevin';
      result = var_export(data, true);
      expect(result).to.equal(expected)
      done()
    })
  })
})