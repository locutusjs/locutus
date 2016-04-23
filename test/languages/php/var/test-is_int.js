XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var is_int = require('/Users/kvz/code/phpjs/src/php/var/is_int.js')

describe('php', function () {
  describe('var.is_int.js', function () {
    it('should pass test 1', function (done) {
      is_int(23)
      expected = true
      result = is_int(23)
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      is_int('23')
      expected = false
      result = is_int('23')
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      is_int(23.5)
      expected = false
      result = is_int(23.5)
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      is_int(true)
      expected = false
      result = is_int(true)
      expect(result).to.equal(expected)
      done()
    })
  })
})