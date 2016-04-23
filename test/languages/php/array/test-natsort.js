XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var natsort = require('/Users/kvz/code/phpjs/src/php/array/natsort.js')

describe('php', function () {
  describe('array.natsort.js', function () {
    it('should pass test 1', function (done) {
      $array1 = {a:"img12.png", b:"img10.png", c:"img2.png", d:"img1.png"};
      $array1 = natsort($array1);
      expected = {d: 'img1.png', c: 'img2.png', b: 'img10.png', a: 'img12.png'}
$array1 = {a:"img12.png", b:"img10.png", c:"img2.png", d:"img1.png"};
      result = $array1 = natsort($array1);
      expect(result).to.equal(expected)
      done()
    })
  })
})