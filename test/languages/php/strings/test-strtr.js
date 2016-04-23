XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strtr = require('/Users/kvz/code/phpjs/src/php/strings/strtr.js')

describe('php', function () {
  describe('strings.strtr.js', function () {
    it('should pass test 1', function (done) {
      $trans = {'hello' : 'hi', 'hi' : 'hello'};
      strtr('hi all, I said hello', $trans)
      expected = 'hello all, I said hi'
$trans = {'hello' : 'hi', 'hi' : 'hello'};
      result = strtr('hi all, I said hello', $trans)
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strtr('äaabaåccasdeöoo', 'äåö','aao');
      expected = 'aaabaaccasdeooo'
      result = strtr('äaabaåccasdeöoo', 'äåö','aao');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      strtr('ääääääää', 'ä', 'a');
      expected = 'aaaaaaaa'
      result = strtr('ääääääää', 'ä', 'a');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      strtr('http', 'pthxyz','xyzpth');
      expected = 'zyyx'
      result = strtr('http', 'pthxyz','xyzpth');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      strtr('zyyx', 'pthxyz','xyzpth');
      expected = 'http'
      result = strtr('zyyx', 'pthxyz','xyzpth');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      strtr('aa', {'a':1,'aa':2});
      expected = '2'
      result = strtr('aa', {'a':1,'aa':2});
      expect(result).to.equal(expected)
      done()
    })
  })
})