XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_pop = require('/Users/kvz/code/phpjs/src/php/array/array_pop.js')

describe('php.array.array_pop.js', function () {
  it('should pass example 1', function (done) {
    array_pop([0,1,2]);
    var expected = 2
    var result = array_pop([0,1,2]);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    data = {firstName: 'Kevin', surName: 'van Zonneveld'};
    lastElem = array_pop(data);
    $result = data
    var expected = {firstName: 'Kevin'}
data = {firstName: 'Kevin', surName: 'van Zonneveld'};
lastElem = array_pop(data);
    var result = $result = data
    expect(result).to.deep.equal(expected)
    done()
  })
})