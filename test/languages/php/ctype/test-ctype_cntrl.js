XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ctype_cntrl = require('/Users/kvz/code/phpjs/src/php/ctype/ctype_cntrl.js')

describe('php.ctype.ctype_cntrl.js', function () {
  it('should pass example 1', function (done) {
    ctype_cntrl('\u0020');
    var expected = false
    var result = ctype_cntrl('\u0020');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    ctype_cntrl('\u001F');
    var expected = true
    var result = ctype_cntrl('\u001F');
    expect(result).to.deep.equal(expected)
    done()
  })
})