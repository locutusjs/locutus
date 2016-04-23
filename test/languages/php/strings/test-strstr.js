XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strstr = require('/Users/kvz/code/phpjs/src/php/strings/strstr.js')

describe('php', function () {
  describe('strings.strstr.js', function () {
    it('should pass test 1', function (done) {
      strstr('Kevin van Zonneveld', 'van');
      expected = 'van Zonneveld'
      result = strstr('Kevin van Zonneveld', 'van');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strstr('Kevin van Zonneveld', 'van', true);
      expected = 'Kevin '
      result = strstr('Kevin van Zonneveld', 'van', true);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      strstr('name@example.com', '@');
      expected = '@example.com'
      result = strstr('name@example.com', '@');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      strstr('name@example.com', '@', true);
      expected = 'name'
      result = strstr('name@example.com', '@', true);
      expect(result).to.equal(expected)
      done()
    })
  })
})