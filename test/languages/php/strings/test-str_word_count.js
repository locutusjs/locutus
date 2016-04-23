XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var str_word_count = require('/Users/kvz/code/phpjs/src/php/strings/str_word_count.js')

describe('php', function () {
  describe('strings.str_word_count.js', function () {
    it('should pass test 1', function (done) {
      str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 1);
      expected = ['Hello', 'fri', 'nd', "you're", 'looking', 'good', 'today']
      result = str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 1);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 2);
      expected = {0: 'Hello', 6: 'fri', 10: 'nd', 14: "you're", 29: 'looking', 46: 'good', 51: 'today'}
      result = str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 1, '\u00e0\u00e1\u00e3\u00e73');
      expected = ['Hello', 'fri3nd', "you're", 'looking', 'good', 'today']
      result = str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 1, '\u00e0\u00e1\u00e3\u00e73');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      str_word_count('hey', 2);
      expected = {0: 'hey'}
      result = str_word_count('hey', 2);
      expect(result).to.equal(expected)
      done()
    })
  })
})