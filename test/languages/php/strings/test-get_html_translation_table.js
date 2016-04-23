XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var get_html_translation_table = require('/Users/kvz/code/phpjs/src/php/strings/get_html_translation_table.js')

describe('php.strings.get_html_translation_table.js', function () {
  it('should pass example 1', function (done) {
    get_html_translation_table('HTML_SPECIALCHARS')
    var expected = {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
    var result = get_html_translation_table('HTML_SPECIALCHARS')
    expect(result).to.deep.equal(expected)
    done()
  })
})