XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var realpath = require('/Users/kvz/code/phpjs/src/php/filesystem/realpath.js')

describe('php', function () {
  describe('filesystem.realpath.js', function () {
    it('should pass test 1', function (done) {
      realpath('../.././_supporters/pj_test_supportfile_1.htm');
      expected = 'file:/home/kevin/code/_supporters/pj_test_supportfile_1.htm'
      result = realpath('../.././_supporters/pj_test_supportfile_1.htm');
      expect(result).to.equal(expected)
      done()
    })
  })
})