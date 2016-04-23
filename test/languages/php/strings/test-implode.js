XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var implode = require('/Users/kvz/code/phpjs/src/php/strings/implode.js')

describe('php', function () {
  describe('strings.implode.js', function () {
    it('should pass test 1', function (done) {
      implode(' ', ['Kevin', 'van', 'Zonneveld']);
      expected = 'Kevin van Zonneveld'
      result = implode(' ', ['Kevin', 'van', 'Zonneveld']);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      implode(' ', {first:'Kevin', last: 'van Zonneveld'});
      expected = 'Kevin van Zonneveld'
      result = implode(' ', {first:'Kevin', last: 'van Zonneveld'});
      expect(result).to.equal(expected)
      done()
    })
  })
})