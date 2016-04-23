XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_intersect_ukey = require('/Users/kvz/code/phpjs/src/php/array/array_intersect_ukey.js')

describe('php.array.array_intersect_ukey.js', function () {
  it('should pass example 1', function (done) {
    $array1 = {blue: 1, red: 2, green: 3, purple: 4}
    $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
    array_intersect_ukey ($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); });
    var expected = {blue: 1, green: 3}
$array1 = {blue: 1, red: 2, green: 3, purple: 4}
$array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
    var result = array_intersect_ukey ($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); });
    expect(result).to.deep.equal(expected)
    done()
  })
})