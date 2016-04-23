XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var addcslashes = require('/Users/kvz/code/phpjs/src/php/strings/addcslashes.js')

describe('php', function () {
  describe('strings.addcslashes.js', function () {
    it('should pass test 1', function (done) {
      addcslashes('foo[ ]', 'A..z'); // Escape all ASCII within capital A to lower z range, including square brackets
      expected = "\\f\\o\\o\\[ \\]"
      result = addcslashes('foo[ ]', 'A..z'); // Escape all ASCII within capital A to lower z range, including square brackets
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      addcslashes("zoo['.']", 'z..A'); // Only escape z, period, and A here since not a lower-to-higher range
      expected = "\\zoo['\\.']"
      result = addcslashes("zoo['.']", 'z..A'); // Only escape z, period, and A here since not a lower-to-higher range
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      addcslashes("@a\u0000\u0010\u00A9", "\0..\37!@\177..\377"); // Escape as octals those specified and less than 32 (0x20) or greater than 126 (0x7E), but not otherwise
      expected = '\\@a\\000\\020\\302\\251'
      result = addcslashes("@a\u0000\u0010\u00A9", "\0..\37!@\177..\377"); // Escape as octals those specified and less than 32 (0x20) or greater than 126 (0x7E), but not otherwise
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      addcslashes("\u0020\u007E", "\40..\175"); // Those between 32 (0x20 or 040) and 126 (0x7E or 0176) decimal value will be backslashed if specified (not octalized)
      expected = '\\ ~'
      result = addcslashes("\u0020\u007E", "\40..\175"); // Those between 32 (0x20 or 040) and 126 (0x7E or 0176) decimal value will be backslashed if specified (not octalized)
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      addcslashes("\r\u0007\n", '\0..\37'); // Recognize C escape sequences if specified
      expected = "\\r\\a\\n"
      result = addcslashes("\r\u0007\n", '\0..\37'); // Recognize C escape sequences if specified
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      addcslashes("\r\u0007\n", '\0'); // Do not recognize C escape sequences if not specified
      expected = "\r\u0007\n"
      result = addcslashes("\r\u0007\n", '\0'); // Do not recognize C escape sequences if not specified
      expect(result).to.equal(expected)
      done()
    })
  })
})