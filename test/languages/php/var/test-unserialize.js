XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var unserialize = require('/Users/kvz/code/phpjs/src/php/var/unserialize.js')

describe('php', function () {
  describe('var.unserialize.js', function () {
    it('should pass test 1', function (done) {
      unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
      expected = ['Kevin', 'van', 'Zonneveld']
      result = unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
      expected = {firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'}
      result = unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
      expect(result).to.equal(expected)
      done()
    })
  })
})