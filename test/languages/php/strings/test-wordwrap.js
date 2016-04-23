XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var wordwrap = require('/Users/kvz/code/phpjs/src/php/strings/wordwrap.js')

describe('php', function () {
  describe('strings.wordwrap.js', function () {
    it('should pass test 1', function (done) {
      wordwrap('Kevin van Zonneveld', 6, '|', true);
      expected = 'Kevin |van |Zonnev|eld'
      result = wordwrap('Kevin van Zonneveld', 6, '|', true);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      wordwrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n');
      expected = 'The quick brown fox <br />\njumped over the lazy<br />\n dog.'
      result = wordwrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      wordwrap('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
      expected = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat.'
      result = wordwrap('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
      expect(result).to.equal(expected)
      done()
    })
  })
})