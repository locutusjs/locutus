XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var var_export = require('/Users/kvz/code/phpjs/src/php/var/var_export.js')

describe('php.var.var_export.js', function () {
  it('should pass example 1', function (done) {
    var_export(null)
    var expected = null
    var result = var_export(null)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true)
    var expected = "array (\n  0 => 'Kevin',\n  1 => 'van',\n  2 => 'Zonneveld'\n)"
    var result = var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    data = 'Kevin'
    var_export(data, true)
    var expected = "'Kevin'"
data = 'Kevin'
    var result = var_export(data, true)
    expect(result).to.deep.equal(expected)
    done()
  })
})