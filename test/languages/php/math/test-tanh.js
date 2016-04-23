XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var tanh = require('/Users/kvz/code/phpjs/src/php/math/tanh.js')

describe('php', function () {
  describe('math.tanh.js', function () {
    it('should pass test 1', function (done) {
      tanh(5.4251848798444815);
      expected = 0.9999612058841574
      result = tanh(5.4251848798444815);
      expect(result).to.equal(expected)
      done()
    })
  })
})