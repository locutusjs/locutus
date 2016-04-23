XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_array = require('/Users/kvz/code/phpjs/src/php/var/is_array.js')

describe('php', function () {
  describe('var.is_array.js', function () {
    it('should pass test 1', function (done) {
      is_array(['Kevin', 'van', 'Zonneveld']);
      expected = true
      result = is_array(['Kevin', 'van', 'Zonneveld']);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      is_array('Kevin van Zonneveld');
      expected = false
      result = is_array('Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
      expected = true
      result = is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      is_array(function tmp_a(){this.name = 'Kevin'});
      expected = false
      result = is_array(function tmp_a(){this.name = 'Kevin'});
      expect(result).to.equal(expected)
      done()
    })
  })
})