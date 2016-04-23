XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get.js')

describe('php', function () {
  describe('info.ini_get.js', function () {
    it('should pass test 1', function (done) {
      ini_set('date.timezone', 'Asia/Hong_Kong');
      ini_get('date.timezone');
      expected = 'Asia/Hong_Kong'
ini_set('date.timezone', 'Asia/Hong_Kong');
      result = ini_get('date.timezone');
      expect(result).to.equal(expected)
      done()
    })
  })
})