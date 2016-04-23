XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var serialize = require('/Users/kvz/code/phpjs/src/php/var/serialize.js')

describe.skip('php.var.serialize.js', function () {
  it('should pass example 1', function (done) {
    serialize(['Kevin', 'van', 'Zonneveld'])
    var expected = 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
    var result = serialize(['Kevin', 'van', 'Zonneveld'])
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'})
    var expected = 'a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}'
    var result = serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'})
    expect(result).to.deep.equal(expected)
    done()
  })
})