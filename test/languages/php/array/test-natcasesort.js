XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var natcasesort = require('/Users/kvz/code/phpjs/src/php/array/natcasesort.js')

describe('php', function () {
  describe('array.natcasesort.js', function () {
    it('should pass test 1', function (done) {
      $array1 = {a:'IMG0.png', b:'img12.png', c:'img10.png', d:'img2.png', e:'img1.png', f:'IMG3.png'};
      $array1 = natcasesort($array1);
      expected = {a: 'IMG0.png', e: 'img1.png', d: 'img2.png', f: 'IMG3.png', c: 'img10.png', b: 'img12.png'}
$array1 = {a:'IMG0.png', b:'img12.png', c:'img10.png', d:'img2.png', e:'img1.png', f:'IMG3.png'};
      result = $array1 = natcasesort($array1);
      expect(result).to.equal(expected)
      done()
    })
  })
})