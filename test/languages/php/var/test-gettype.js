XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var gettype = require('/Users/kvz/code/phpjs/src/php/var/gettype.js')

describe('php', function () {
  describe('var.gettype.js', function () {
    it('should pass test 1', function (done) {
      gettype(1);
      expected = 'integer'
      result = gettype(1);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      gettype(undefined);
      expected = 'undefined'
      result = gettype(undefined);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      gettype({0: 'Kevin van Zonneveld'});
      expected = 'object'
      result = gettype({0: 'Kevin van Zonneveld'});
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      gettype('foo');
      expected = 'string'
      result = gettype('foo');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      gettype({0: function () {return false;}});
      expected = 'object'
      result = gettype({0: function () {return false;}});
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      gettype({0: 'test', length: 1, splice: function () {}});
      gettype(['test']);
      expected = 'object'
'array'
gettype({0: 'test', length: 1, splice: function () {}});
      result = gettype(['test']);
      expect(result).to.equal(expected)
      done()
    })
  })
})