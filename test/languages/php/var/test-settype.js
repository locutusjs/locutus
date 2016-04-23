XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var settype = require('/Users/kvz/code/phpjs/src/php/var/settype.js')

describe('php', function () {
  describe('var.settype.js', function () {
    it('should pass test 1', function (done) {
      foo = '5bar';
      settype('foo', 'integer');
      $result = foo
      expected = 5
foo = '5bar';
settype('foo', 'integer');
      result = $result = foo
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      foo = true;
      settype('foo', 'string');
      $result = foo
      expected = '1'
foo = true;
settype('foo', 'string');
      result = $result = foo
      expect(result).to.equal(expected)
      done()
    })
  })
})