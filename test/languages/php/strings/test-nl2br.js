XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var nl2br = require('/Users/kvz/code/phpjs/src/php/strings/nl2br.js')

describe('php', function () {
  describe('strings.nl2br.js', function () {
    it('should pass test 1', function (done) {
      nl2br('Kevin\nvan\nZonneveld');
      expected = 'Kevin<br />\nvan<br />\nZonneveld'
      result = nl2br('Kevin\nvan\nZonneveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      nl2br("\nOne\nTwo\n\nThree\n", false);
      expected = '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
      result = nl2br("\nOne\nTwo\n\nThree\n", false);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      nl2br("\nOne\nTwo\n\nThree\n", true);
      expected = '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
      result = nl2br("\nOne\nTwo\n\nThree\n", true);
      expect(result).to.equal(expected)
      done()
    })
  })
})