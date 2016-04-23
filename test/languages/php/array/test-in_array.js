XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var in_array = require('/Users/kvz/code/phpjs/src/php/array/in_array.js')

describe('php', function () {
  describe('array.in_array.js', function () {
    it('should pass test 1', function (done) {
      in_array('van', ['Kevin', 'van', 'Zonneveld']);
      expected = true
      result = in_array('van', ['Kevin', 'van', 'Zonneveld']);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
      expected = false
      result = in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      in_array(1, ['1', '2', '3']);
      in_array(1, ['1', '2', '3'], false);
      expected = true
true
in_array(1, ['1', '2', '3']);
      result = in_array(1, ['1', '2', '3'], false);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      in_array(1, ['1', '2', '3'], true);
      expected = false
      result = in_array(1, ['1', '2', '3'], true);
      expect(result).to.equal(expected)
      done()
    })
  })
})