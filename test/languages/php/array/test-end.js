XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var end = require('/Users/kvz/code/phpjs/src/php/array/end.js')

describe('php.array.end.js', function () {
  it('should pass example 1', function (done) {
    end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
    var expected = 'Zonneveld'
    var result = end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    end(['Kevin', 'van', 'Zonneveld']);
    var expected = 'Zonneveld'
    var result = end(['Kevin', 'van', 'Zonneveld']);
    expect(result).to.deep.equal(expected)
    done()
  })
})