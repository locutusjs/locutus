XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var compact = require('/Users/kvz/code/phpjs/src/php/array/compact.js')

describe('php.array.compact.js', function () {
  it.skip('should pass example 1', function (done) {
    var1 = 'Kevin'; var2 = 'van'; var3 = 'Zonneveld'
    compact('var1', 'var2', 'var3')
    var expected = {'var1': 'Kevin', 'var2': 'van', 'var3': 'Zonneveld'}
var1 = 'Kevin'; var2 = 'van'; var3 = 'Zonneveld'
    var result = compact('var1', 'var2', 'var3')
    expect(result).to.deep.equal(expected)
    done()
  })
})