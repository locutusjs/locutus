XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var money_format = require('/Users/kvz/code/phpjs/src/php/strings/money_format.js')

describe('php', function () {
  describe('strings.money_format.js', function () {
    it('should pass test 1', function (done) {
      money_format('%i', 1234.56);
      expected = ' USD 1,234.56'
      result = money_format('%i', 1234.56);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      money_format('%14#8.2n', 1234.5678);
      expected = ' $     1,234.57'
      result = money_format('%14#8.2n', 1234.5678);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      money_format('%14#8.2n', -1234.5678);
      expected = '-$     1,234.57'
      result = money_format('%14#8.2n', -1234.5678);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      money_format('%(14#8.2n', 1234.5678);
      expected = ' $     1,234.57 '
      result = money_format('%(14#8.2n', 1234.5678);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      money_format('%(14#8.2n', -1234.5678);
      expected = '($     1,234.57)'
      result = money_format('%(14#8.2n', -1234.5678);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      money_format('%=014#8.2n', 1234.5678);
      expected = ' $000001,234.57'
      result = money_format('%=014#8.2n', 1234.5678);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 7', function (done) {
      money_format('%=014#8.2n', -1234.5678);
      expected = '-$000001,234.57'
      result = money_format('%=014#8.2n', -1234.5678);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 8', function (done) {
      money_format('%=*14#8.2n', 1234.5678);
      expected = ' $*****1,234.57'
      result = money_format('%=*14#8.2n', 1234.5678);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 9', function (done) {
      money_format('%=*14#8.2n', -1234.5678);
      expected = '-$*****1,234.57'
      result = money_format('%=*14#8.2n', -1234.5678);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 10', function (done) {
      money_format('%=*^14#8.2n', 1234.5678);
      expected = '  $****1234.57'
      result = money_format('%=*^14#8.2n', 1234.5678);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 11', function (done) {
      money_format('%=*^14#8.2n', -1234.5678);
      expected = ' -$****1234.57'
      result = money_format('%=*^14#8.2n', -1234.5678);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 12', function (done) {
      money_format('%=*!14#8.2n', 1234.5678);
      expected = ' *****1,234.57'
      result = money_format('%=*!14#8.2n', 1234.5678);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 13', function (done) {
      money_format('%=*!14#8.2n', -1234.5678);
      expected = '-*****1,234.57'
      result = money_format('%=*!14#8.2n', -1234.5678);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 14', function (done) {
      money_format('%i', 3590);
      expected = ' USD 3,590.00'
      result = money_format('%i', 3590);
      expect(result).to.equal(expected)
      done()
    })
  })
})