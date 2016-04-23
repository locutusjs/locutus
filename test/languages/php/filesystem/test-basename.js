XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var basename = require('/Users/kvz/code/phpjs/src/php/filesystem/basename.js')

describe('php', function () {
  describe('filesystem.basename.js', function () {
    it('should pass test 1', function (done) {
      basename('/www/site/home.htm', '.htm');
      expected = 'home'
      result = basename('/www/site/home.htm', '.htm');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      basename('ecra.php?p=1');
      expected = 'ecra.php?p=1'
      result = basename('ecra.php?p=1');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      basename('/some/path/');
      expected = 'path'
      result = basename('/some/path/');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      basename('/some/path_ext.ext/','.ext');
      expected = 'path_ext'
      result = basename('/some/path_ext.ext/','.ext');
      expect(result).to.equal(expected)
      done()
    })
  })
})