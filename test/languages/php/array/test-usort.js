XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var usort = require('/Users/kvz/code/phpjs/src/php/array/usort.js')

describe('php', function () {
  describe('array.usort.js', function () {
    it('should pass test 1', function (done) {
      stuff = {d: '3', a: '1', b: '11', c: '4'};
      stuff = usort(stuff, function (a, b) {return(a-b);});
      $result = stuff;
      expected = {0: '1', 1: '3', 2: '4', 3: '11'};
stuff = {d: '3', a: '1', b: '11', c: '4'};
stuff = usort(stuff, function (a, b) {return(a-b);});
      result = $result = stuff;
      expect(result).to.equal(expected)
      done()
    })
  })
})