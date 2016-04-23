XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_filter = require('/Users/kvz/code/phpjs/src/php/array/array_filter.js')

describe('php', function () {
  describe('array.array_filter.js', function () {
    it('should pass test 1', function (done) {
      var odd = function (num) {return (num & 1);};
      array_filter({"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}, odd);
      expected = {"a": 1, "c": 3, "e": 5}
var odd = function (num) {return (num & 1);};
      result = array_filter({"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}, odd);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      var even = function (num) {return (!(num & 1));}
      array_filter([6, 7, 8, 9, 10, 11, 12], even);
      expected = {0: 6, 2: 8, 4: 10, 6: 12}
var even = function (num) {return (!(num & 1));}
      result = array_filter([6, 7, 8, 9, 10, 11, 12], even);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      array_filter({"a": 1, "b": false, "c": -1, "d": 0, "e": null, "f":'', "g":undefined});
      expected = {"a":1, "c":-1};
      result = array_filter({"a": 1, "b": false, "c": -1, "d": 0, "e": null, "f":'', "g":undefined});
      expect(result).to.equal(expected)
      done()
    })
  })
})