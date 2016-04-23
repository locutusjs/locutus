XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var htmlspecialchars_decode = require('/Users/kvz/code/phpjs/src/php/strings/htmlspecialchars_decode.js')

describe('php.strings.htmlspecialchars_decode.js', function () {
  it('should pass example 1', function (done) {
    htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
    var expected = '<p>this -> &quot;</p>'
    var result = htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    htmlspecialchars_decode("&amp;quot;");
    var expected = '&quot;'
    var result = htmlspecialchars_decode("&amp;quot;");
    expect(result).to.deep.equal(expected)
    done()
  })
})