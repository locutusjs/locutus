XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var number_format = require('/Users/kvz/code/phpjs/src/php/strings/number_format.js')

describe('php', function () {
  describe('strings.number_format.js', function () {
    it('should pass test 1', function (done) {
      number_format(1234.56);
      expected = '1,235'
      result = number_format(1234.56);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      number_format(1234.56, 2, ',', ' ');
      expected = '1 234,56'
      result = number_format(1234.56, 2, ',', ' ');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      number_format(1234.5678, 2, '.', '');
      expected = '1234.57'
      result = number_format(1234.5678, 2, '.', '');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      number_format(67, 2, ',', '.');
      expected = '67,00'
      result = number_format(67, 2, ',', '.');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      number_format(1000);
      expected = '1,000'
      result = number_format(1000);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      number_format(67.311, 2);
      expected = '67.31'
      result = number_format(67.311, 2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 7', function (done) {
      number_format(1000.55, 1);
      expected = '1,000.6'
      result = number_format(1000.55, 1);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 8', function (done) {
      number_format(67000, 5, ',', '.');
      expected = '67.000,00000'
      result = number_format(67000, 5, ',', '.');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 9', function (done) {
      number_format(0.9, 0);
      expected = '1'
      result = number_format(0.9, 0);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 10', function (done) {
      number_format('1.20', 2);
      expected = '1.20'
      result = number_format('1.20', 2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 11', function (done) {
      number_format('1.20', 4);
      expected = '1.2000'
      result = number_format('1.20', 4);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 12', function (done) {
      number_format('1.2000', 3);
      expected = '1.200'
      result = number_format('1.2000', 3);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 13', function (done) {
      number_format('1 000,50', 2, '.', ' ');
      expected = '100 050.00'
      result = number_format('1 000,50', 2, '.', ' ');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 14', function (done) {
      number_format(1e-8, 8, '.', '');
      expected = '0.00000001'
      result = number_format(1e-8, 8, '.', '');
      expect(result).to.equal(expected)
      done()
    })
  })
})