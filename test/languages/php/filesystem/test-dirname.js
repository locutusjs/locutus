XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var dirname = require('/Users/kvz/code/phpjs/src/php/filesystem/dirname.js')

describe('php', function () {
  describe('filesystem.dirname.js', function () {
    it('should pass test 1', function (done) {
      dirname('/etc/passwd');
      expected = '/etc'
      result = dirname('/etc/passwd');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      dirname('c:/Temp/x');
      expected = 'c:/Temp'
      result = dirname('c:/Temp/x');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      dirname('/dir/test/');
      expected = '/dir'
      result = dirname('/dir/test/');
      expect(result).to.equal(expected)
      done()
    })
  })
})