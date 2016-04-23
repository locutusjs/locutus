XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var rsort = require('/Users/kvz/code/phpjs/src/php/array/rsort.js')

describe('php.array.rsort.js', function () {
  it.skip('should pass example 1', function (done) {
    $arr = ['Kevin', 'van', 'Zonneveld']
    rsort($arr)
    $results = $arr
    var expected = ['van', 'Zonneveld', 'Kevin']
$arr = ['Kevin', 'van', 'Zonneveld']
rsort($arr)
    var result = $results = $arr
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    ini_set('locutus.strictForIn', true)
    fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
    rsort(fruits)
    $result = fruits
    var expected = {0: 'orange', 1: 'lemon', 2: 'banana', 3: 'apple'}
ini_set('locutus.strictForIn', true)
fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
rsort(fruits)
    var result = $result = fruits
    expect(result).to.deep.equal(expected)
    done()
  })
})