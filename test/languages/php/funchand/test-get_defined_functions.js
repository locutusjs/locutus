XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var get_defined_functions = require('/Users/kvz/code/phpjs/src/php/funchand/get_defined_functions.js')

describe('php', function () {
  describe('funchand.get_defined_functions.js', function () {
    it('should pass test 1', function (done) {
      function test_in_array (array, p_val) {for(var i = 0, l = array.length; i < l; i++) {if(array[i] === p_val) return true;} return false;}
      funcs = get_defined_functions();
      found = test_in_array(funcs, 'get_defined_functions');
      $result = found;
      expected = true
function test_in_array (array, p_val) {for(var i = 0, l = array.length; i < l; i++) {if(array[i] === p_val) return true;} return false;}
funcs = get_defined_functions();
found = test_in_array(funcs, 'get_defined_functions');
      result = $result = found;
      expect(result).to.equal(expected)
      done()
    })
  })
})