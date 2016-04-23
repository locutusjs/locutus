XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var natcasesort = require('/Users/kvz/code/phpjs/src/php/array/natcasesort.js')

describe('php.array.natcasesort.js', function () {
  it('should pass example 1', function (done) {
    $array1 = {a:'IMG0.png', b:'img12.png', c:'img10.png', d:'img2.png', e:'img1.png', f:'IMG3.png'};
    natcasesort($array1);
    $results = $array1
    var expected = {a: 'IMG0.png', e: 'img1.png', d: 'img2.png', f: 'IMG3.png', c: 'img10.png', b: 'img12.png'}
$array1 = {a:'IMG0.png', b:'img12.png', c:'img10.png', d:'img2.png', e:'img1.png', f:'IMG3.png'};
natcasesort($array1);
    var result = $results = $array1
    expect(result).to.deep.equal(expected)
    done()
  })
})