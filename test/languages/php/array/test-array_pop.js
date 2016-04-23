XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_pop = require('/Users/kvz/code/phpjs/src/php/array/array_pop.js')

describe('php', function () {
  describe('array.array_pop.js', function () {
    it('should pass test 1', function (done) {
      array_pop([0,1,2]);
      expected = 2
      result = array_pop([0,1,2]);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      data = {firstName: 'Kevin', surName: 'van Zonneveld'};
      lastElem = array_pop(data);
      $result = data
      expected = {firstName: 'Kevin'}
data = {firstName: 'Kevin', surName: 'van Zonneveld'};
lastElem = array_pop(data);
      result = $result = data
      expect(result).to.equal(expected)
      done()
    })
  })
})