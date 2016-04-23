XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var compact = require('/Users/kvz/code/phpjs/src/php/array/compact.js')

describe('php', function () {
  describe('array.compact.js', function () {
    it('should pass test 1', function (done) {
      var1 = 'Kevin'; var2 = 'van'; var3 = 'Zonneveld';
      compact('var1', 'var2', 'var3');
      expected = {'var1': 'Kevin', 'var2': 'van', 'var3': 'Zonneveld'}
var1 = 'Kevin'; var2 = 'van'; var3 = 'Zonneveld';
      result = compact('var1', 'var2', 'var3');
      expect(result).to.equal(expected)
      done()
    })
  })
})