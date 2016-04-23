XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_intersect = require('/Users/kvz/code/phpjs/src/php/array/array_intersect.js')

describe('php.array.array_intersect.js', function () {
  it('should pass example 1', function (done) {
    $array1 = {'a' : 'green', 0:'red', 1: 'blue'}
    $array2 = {'b' : 'green', 0:'yellow', 1:'red'}
    $array3 = ['green', 'red']
    $result = array_intersect($array1, $array2, $array3)
    var expected = {0: 'red', a: 'green'}
$array1 = {'a' : 'green', 0:'red', 1: 'blue'}
$array2 = {'b' : 'green', 0:'yellow', 1:'red'}
$array3 = ['green', 'red']
    var result = $result = array_intersect($array1, $array2, $array3)
    expect(result).to.deep.equal(expected)
    done()
  })
})