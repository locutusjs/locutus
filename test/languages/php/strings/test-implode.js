XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var implode = require('/Users/kvz/code/phpjs/src/php/strings/implode.js')

describe('php.strings.implode.js', function () {
  it('should pass example 1', function (done) {
    implode(' ', ['Kevin', 'van', 'Zonneveld']);
    var expected = 'Kevin van Zonneveld'
    var result = implode(' ', ['Kevin', 'van', 'Zonneveld']);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    implode(' ', {first:'Kevin', last: 'van Zonneveld'});
    var expected = 'Kevin van Zonneveld'
    var result = implode(' ', {first:'Kevin', last: 'van Zonneveld'});
    expect(result).to.deep.equal(expected)
    done()
  })
})