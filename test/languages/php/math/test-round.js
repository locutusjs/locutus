XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var round = require('/Users/kvz/code/phpjs/src/php/math/round.js')

describe('php', function () {
  describe('math.round.js', function () {
    it('should pass test 1', function (done) {
      round(1241757, -3);
      expected = 1242000
      result = round(1241757, -3);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      round(3.6);
      expected = 4
      result = round(3.6);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      round(2.835, 2);
      expected = 2.84
      result = round(2.835, 2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      round(1.1749999999999, 2);
      expected = 1.17
      result = round(1.1749999999999, 2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      round(58551.799999999996, 2);
      expected = 58551.8
      result = round(58551.799999999996, 2);
      expect(result).to.equal(expected)
      done()
    })
  })
})