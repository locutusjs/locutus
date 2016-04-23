XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var in_array = require('/Users/kvz/code/phpjs/src/php/array/in_array.js')

describe('php.array.in_array.js', function () {
  it('should pass example 1', function (done) {
    in_array('van', ['Kevin', 'van', 'Zonneveld']);
    var expected = true
    var result = in_array('van', ['Kevin', 'van', 'Zonneveld']);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
    var expected = false
    var result = in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    in_array(1, ['1', '2', '3']);
    in_array(1, ['1', '2', '3'], false);
    var expected = true
true
in_array(1, ['1', '2', '3']);
    var result = in_array(1, ['1', '2', '3'], false);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    in_array(1, ['1', '2', '3'], true);
    var expected = false
    var result = in_array(1, ['1', '2', '3'], true);
    expect(result).to.deep.equal(expected)
    done()
  })
})