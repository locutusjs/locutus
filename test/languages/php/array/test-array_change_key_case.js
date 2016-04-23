XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_change_key_case = require('/Users/kvz/code/phpjs/src/php/array/array_change_key_case.js')

describe('php', function () {
  describe('array.array_change_key_case.js', function () {
    it('should pass test 1', function (done) {
      array_change_key_case(42);
      expected = false
      result = array_change_key_case(42);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      array_change_key_case([ 3, 5 ]);
      expected = [3, 5]
      result = array_change_key_case([ 3, 5 ]);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      array_change_key_case({ FuBaR: 42 });
      expected = {"fubar": 42}
      result = array_change_key_case({ FuBaR: 42 });
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');
      expected = {"fubar": 42}
      result = array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');
      expected = {"FUBAR": 42}
      result = array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      array_change_key_case({ FuBaR: 42 }, 2);
      expected = {"FUBAR": 42}
      result = array_change_key_case({ FuBaR: 42 }, 2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 7', function (done) {
      ini_set('locutus.return_locutus_arrays', 'on');
      var arr = [{a: 0}, {B: 1}, {c: 2}];
      var newArr = array_change_key_case(arr);
      newArr.splice(1, 1);
      expected = [{b: 1}]
ini_set('locutus.return_locutus_arrays', 'on');
var arr = [{a: 0}, {B: 1}, {c: 2}];
var newArr = array_change_key_case(arr);
      result = newArr.splice(1, 1);
      expect(result).to.equal(expected)
      done()
    })
  })
})