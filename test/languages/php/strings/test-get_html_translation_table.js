XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var get_html_translation_table = require('/Users/kvz/code/phpjs/src/php/strings/get_html_translation_table.js')

describe('php', function () {
  describe('strings.get_html_translation_table.js', function () {
    it('should pass test 1', function (done) {
      get_html_translation_table('HTML_SPECIALCHARS');
      expected = {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
      result = get_html_translation_table('HTML_SPECIALCHARS');
      expect(result).to.equal(expected)
      done()
    })
  })
})